package com.xdcoders.cravechat.repository;

import com.xdcoders.cravechat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}