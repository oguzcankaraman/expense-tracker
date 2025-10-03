package com.expense.expense_tracker.service;

import com.expense.expense_tracker.dto.ExpenseRequestDTO;
import com.expense.expense_tracker.dto.ExpenseResponseDTO;
import com.expense.expense_tracker.entity.Expense;
import com.expense.expense_tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<ExpenseResponseDTO> getAllExpenses() {
        return expenseRepository.findAll().stream()
                .map(expense -> new ExpenseResponseDTO(
                        expense.getTitle(),
                        expense.getAmount(),
                        expense.getCategory(),
                        expense.getDate())).toList();
    }

    public ExpenseResponseDTO saveExpense(ExpenseRequestDTO expense) {
        Expense expenseEntity = new Expense();
        expenseEntity.setTitle(expense.title());
        expenseEntity.setAmount(expense.amount());
        expenseEntity.setCategory(expense.category());
        expenseEntity.setDate(expense.date());
        expenseRepository.save(expenseEntity);
        return new ExpenseResponseDTO(expenseEntity.getTitle(), expenseEntity.getAmount(), expenseEntity.getCategory(), expenseEntity.getDate());
    }
}
