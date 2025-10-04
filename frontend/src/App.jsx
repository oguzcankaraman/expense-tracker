import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import "./index.css";

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const handleExpenseAdded = () => {
        setRefreshTrigger((prev) => !prev);
    };

    return (
        <div className="container">
            <h1>💰 Expense Tracker</h1>
            <div className="dashboard-grid">
                <div className="card">
                    <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                </div>
                <div className="card">
                    <ExpenseChart refreshTrigger={refreshTrigger} />
                </div>
                <div className="card" style={{ gridColumn: "1 / -1" }}>
                    <ExpenseList refreshTrigger={refreshTrigger} />
                </div>
            </div>
        </div>
    );
}

export default App;
