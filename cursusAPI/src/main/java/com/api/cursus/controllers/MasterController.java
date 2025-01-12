package com.api.cursus.controllers;

import com.api.cursus.entities.Master;
import com.api.cursus.entities.Candidature;
import com.api.cursus.entities.Faculte;
import com.api.cursus.repositories.MasterRepository;
import com.api.cursus.repositories.CandidatureRepository;
import com.api.cursus.repositories.FaculteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/masters")
@CrossOrigin(origins = "*")
public class MasterController {

    private final MasterRepository masterRepository;
    private final CandidatureRepository candidatureRepository;
    private final FaculteRepository faculteRepository;

    @Autowired
    public MasterController(MasterRepository masterRepository, CandidatureRepository candidatureRepository, FaculteRepository faculteRepository) {
        this.masterRepository = masterRepository;
        this.candidatureRepository = candidatureRepository;
        this.faculteRepository= faculteRepository;
    }

    @GetMapping
    public ResponseEntity<List<Master>> getAllMasters() {
        List<Master> masters = masterRepository.findAll();
        for (Master master : masters) {
            // Explicitly load the Faculte for each master if it's lazy-loaded
        	
            master.getFaculte();  // Forces the Faculte to be initialized
            System.out.println(master.toString());
        }
        return ResponseEntity.ok(masters);
    }

    // Get Candidatures for a specific Master
    @GetMapping("/{masterId}/candidatures")
    public ResponseEntity<List<Candidature>> getAllCandidaturesByMasterId(@PathVariable Long masterId) {
        List<Candidature> candidatures = masterRepository.findById(masterId)
                .map(Master::getCandidatures)
                .orElseThrow(() -> new IllegalArgumentException("MasterId " + masterId + " not found"));
        return ResponseEntity.ok(candidatures);
    }

    // Create a Master
    @PostMapping
    public ResponseEntity<Master> createMaster(@Valid @RequestBody Master masterRequest) {
        Faculte faculte = faculteRepository.findById(masterRequest.getFaculte().getId())
                .orElseThrow(() -> new IllegalArgumentException("FaculteId not found"));

        Master master = new Master();
        master.setName(masterRequest.getName());
        master.setSpecialization(masterRequest.getSpecialization());
        master.setFaculte(faculte); // Set the faculte reference

        Master savedMaster = masterRepository.save(master);
        return ResponseEntity.status(201).body(savedMaster); // Return HTTP 201 (Created)
    }

    // Update Master
    @PutMapping("/{masterId}")
    public ResponseEntity<Master> updateMaster(@PathVariable Long masterId, @Valid @RequestBody Master masterRequest) {
        return masterRepository.findById(masterId).map(master -> {
            master.setName(masterRequest.getName());
            master.setSpecialization(masterRequest.getSpecialization());
            
            // Check if Faculte is being updated
            if (masterRequest.getFaculte() != null) {
                Faculte faculte = faculteRepository.findById(masterRequest.getFaculte().getId())
                        .orElseThrow(() -> new IllegalArgumentException("FaculteId not found"));
                master.setFaculte(faculte); // Update the faculte if provided
            }

            Master updatedMaster = masterRepository.save(master);
            return ResponseEntity.ok(updatedMaster); // Return the updated Master
        }).orElseThrow(() -> new IllegalArgumentException("MasterId " + masterId + " not found"));
    }


    // Delete Master
    @DeleteMapping("/{masterId}")
    public ResponseEntity<Object> deleteMaster(@PathVariable Long masterId) {
        return masterRepository.findById(masterId).map(master -> {
            masterRepository.delete(master);
            return ResponseEntity.noContent().build(); // Return HTTP 204 (No Content)
        }).orElseThrow(() -> new IllegalArgumentException("MasterId " + masterId + " not found"));
    }
}
