package com.expense.expense_tracker.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record ExpenseRequestDTO(
        @NotBlank String title,
        @NotNull @Positive Double amount,
        @NotBlank String category,
        @NotNull LocalDate date
) {}