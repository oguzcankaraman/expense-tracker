package com.expense.expense_tracker.service;

import com.expense.expense_tracker.dto.ExpenseRequestDTO;
import com.expense.expense_tracker.dto.ExpenseResponseDTO;
import com.expense.expense_tracker.entity.Expense;
import com.expense.expense_tracker.exception.ExpenseNotFoundException;
import com.expense.expense_tracker.mapper.ExpenseMapper;
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
                .map(ExpenseMapper::toDTO).toList();
    }

    public ExpenseResponseDTO saveExpense(ExpenseRequestDTO dto) {
        Expense expense = ExpenseMapper.toEntity(dto);
        Expense saved = expenseRepository.save(expense);
        return ExpenseMapper.toDTO(saved);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public ExpenseResponseDTO updateExpense(Long id, ExpenseRequestDTO expense) {
        expenseRepository.findById(id).ifPresent(
                expenseEntity -> {
                    expenseEntity.setTitle(expense.title());
                    expenseEntity.setAmount(expense.amount());
                    expenseEntity.setCategory(expense.category());
                    expenseEntity.setDate(expense.date());
                    expenseRepository.save(expenseEntity);
                });
        return expenseRepository.findById(id).map(ExpenseMapper::toDTO)
                .orElseThrow(() -> new ExpenseNotFoundException(id));

    }

    public ExpenseResponseDTO getExpenseById(Long id) {
        return expenseRepository.findById(id).map(ExpenseMapper::toDTO).orElseThrow(() -> new ExpenseNotFoundException(id));
    }
}
