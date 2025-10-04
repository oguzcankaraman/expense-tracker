import React, { useEffect, useState, useCallback } from "react";
import { getExpenses, deleteExpense } from "../services/api";

const ExpenseList = ({ refreshTrigger }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Backend'den verileri çeken fonksiyon
    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getExpenses();
            setExpenses(response.data || []);
        } catch (err) {
            console.error("Error fetching expenses:", err);
            setError("Failed to load expenses. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    // refreshTrigger değiştiğinde veriyi yeniden çek
    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses, refreshTrigger]);

    // Silme işlemi
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;
        try {
            await deleteExpense(id);
            setExpenses((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            console.error("Error deleting expense:", err);
            setError("Failed to delete expense. Please try again.");
        }
    };

    // Görsel durumlar
    if (loading) {
        return <p className="text-gray-600 mt-4">Loading expenses...</p>;
    }

    if (error) {
        return <p className="text-red-500 mt-4">{error}</p>;
    }

    if (expenses.length === 0) {
        return <p className="text-gray-500 mt-4">No expenses found.</p>;
    }

    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-gray-300 rounded shadow-sm">
                <thead className="bg-blue-50 text-blue-900">
                <tr>
                    <th className="border px-4 py-2 text-left">Title</th>
                    <th className="border px-4 py-2 text-right">Amount</th>
                    <th className="border px-4 py-2 text-left">Category</th>
                    <th className="border px-4 py-2 text-center">Date</th>
                    <th className="border px-4 py-2 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map((e) => (
                    <tr
                        key={e.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                    >
                        <td className="border px-4 py-2">{e.title}</td>
                        <td className="border px-4 py-2 text-right">
                            {e.amount.toFixed(2)} ₺
                        </td>
                        <td className="border px-4 py-2">{e.category}</td>
                        <td className="border px-4 py-2 text-center">{e.date}</td>
                        <td className="border px-4 py-2 text-center">
                            <button
                                onClick={() => handleDelete(e.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
