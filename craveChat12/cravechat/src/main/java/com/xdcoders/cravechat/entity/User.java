package com.xdcoders.cravechat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users") // "user" is a reserved keyword in PostgreSQL, so we use "users"
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String enrollmentId; // Your primary login handle

    @Column(nullable = false)
    private String password;

    private String name;

    @Enumerated(EnumType.STRING)
    private Role role; // STUDENT or ADMIN

    public enum Role {
        STUDENT, ADMIN
    }
}