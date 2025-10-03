package com.expense.expense_tracker.mapper;

import com.expense.expense_tracker.dto.ExpenseRequestDTO;
import com.expense.expense_tracker.dto.ExpenseResponseDTO;
import com.expense.expense_tracker.entity.Expense;

public class ExpenseMapper {
    public static ExpenseResponseDTO toDTO(Expense expense) {
        return new ExpenseResponseDTO(
                expense.getId(),
                expense.getTitle(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getDate()
        );
    }

    public static Expense toEntity(ExpenseRequestDTO dto) {
        Expense expense = new Expense();
        expense.setTitle(dto.title());
        expense.setAmount(dto.amount());
        expense.setCategory(dto.category());
        expense.setDate(dto.date());
        return expense;
    }
}
