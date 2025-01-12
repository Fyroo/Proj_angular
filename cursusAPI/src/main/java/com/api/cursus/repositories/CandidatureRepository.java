package com.api.cursus.repositories;

import com.api.cursus.entities.Candidature;
import com.api.cursus.entities.Master;
import com.api.cursus.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    List<Candidature> findByMaster(Master master);
    List<Candidature> findByUser(User user);
}
