package com.api.cursus.controllers;

import com.api.cursus.entities.Cursus;
import com.api.cursus.entities.User;
import com.api.cursus.repositories.CursusRepository;
import com.api.cursus.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cursus")
@CrossOrigin(origins = "*")
public class CursusController {

    private final CursusRepository cursusRepository;
    private final UserRepository userRepository;

    @Autowired
    public CursusController(CursusRepository cursusRepository, UserRepository userRepository) {
        this.cursusRepository = cursusRepository;
        this.userRepository = userRepository;
    }

    // Create a new Cursus
    @PostMapping
    public ResponseEntity<Cursus> createCursus(@RequestParam Long userId, @RequestBody @Valid Cursus cursus) {
        // Retrieve the User by their ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("UserId " + userId + " not found"));

        // Set the User in the Cursus
        cursus.setUser(user);

        // Save the Cursus
        Cursus savedCursus = cursusRepository.save(cursus);
        return ResponseEntity.status(201).body(savedCursus); // Return HTTP 201 (Created)
    }

    // Get all Cursuses for a specific User
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<Cursus>> getCursusesByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("UserId " + userId + " not found"));
        List<Cursus> cursuses = cursusRepository.findByUser(user);
        return ResponseEntity.ok(cursuses);
    }

    // Update a Cursus
    @PutMapping("/{cursusId}")
    public ResponseEntity<Cursus> updateCursus(@PathVariable Long cursusId, @RequestBody @Valid Cursus cursusDetails) {
        Cursus cursus = cursusRepository.findById(cursusId)
                .orElseThrow(() -> new IllegalArgumentException("CursusId " + cursusId + " not found"));

        // Update cursus details
        cursus.setName(cursusDetails.getName());
        cursus.setMention(cursusDetails.getMention());
        cursus.setDuration(cursusDetails.getDuration());

        // Save updated cursus
        Cursus updatedCursus = cursusRepository.save(cursus);
        return ResponseEntity.ok(updatedCursus);
    }

    // Delete a Cursus
    @DeleteMapping("/{cursusId}")
    public ResponseEntity<Object> deleteCursus(@PathVariable Long cursusId) {
        return cursusRepository.findById(cursusId).map(cursus -> {
            cursusRepository.delete(cursus);
            return ResponseEntity.noContent().build(); // Return HTTP 204 (No Content)
        }).orElseThrow(() -> new IllegalArgumentException("CursusId " + cursusId + " not found"));
    }
}
