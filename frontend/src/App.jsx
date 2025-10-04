import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const handleExpenseAdded = () => {
        setRefreshTrigger(!refreshTrigger); // listeyi yenilemek için toggle
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">💸 Expense Tracker</h1>
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            <ExpenseList refreshTrigger={refreshTrigger} />
        </div>
    );
}

export default App;
