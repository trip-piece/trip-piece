package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Frame;
import com.trippiece.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByWalletAddress(String walletAddress);
    boolean existsByWalletAddress(String walletAddress);
}