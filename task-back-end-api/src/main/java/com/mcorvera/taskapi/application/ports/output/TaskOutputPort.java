package com.mcorvera.taskapi.application.ports.output;

import com.mcorvera.taskapi.domain.Task;

import java.util.Optional;

public interface TaskOutputPort {
    Iterable<Task> getAll();
    Optional<Task> getById(Integer id);
    boolean insert(Task task);
    boolean update(Integer id, Task task);
    boolean delete(Integer id);
}
