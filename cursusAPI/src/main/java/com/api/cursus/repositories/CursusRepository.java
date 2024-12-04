package com.api.cursus.repositories;

import com.api.cursus.entities.Cursus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CursusRepository extends JpaRepository<Cursus, Long> {
    List<Cursus> findByCandidatureId(Long candidatureId);
}
