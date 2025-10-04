import React, { useState } from "react";
import { createExpense } from "../services/api";

const ExpenseForm = ({ onExpenseAdded }) => {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await createExpense(formData);
            setFormData({ title: "", amount: "", category: "", date: "" });
            onExpenseAdded();
        } catch (err) {
            console.error(err);
            setError("Failed to add expense. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />

            <label>Amount</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

            <label>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />

            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Expense"}
            </button>
        </form>
    );
};

export default ExpenseForm;
