package com.api.cursus.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Master {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "specialization", nullable = false)
    private String specialization;

    // Many-to-one relation with Faculte
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "faculte_id", nullable = false)
    @JsonBackReference
    private Faculte faculte;

    // One-to-many relation with Candidature
    @OneToMany(mappedBy = "master", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Candidature> candidatures = new ArrayList<>();

    public Master() {}



    public Master(Long id, String name, String specialization, Faculte faculte, List<Candidature> candidatures) {
		super();
		this.id = id;
		this.name = name;
		this.specialization = specialization;
		this.faculte = faculte;
		this.candidatures = candidatures;
	}



	// Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public Faculte getFaculte() {
        return faculte;
    }

    public Long getFaculteId() {
        return faculte.getId();
    }
    public String getFaculteName() {
        return faculte.getName();
    }

    public void setFaculte(Faculte faculte) {
        this.faculte = faculte;
    }

    public List<Candidature> getCandidatures() {
        return candidatures;
    }

    public void setCandidatures(List<Candidature> candidatures) {
        this.candidatures = candidatures;
    }

 // toString Method
    @Override
    public String toString() {
        return "Master{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", specialization='" + specialization + '\'' +
               ", faculteId=" + (faculte != null ? faculte.getId() : "null") +
               ", faculteName='" + (faculte != null ? faculte.getName() : "null") + '\'' +
               '}';
    }

}
