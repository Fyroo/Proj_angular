package com.api.cursus.repositories;

import com.api.cursus.entities.Cursus;
import com.api.cursus.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CursusRepository extends JpaRepository<Cursus, Long> {
    List<Cursus> findByUser(User user);
}
