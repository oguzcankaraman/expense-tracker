// src/components/ExpenseForm.js
import React, { useState } from "react";
import { createExpense } from "../services/api";

const ExpenseForm = ({ onExpenseAdded }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!title || !amount || !category || !date) {
            setError("All fields required.");
            return;
        }
        if (Number(amount) <= 0) {
            setError("Amount must be greater than 0.");
            return;
        }

        try {
            const expense = { title, amount: Number(amount), category, date };
            await createExpense(expense);
            // Formu temizle
            setTitle("");
            setAmount("");
            setCategory("");
            setDate("");
            if (onExpenseAdded) onExpenseAdded(); // parent component'i bilgilendir
        } catch (err) {
            setError("Error creating expense.");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="mb-2">
                <label className="block mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Expense
            </button>
        </form>
    );
};

export default ExpenseForm;
