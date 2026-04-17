package com.xdcoders.cravechat.repository;

import com.xdcoders.cravechat.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<MenuItem, Long> {

}