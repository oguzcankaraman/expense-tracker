import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

export const createExpense = async (expense) => {
    return await axios.post(`${API_BASE}/expenses`, expense);
};

export const getExpenses = async () => {
    return await axios.get(`${API_BASE}/expenses`);
};

export const deleteExpense = async (id) => {
    return await axios.delete(`${API_BASE}/expenses/${id}`);
};