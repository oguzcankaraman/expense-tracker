package com.expense.expense_tracker.repository;

import com.expense.expense_tracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
