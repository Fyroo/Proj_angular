package com.api.cursus.controllers;

import com.api.cursus.entities.Master;
import com.api.cursus.entities.Candidature;
import com.api.cursus.repositories.MasterRepository;
import com.api.cursus.repositories.CandidatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/masters")
@CrossOrigin(origins = "*")
public class MasterController {

    private final MasterRepository masterRepository;
    private final CandidatureRepository candidatureRepository;

    @Autowired
    public MasterController(MasterRepository masterRepository, CandidatureRepository candidatureRepository) {
        this.masterRepository = masterRepository;
        
        this.candidatureRepository = candidatureRepository;
    }

    // Get Masters
    @GetMapping("/list")
    public List<Master> getAllMasters() {
        return masterRepository.findAll();
    }

    // Get Candidatures pour master
    @GetMapping("/{masterId}/candidatures")
    public List<Candidature> getAllCandidaturesByMasterId(@PathVariable Long masterId) {
        return masterRepository.findById(masterId)
                .map(Master::getCandidatures)
                .orElseThrow(() -> new IllegalArgumentException("MasterId " + masterId + " not found"));
    }

    // Create a Master
    @PostMapping("/add")
    public Master createMaster(@Valid @RequestBody Master master) {
        return masterRepository.save(master);
    }

    // Update Master
    @PutMapping("/{masterId}")
    public Master updateMaster(@PathVariable Long masterId, @Valid @RequestBody Master masterRequest) {
        return masterRepository.findById(masterId).map(master -> {
            master.setName(masterRequest.getName());
            master.setSpecialization(masterRequest.getSpecialization());
            return masterRepository.save(master);
        }).orElseThrow(() -> new IllegalArgumentException("MasterId " + masterId + " not found"));
    }

    // Delete Master
    @DeleteMapping("/{masterId}")
    public ResponseEntity<?> deleteMaster(@PathVariable Long masterId) {
        return masterRepository.findById(masterId).map(master -> {
            masterRepository.delete(master);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new IllegalArgumentException("MasterId " + masterId + " not found"));
    }

}
