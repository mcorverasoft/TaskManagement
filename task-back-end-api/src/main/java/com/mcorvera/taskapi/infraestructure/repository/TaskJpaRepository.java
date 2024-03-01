package com.mcorvera.taskapi.infraestructure.repository;

import com.mcorvera.taskapi.infraestructure.entities.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskJpaRepository extends JpaRepository<TaskEntity, Integer> {

}
