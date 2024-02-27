package com.mcorvera.taskapi.infraestructure.adapters.input;

import com.mcorvera.taskapi.application.ports.input.TaskInputPort;
import com.mcorvera.taskapi.domain.Task;
import com.mcorvera.taskapi.infraestructure.dtos.api.BaseResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/task")
@AllArgsConstructor
public class TaskInputAdapterController {

    private final TaskInputPort service;
    @GetMapping
    public BaseResponse<Iterable<Task>>getAll() {
        Iterable<Task> tasks= service.getAll();
        BaseResponse<Iterable<Task>> response = BaseResponse.<Iterable<Task>>builder()
                .data(tasks)
                .ErrorResponse(null)
                .build();
        return response;
    }
    @GetMapping("/{id}")
    public BaseResponse<Task> getById(@PathVariable Integer id) {
        Task task= service.getById(id).get();
        BaseResponse<Task> response = BaseResponse.<Task>builder()
                .data(task)
                .ErrorResponse(null)
                .build();
        return response;
    }

    @PostMapping
    public BaseResponse<Boolean> insert(@RequestBody Task task) {
        boolean insert= service.insert(task);
        BaseResponse<Boolean> response = BaseResponse.<Boolean>builder()
                .data(insert)
                .ErrorResponse(null)
                .build();
        return response;
    }

    @PutMapping("/{id}")
    public BaseResponse<Boolean> update(@PathVariable Integer id, @RequestBody Task task) {
        boolean update= service.update(id, task);
        BaseResponse<Boolean> response = BaseResponse.<Boolean>builder()
                .data(update)
                .ErrorResponse(null)
                .build();
        return response;
    }

    @DeleteMapping("/{id}")
    public BaseResponse<Boolean> delete(Integer id) {
        boolean delete= service.delete(id);
        BaseResponse<Boolean> response = BaseResponse.<Boolean>builder()
                .data(delete)
                .ErrorResponse(null)
                .build();
        return response;
    }
}
