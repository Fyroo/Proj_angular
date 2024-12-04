package com.api.cursus.controllers;

import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.cursus.entities.Cursus;
import com.api.cursus.entities.Candidature;
import com.api.cursus.repositories.CursusRepository;
import com.api.cursus.repositories.CandidatureRepository;

@RestController
@RequestMapping("/cursus")
@CrossOrigin(origins = "*")
public class CursusController {

    @Autowired
    private CursusRepository cursusRepository;

    @Autowired
    private CandidatureRepository candidatureRepository;

    // Get all Cursus
    @GetMapping("/list")
    public List<Cursus> getAllCursus() {
        return (List<Cursus>) cursusRepository.findAll();
    }

    // Create Cursus
    @PostMapping("/add")
    public ResponseEntity<?> createCursus(@Valid @RequestBody Cursus cursus) {
        try {
            Long candidatureId = cursus.getCandidature().getId();  // Assuming you send the ID of the Candidature
            Optional<Candidature> candidature = candidatureRepository.findById(candidatureId);
            
            if (!candidature.isPresent()) {
                return ResponseEntity.badRequest().body("Candidature with ID " + candidatureId + " not found.");
            }

            cursus.setCandidature(candidature.get());
            Cursus savedCursus = cursusRepository.save(cursus);

            return ResponseEntity.ok(savedCursus);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error while creating Cursus: " + e.getMessage());
        }
    }

    // Update Cursus
    @PutMapping("/{cursusId}")
    public Cursus updateCursus(@PathVariable Long cursusId, @Valid @RequestBody Cursus cursusRequest) {
        return cursusRepository.findById(cursusId).map(cursus -> {
            cursus.setName(cursusRequest.getName());
            cursus.setMention(cursusRequest.getMention());
            cursus.setDuration(cursusRequest.getDuration());
            return cursusRepository.save(cursus);
        }).orElseThrow(() -> new IllegalArgumentException("CursusId " + cursusId + " not found"));
    }

    // Delete Cursus
    @DeleteMapping("/{cursusId}")
    public ResponseEntity<?> deleteCursus(@PathVariable Long cursusId) {
        return cursusRepository.findById(cursusId).map(cursus -> {
            cursusRepository.delete(cursus);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new IllegalArgumentException("CursusId " + cursusId + " not found"));
    }

    // Get Cursus by ID
    @GetMapping("/{cursusId}")
    public Cursus getCursus(@PathVariable Long cursusId) {
        Optional<Cursus> c = cursusRepository.findById(cursusId);
        return c.orElseThrow(() -> new IllegalArgumentException("CursusId " + cursusId + " not found"));
    }
}
