package com.mcorvera.taskapi.infraestructure.dtos.api;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.UUID;


@Data
@Builder
public class BaseResponse<T> {
    @Builder.Default
    private boolean successful=true;
    @Builder.Default
    private HttpStatus status= HttpStatus.OK;
    @Builder.Default
    private UUID transactionId=UUID.randomUUID();
    @Builder.Default
    private Instant date= Instant.now();
    @Builder.Default
    private String message="TRANSACTION OK";
    private T data;
    private ErrorBaseResponse ErrorResponse;


}
