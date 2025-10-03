package com.expense.expense_tracker.dto;

import java.time.LocalDate;

public record ExpenseResponseDTO(
        @lombok.NonNull String title,
        @lombok.NonNull Double amount,
        @lombok.NonNull String category,
        @lombok.NonNull LocalDate date
) {
}
