package com.api.cursus.controllers;

import com.api.cursus.entities.Candidature;
import com.api.cursus.entities.Master;
import com.api.cursus.entities.User;
import com.api.cursus.repositories.CandidatureRepository;
import com.api.cursus.repositories.MasterRepository;
import com.api.cursus.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/candidature")
@CrossOrigin(origins = "*")
public class CandidatureController {

    private final CandidatureRepository candidatureRepository;
    private final MasterRepository masterRepository;
    private final UserRepository userRepository;

    @Autowired
    public CandidatureController(CandidatureRepository candidatureRepository, MasterRepository masterRepository, UserRepository userRepository) {
        this.candidatureRepository = candidatureRepository;
        this.masterRepository = masterRepository;
        this.userRepository = userRepository;
    }

 // Create a new Candidature
    @PostMapping
    public ResponseEntity<Candidature> createCandidature(@RequestParam Long userId, @RequestParam Long masterId) {
        // Retrieve the User and Master by their respective IDs
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("UserId " + userId + " not found"));
        Master master = masterRepository.findById(masterId)
                .orElseThrow(() -> new IllegalArgumentException("MasterId " + masterId + " not found"));

        // Create a new Candidature and associate the User and Master
        Candidature candidature = new Candidature();
        candidature.setUser(user);
        candidature.setMaster(master);

        // Automatically set dateDeSoumission to current time and etat to "pending"
        candidature.setDateDeSoumission(new Date()); // Current date and time
        candidature.setEtat("pending"); // Default state

        // Save the Candidature
        Candidature savedCandidature = candidatureRepository.save(candidature);
        return ResponseEntity.status(201).body(savedCandidature); // Return HTTP 201 (Created)
    }


    // Get candidatures for a specific Master
    @GetMapping("/by-master/{masterId}")
    public ResponseEntity<List<Candidature>> getCandidaturesByMaster(@PathVariable Long masterId) {
        Master master = masterRepository.findById(masterId)
                .orElseThrow(() -> new IllegalArgumentException("MasterId " + masterId + " not found"));
        List<Candidature> candidatures = candidatureRepository.findByMaster(master);
        return ResponseEntity.ok(candidatures);
    }

    // Get candidatures for a specific User
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<Candidature>> getCandidaturesByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("UserId " + userId + " not found"));
        List<Candidature> candidatures = candidatureRepository.findByUser(user);
        return ResponseEntity.ok(candidatures);
    }

    // Update the "etat" of a Candidature
    @PutMapping("/{candidatureId}")
    public ResponseEntity<Candidature> updateCandidatureEtat(@PathVariable Long candidatureId, @RequestParam String etat) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new IllegalArgumentException("CandidatureId " + candidatureId + " not found"));

        candidature.setEtat(etat); // Update the etat
        Candidature updatedCandidature = candidatureRepository.save(candidature); // Save the updated Candidature

        // Log the response for debugging
        System.out.println("Updated Candidature: " + updatedCandidature);

        return ResponseEntity.status(HttpStatus.OK).body(updatedCandidature);

    }


    // Delete a Candidature
    @DeleteMapping("/{candidatureId}")
    public ResponseEntity<Object> deleteCandidature(@PathVariable Long candidatureId) {
        return candidatureRepository.findById(candidatureId).map(candidature -> {
            candidatureRepository.delete(candidature);
            return ResponseEntity.noContent().build(); // Return HTTP 204 (No Content)
        }).orElseThrow(() -> new IllegalArgumentException("CandidatureId " + candidatureId + " not found"));
    }
}
