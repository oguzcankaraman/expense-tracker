package com.expense.expense_tracker.dto;

import java.time.Instant;

public record ErrorResponse(
        String message,
        int status,
        String path,
        Instant timestamp
) {}