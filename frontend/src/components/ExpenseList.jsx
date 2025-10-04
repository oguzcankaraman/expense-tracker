import React, { useEffect, useState, useCallback } from "react";
import { getExpenses, deleteExpense } from "../services/api";

const ExpenseList = ({ refreshTrigger }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getExpenses();
            setExpenses(response.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load expenses. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses, refreshTrigger]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;
        try {
            await deleteExpense(id);
            setExpenses((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            console.error(err);
            setError("Failed to delete expense. Please try again.");
        }
    };

    if (loading) return <p className="info">Loading expenses...</p>;
    if (error) return <p className="error">{error}</p>;
    if (expenses.length === 0) return <p className="info">No expenses found.</p>;

    return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {expenses.map((e) => (
                <tr key={e.id}>
                    <td>{e.title}</td>
                    <td>{e.amount.toFixed(2)} ₺</td>
                    <td>{e.category}</td>
                    <td>{e.date}</td>
                    <td>
                        <button className="delete" onClick={() => handleDelete(e.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ExpenseList;
