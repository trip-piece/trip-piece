package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Auth;
import com.trippiece.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<Auth, Long> {
    Optional<Auth> findByUser(User user);
}