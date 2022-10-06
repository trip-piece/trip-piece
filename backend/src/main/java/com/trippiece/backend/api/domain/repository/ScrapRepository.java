package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Frame;
import com.trippiece.backend.api.domain.entity.Scrap;
import com.trippiece.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    boolean existsByFrameAndUser(Frame frame, User user);
    Scrap findByFrameAndUser(Frame frame, User user);
    List<Scrap> findByUser(User user);
}