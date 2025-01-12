package com.api.cursus.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    @Column(name = "etat")
    private String etat;

    @Column(name = "date_de_soumission")
    private Date dateDeSoumission;


    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "master_id", nullable = false)
    @JsonBackReference
    private Master master;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;
    
    public Candidature() {}

    public Candidature(long id, String etat, Date dateDeSoumission, Master master, User user) {
		super();
		this.id = id;
		this.etat = etat;
		this.dateDeSoumission = dateDeSoumission;
		this.master = master;
		this.user = user;
	}



	@PrePersist
    public void prePersist() {
        if (dateDeSoumission == null) {
            dateDeSoumission = new Date(); // Set to current date and time
        }
        if (etat == null) {
            etat = "pending"; // Default state
        }
    }

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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



	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
    
}
