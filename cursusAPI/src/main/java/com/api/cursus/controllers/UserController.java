package com.api.cursus.controllers;

import com.api.cursus.entities.User;
import com.api.cursus.entities.Role;
import com.api.cursus.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.api.cursus.repositories.RoleRepository;
import java.util.Set;
import jakarta.validation.Valid;
import java.util.HashSet;
import java.util.Optional;


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

    // ResponseDTO class
 // ResponseDTO class
 // ResponseDTO class
    public class ResponseDTO {
        private String message;
        private String userId;
        private String username;
        private String fullname;
        private String email; // Add email field
        private Set<Role> role;

        public ResponseDTO(String message, String userId, String username, String fullname, Set<Role> role, String email) {
            this.message = message;
            this.userId = userId;
            this.role = role;
            this.username = username;
            this.fullname = fullname;
            this.email = email; // Initialize email field
        }

        public String getFullname() {
            return fullname;
        }

        public void setFullname(String fullname) {
            this.fullname = fullname;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public Set<Role> getRole() {
            return role;
        }

        public void setRole(Set<Role> role) {
            this.role = role;
        }
    }



    // Register a new user
 // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        // Check if the username is already taken
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Fetch the "User" role (role ID = 3)
        Optional<Role> userRoleOpt = roleRepository.findById(3L);
        if (userRoleOpt.isEmpty()) {
            return ResponseEntity.status(500).body("Default role not found. Please ensure the role exists in the database.");
        }

        Role userRole = userRoleOpt.get();

        // Assign the "User" role to the new user
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        // Save the new user
        User savedUser = userRepository.save(user);

        // Return the saved user details
        return ResponseEntity.ok(new ResponseDTO(
            "User registered successfully",
            savedUser.getId().toString(),
            savedUser.getUsername(),
            savedUser.getFullname(),
            savedUser.getRoles(),
            savedUser.getEmail()
        ));
    }


    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            // Set authentication in SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Fetch the authenticated user
            String username = loginRequest.getUsername();
            Optional<User> userOpt = userRepository.findByUsername(username);

            if (userOpt.isPresent()) {
                User user = userOpt.get();
                // Use the actual user ID instead of "exampleUserId"
                String username1 = user.getUsername().toString();
                String userId = user.getId().toString();
                String fullname = user.getFullname().toString();
                Set<Role>  role = user.getRoles();

                // Create a response DTO to send back with the actual user ID
                ResponseDTO response = new ResponseDTO("Login successful", userId,username1,fullname,role,null);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body(new ResponseDTO("User not found", null,null,null, null,null ));
            }

        } catch (BadCredentialsException e) {
            System.out.println(e);
            return ResponseEntity.status(401).body(new ResponseDTO("Invalid credentials", null,null, null,null,null));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(new ResponseDTO("An error occurred during login",null, null,null,null,null));
        }
    }


    // Get all users
    @GetMapping("/")
    public ResponseEntity<?> getAllUsers() {
        try {
            // Fetch all users from the repository
            Iterable<User> users = userRepository.findAll();

            // Return the list of users in the response
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while retrieving users.");
        }
    }

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
        System.out.println("Received request to assign roles:");
        System.out.println("Username: " + username);
        System.out.println("Role IDs: " + roleIds);

        if (roleIds == null || roleIds.isEmpty()) {
            return ResponseEntity.badRequest().body("Role IDs are missing or empty.");
        }

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found.");
        }

        User user = userOpt.get();
        Set<Role> roles = new HashSet<>();

        for (Long roleId : roleIds) {
            Optional<Role> roleOpt = roleRepository.findById(roleId);
            if (roleOpt.isPresent()) {
                roles.add(roleOpt.get());
            } else {
                return ResponseEntity.status(400).body("Invalid role ID: " + roleId);
            }
        }

        user.setRoles(roles);
        User updatedUser = userRepository.save(user);

        return ResponseEntity.ok(updatedUser);
    }

 // Get user details by ID
    @GetMapping("/id/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found with ID: " + userId);
        }

        User user = userOpt.get();

        // Prepare response DTO with user details, including email
        ResponseDTO response = new ResponseDTO(
            "User found",
            user.getId().toString(),
            user.getUsername(),
            user.getFullname(),
            user.getRoles(),
            user.getEmail() // Add email here
        );

        return ResponseEntity.ok(response);
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
    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(404).build(); // 404 with no body
        }

        userRepository.delete(user.get());
        return ResponseEntity.noContent().build(); // 204 No Content
    }


}
