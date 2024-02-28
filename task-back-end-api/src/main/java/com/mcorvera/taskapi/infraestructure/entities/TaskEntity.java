package com.mcorvera.taskapi.infraestructure.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Entity
@Table(name = "task", schema = "public")
@NoArgsConstructor
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private String tags;
    @Column(name = "creationdate")
    private Instant creationDate;
    @Column(name = "startat")
    private Instant startAt;
    private boolean completed;


    @PrePersist
    public void prePersist(){
        this.creationDate= Instant.now();
    }
}