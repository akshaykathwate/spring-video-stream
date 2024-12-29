package com.stream.app.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CustomMessage {
    private String message;
    private boolean success;
}
