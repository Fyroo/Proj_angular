package com.api.cursus.controllers;

import com.api.cursus.entities.Faculte;
import com.api.cursus.repositories.FaculteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.api.cursus.entities.Master;
import java.util.List;

@RestController
@RequestMapping("/facultes")
@CrossOrigin(origins = "*")
public class FaculteController {

    private final FaculteRepository faculteRepository;

    @Autowired
    public FaculteController(FaculteRepository faculteRepository) {
        this.faculteRepository = faculteRepository;
    }

    // Get all Facultes
    @GetMapping("/list")
    public List<Faculte> getAllFacultes() {
        return faculteRepository.findAll();
    }

    // Create Faculte
    @PostMapping("/add")
    public Faculte createFaculte(@Valid @RequestBody Faculte faculte) {
        return faculteRepository.save(faculte);
    }

    // Update Faculte
    @PutMapping("/{faculteId}")
    public Faculte updateFaculte(@PathVariable Long faculteId, @Valid @RequestBody Faculte faculteRequest) {
        return faculteRepository.findById(faculteId).map(faculte -> {
            faculte.setName(faculteRequest.getName());
            faculte.setLocation(faculteRequest.getLocation());
 
            return faculteRepository.save(faculte);
        }).orElseThrow(() -> new IllegalArgumentException("FaculteId " + faculteId + " not found"));
    }

    // Delete Faculte
    @DeleteMapping("/{faculteId}")
    public ResponseEntity<?> deleteFaculte(@PathVariable Long faculteId) {
        return faculteRepository.findById(faculteId).map(faculte -> {
            faculteRepository.delete(faculte);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new IllegalArgumentException("FaculteId " + faculteId + " not found"));
    }

    // Get Faculte by ID
    @GetMapping("/{faculteId}")
    public Faculte getFaculte(@PathVariable Long faculteId) {
        return faculteRepository.findById(faculteId).orElseThrow(() -> 
            new IllegalArgumentException("FaculteId " + faculteId + " not found"));
    }
    // Get all Masters for a specific Faculte by Faculte ID
    @GetMapping("/{faculteId}/masters")
    public List<Master> getAllMastersByFaculteId(@PathVariable Long faculteId) {
        return faculteRepository.findById(faculteId)
                .map(Faculte::getMasters)
                .orElseThrow(() -> new IllegalArgumentException("FaculteId " + faculteId + " not found"));
    }
}
