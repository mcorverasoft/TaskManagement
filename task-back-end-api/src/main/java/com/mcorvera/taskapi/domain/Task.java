package com.mcorvera.taskapi.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
public class Task {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String title;
    private String description;
    private String tags;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Instant creationDate;
    private Instant startAt;
    private boolean completed;
}
