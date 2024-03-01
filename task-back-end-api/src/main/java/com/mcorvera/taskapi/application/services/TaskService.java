package com.mcorvera.taskapi.application.services;

import com.mcorvera.taskapi.application.ports.input.TaskInputPort;
import com.mcorvera.taskapi.domain.Task;
import com.mcorvera.taskapi.infraestructure.adapters.output.TaskOutputAdapterRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class TaskService implements TaskInputPort {

    private final TaskOutputAdapterRepository repository;

    @Override
    public Iterable<Task> getAll() {
        return repository.getAll();
    }

    @Override
    public Optional<Task> getById(Integer id) {
        return repository.getById(id);
    }

    @Override
    public boolean insert(Task task) {
        return repository.insert(task);
    }

    @Override
    public boolean update(Integer id, Task task) {
        return repository.update(id, task);
    }

    @Override
    public boolean delete(Integer id) {
        return false;
    }
}
