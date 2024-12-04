package com.api.cursus.repositories;

import com.api.cursus.entities.Faculte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaculteRepository extends JpaRepository<Faculte, Long> {
}
