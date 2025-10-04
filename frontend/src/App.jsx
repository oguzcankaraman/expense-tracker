import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const handleExpenseAdded = () => {
        setRefreshTrigger(!refreshTrigger);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
                💸 Expense Tracker
            </h1>

            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            <ExpenseList refreshTrigger={refreshTrigger} />
            <ExpenseChart refreshTrigger={refreshTrigger} />
        </div>
    );
}

export default App;
