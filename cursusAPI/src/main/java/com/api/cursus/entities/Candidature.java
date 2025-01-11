package com.api.cursus.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Nom is mandatory")
    @Column(name = "nom")
    private String nom;

    @NotBlank(message = "Prenom is mandatory")
    @Column(name = "prenom")
    private String prenom;

    @Column(name = "etat")
    private String etat;

    @Column(name = "date_de_soumission")
    private Date dateDeSoumission;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "master_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Master master;

    @OneToMany(mappedBy = "candidature", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cursus> cursus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;
    
    public Candidature() {}

    public Candidature(String nom, String prenom, String etat, Date dateDeSoumission, Master master) {
        this.nom = nom;
        this.prenom = prenom;
        this.etat = etat;
        this.dateDeSoumission = dateDeSoumission;
        this.master = master;
    }

    @PrePersist
    public void prePersist() {
        if (etat == null) {
            etat = "pending";
        }
        if (dateDeSoumission == null) {
            dateDeSoumission = new Date();
        }
    }

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Date getDateDeSoumission() {
        return dateDeSoumission;
    }

    public void setDateDeSoumission(Date dateDeSoumission) {
        this.dateDeSoumission = dateDeSoumission;
    }

    public Master getMaster() {
        return master;
    }

    public void setMaster(Master master) {
        this.master = master;
    }

    public List<Cursus> getCursus() {
        return cursus;
    }

    public void setCursus(List<Cursus> cursus) {
        this.cursus = cursus;
    }

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
    
}
