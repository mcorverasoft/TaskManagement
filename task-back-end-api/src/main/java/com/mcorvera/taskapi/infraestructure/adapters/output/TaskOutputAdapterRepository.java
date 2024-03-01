package com.mcorvera.taskapi.infraestructure.adapters.output;

import com.mcorvera.taskapi.application.ports.output.TaskOutputPort;
import com.mcorvera.taskapi.domain.Task;
import com.mcorvera.taskapi.infraestructure.entities.TaskEntity;
import com.mcorvera.taskapi.infraestructure.repository.TaskJpaRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@AllArgsConstructor
public class TaskOutputAdapterRepository implements TaskOutputPort {

    private final TaskJpaRepository repository;
    private final ModelMapper modelMapper;
    @Override
    public Iterable<Task> getAll() {
        return repository.findAll().stream().map(task -> {
                return modelMapper.map(task,Task.class );
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<Task> getById(Integer id) {
        TaskEntity task = repository.findById(id).orElseThrow();
        return Optional.of(modelMapper.map(task,Task.class));
    }

    @Override
    public boolean insert(Task task) {
        TaskEntity taskEntity = modelMapper.map(task, TaskEntity.class);
        return repository.save(taskEntity)!=null;
    }

    @Override
    public boolean update(Integer id, Task task) {
        TaskEntity taskEntity = modelMapper.map(task, TaskEntity.class);
        taskEntity.setId(id);
        return repository.save(taskEntity)!=null;
    }

    @Override
    public boolean delete(Integer id) {
        repository.deleteById(id);
        return repository.findById(id).isEmpty();
    }
}