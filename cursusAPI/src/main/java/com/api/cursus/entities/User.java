package com.api.cursus.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username", nullable = false)
    private String username;
    
    @Column(name = "password", nullable = false)
    private String password;
    
    @Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", fullname=" + fullname
				+ ", email=" + email + ", roles=" + roles + ", candidatures=" + candidatures + ", cursuss=" + cursuss
				+ "]";
	}



	@Column(name = "fullname", nullable = false)
    private String fullname;
    
    @Column(name = "email", nullable = true)
    private String email;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
    
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Candidature> candidatures = new ArrayList<>();
    
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Cursus> cursuss = new ArrayList<>();
    
    // Getters and Setters

	public Long getId() {
		return id;
	}
	
    public User() {}
 
	public User(Long id, String username, String password, String fullname, String email, Set<Role> roles) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.fullname = fullname;
		this.email = email;
		this.roles = roles;
	}



	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}



	public List<Candidature> getCandidatures() {
		return candidatures;
	}



	public void setCandidatures(List<Candidature> candidatures) {
		this.candidatures = candidatures;
	}



	public List<Cursus> getCursuss() {
		return cursuss;
	}



	public void setCursuss(List<Cursus> cursuss) {
		this.cursuss = cursuss;
	}


    
}
