package com.api.cursus.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class RoleHeaderFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(RoleHeaderFilter.class);

    private static final List<String> OPEN_ENDPOINTS = List.of("/login", "/register", "/users/login");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        logger.info("Processing request for path: {}", path);

        // Skip open endpoints
        if (OPEN_ENDPOINTS.stream().anyMatch(path::startsWith)) {
            logger.info("Permitting open endpoint: {}", path);
            filterChain.doFilter(request, response);
            return;
        }

        String rolesHeader = request.getHeader("Roles");
        logger.info("Roles header: {}", rolesHeader);

        if (rolesHeader == null || rolesHeader.isBlank()) {
            logger.warn("Roles header is missing or empty. Access denied.");
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Roles header is missing");
            return;
        }

        // Extract roles and validate
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (String role : rolesHeader.split(",")) {
            role = role.trim();
            if (!role.startsWith("ROLE_")) {
                logger.warn("Invalid role format: {}. Roles must start with 'ROLE_'", role);
                continue;
            }
            logger.info("Adding role: {}", role);
            authorities.add(new SimpleGrantedAuthority(role));
        }

        if (authorities.isEmpty()) {
            logger.warn("No valid roles found in Roles header. Access denied.");
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access denied: insufficient roles");
            return;
        }

        // Set authentication manually
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("user", null, authorities)
        );
        logger.info("Authentication set for user with roles: {}", authorities);

        // Proceed with the filter chain
        filterChain.doFilter(request, response);
    }
}
