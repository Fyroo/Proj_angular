package com.api.cursus.controllers;

import com.api.cursus.entities.User;
import com.api.cursus.entities.Role;
import com.api.cursus.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.api.cursus.repositories.RoleRepository;

import jakarta.validation.Valid;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the new user
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
            
            User user = userOpt.get();
            // Compare the plain password with the hashed password in the database
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(401).body("Invalid credentials");
            }

            // Authenticate the user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            System.out.println("User logged in: " + loginRequest.getUsername());
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        return ResponseEntity.ok("Login successful");
    }
    // Other methods (getUserByUsername, updateUser, assignRolesToUser)

    // Get user details by username
    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user.get());
    }

    // Update user information (e.g., fullname, email)
    @PutMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @RequestBody User updatedUser) {
        Optional<User> existingUserOpt = userRepository.findByUsername(username);
        if (existingUserOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User existingUser = existingUserOpt.get();
        existingUser.setFullname(updatedUser.getFullname());
        existingUser.setEmail(updatedUser.getEmail());
        // We don't update the password in this case, only the non-sensitive fields

        User savedUser = userRepository.save(existingUser);
        return ResponseEntity.ok(savedUser);
    }

    // Assign roles to a user
    @PutMapping("/{username}/assignRoles")
    public ResponseEntity<?> assignRolesToUser(@PathVariable String username, @RequestBody Set<Long> roleIds) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        Set<Role> roles = new HashSet<>();

        for (Long roleId : roleIds) {
            // Assuming you have a role repository to fetch roles by ID
            Optional<Role> roleOpt = roleRepository.findById(roleId);
            roleOpt.ifPresent(roles::add);
        }

        user.setRoles(roles);
        User updatedUser = userRepository.save(user);

        return ResponseEntity.ok(updatedUser);
    }

    // DTO class for login
    public static class LoginRequest {
        private String username;
        private String password;

        // Getters and setters
        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
