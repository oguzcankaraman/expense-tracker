import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getExpenses } from "../services/api";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseChart = ({ refreshTrigger }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setError("");
            try {
                const res = await getExpenses();
                const expenses = res.data || [];

                if (expenses.length === 0) {
                    setChartData(null);
                    return;
                }

                // Kategorilere göre toplamları hesapla
                const categoryMap = {};
                expenses.forEach((e) => {
                    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
                });

                const data = {
                    labels: Object.keys(categoryMap),
                    datasets: [
                        {
                            label: "Expenses by Category",
                            data: Object.values(categoryMap),
                            backgroundColor: [
                                "#60A5FA", // blue
                                "#F472B6", // pink
                                "#34D399", // green
                                "#FBBF24", // yellow
                                "#A78BFA", // purple
                                "#F87171", // red
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                setChartData(data);
            } catch (err) {
                console.error(err);
                setError("Error loading chart data.");
            }
        };

        fetchData();
    }, [refreshTrigger]);

    if (error) return <p className="error">{error}</p>;
    if (!chartData) return <p className="info mt-4">No expense data to display yet.</p>;

    return (
        <div className="container mt-6">
            <h2>📊 Expense Distribution by Category</h2>
            <div style={{ height: "320px", marginTop: "20px" }}>
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: "bottom" },
                            title: { display: false },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ExpenseChart;
