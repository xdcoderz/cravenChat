package com.xdcoders.cravechat.repository;

import com.xdcoders.cravechat.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {}