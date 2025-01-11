package com.api.cursus.controllers;

import com.api.cursus.entities.Candidature;
import com.api.cursus.entities.Master;
import com.api.cursus.entities.Cursus;
import com.api.cursus.repositories.CandidatureRepository;
import com.api.cursus.repositories.MasterRepository;
import com.api.cursus.repositories.CursusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/candidature")
@CrossOrigin(origins = "*")
public class CandidatureController {

    private final CandidatureRepository candidatureRepository;
    private final MasterRepository masterRepository;
    private final CursusRepository cursusRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public CandidatureController(CandidatureRepository candidatureRepository, 
                                 MasterRepository masterRepository,
                                 CursusRepository cursusRepository) {
        this.candidatureRepository = candidatureRepository;
        this.masterRepository = masterRepository;
        this.cursusRepository = cursusRepository;
    }

    // Get  Candidatures
    @GetMapping("/list")
    public List<Candidature> getAllCandidatures() {
        return candidatureRepository.findAll();
    }

    // Create Candidature 
    @PostMapping("/add/{masterId}")
    public Candidature createCandidature(@PathVariable(value = "masterId") Long masterId,
                                         @Valid @RequestBody Candidature candidature) {
        return masterRepository.findById(masterId).map(master -> {
            candidature.setMaster(master); // Associate with the Master
            candidature.setEtat("pending"); // Default state
            candidature.setDateDeSoumission(new Date()); // Default submission date

            // Handle Cursus association if provided
            if (candidature.getCursus() != null && !candidature.getCursus().isEmpty()) {
                for (Cursus cursus : candidature.getCursus()) {
                    cursus.setCandidature(candidature);
                    cursusRepository.save(cursus);
                }
            }
            return candidatureRepository.save(candidature);
        }).orElseThrow(() -> new IllegalArgumentException("MasterId " + masterId + " not found"));
    }


    // Update Candidature
    @PutMapping("/{candidatureId}")
    public Candidature updateCandidature(@PathVariable Long candidatureId, 
                                         @Valid @RequestBody Candidature candidatureRequest) {
        return candidatureRepository.findById(candidatureId).map(candidature -> {
            candidature.setNom(candidatureRequest.getNom());
            candidature.setPrenom(candidatureRequest.getPrenom());
            candidature.setEtat(candidatureRequest.getEtat());
            candidature.setDateDeSoumission(candidatureRequest.getDateDeSoumission());
            // Update Cursus if necessary
            if (candidatureRequest.getCursus() != null && !candidatureRequest.getCursus().isEmpty()) {
                for (Cursus cursus : candidatureRequest.getCursus()) {
                    cursus.setCandidature(candidature); // Ensure the Cursus is linked to the Candidature
                    cursusRepository.save(cursus);
                }
            }
            return candidatureRepository.save(candidature);
        }).orElseThrow(() -> new IllegalArgumentException("CandidatureId " + candidatureId + " not found"));
    }

    // Delete Candidature
    @DeleteMapping("/{candidatureId}")
    public ResponseEntity<?> deleteCandidature(@PathVariable Long candidatureId) {
        return candidatureRepository.findById(candidatureId).map(candidature -> {
            if (candidature.getCursus() != null && !candidature.getCursus().isEmpty()) {
                for (Cursus cursus : candidature.getCursus()) {
                    cursusRepository.delete(cursus); // Remove the related Cursus
                }
            }
            candidatureRepository.delete(candidature); // Delete Candidature
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new IllegalArgumentException("CandidatureId " + candidatureId + " not found"));
    }

    // Get Cursus de Candidature
    @GetMapping("/{candidatureId}/cursus")
    public List<Cursus> getCursusForCandidature(@PathVariable Long candidatureId) {
        return candidatureRepository.findById(candidatureId).map(Candidature::getCursus)
                .orElseThrow(() -> new IllegalArgumentException("CandidatureId " + candidatureId + " not found"));
    }
}
