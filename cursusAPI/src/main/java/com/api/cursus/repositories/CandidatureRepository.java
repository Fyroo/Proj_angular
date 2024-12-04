package com.api.cursus.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.api.cursus.entities.Candidature;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
}