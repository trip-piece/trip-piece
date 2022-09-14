package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.MyBadge;
import com.trippiece.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyBadgeRepository extends JpaRepository<MyBadge, Long> {

    List<MyBadge> findAllByUser(User user);
}