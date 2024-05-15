import React, { useState } from "react";
import BarChartData from "../BarChartData/BarChartData";
import ExpenseWalletUpdate from "../ExpenseWalletUpdate/ExpenseWalletUpdate";
import ExpenseList from "../ExpenseList/ExpenseList";
import "./ExpensePage.css";

function ExpensePage() {
  const categories = [
    "Food",
    "Entertainment",
    "Travel",
    "Shopping",
    "Grocery",
    "Others",
  ];

  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
      ? JSON.parse(localStorage.getItem("walletBalance"))
      : 5000
  );

  const [expenseData, setExpenseData] = useState(
    localStorage.getItem("expenseData")
      ? JSON.parse(localStorage.getItem("expenseData"))
      : []
  );

  const updateExpensedata = (expenses) => {
    setExpenseData(expenses);
    const balance = walletBalance - totalExpense(expenses);
    setWalletBalance(balance);
    localStorage.setItem("expenseData", JSON.stringify(expenses));
    localStorage.setItem("walletBalance", JSON.stringify(balance));
  };

  const totalExpense = (data) => {
    return data.reduce((total, expense) => total + parseInt(expense.price, 10), 0);
  };

  return (
    <div className="expense-container">
      <h1>Expense Tracker</h1>
      <ExpenseWalletUpdate
        categories={categories}
        updateExpensedata={updateExpensedata}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
        totalExpense={totalExpense}
        setExpenseData={setExpenseData}
        expenseData={expenseData}
      />
      {expenseData.length > 0 && (
        <div className="expense-info-container">
          <ExpenseList
            data={expenseData}
            categories={categories}
            updateExpensedata={updateExpensedata}
          />
          <BarChartData data={expenseData} />
        </div>
      )}
    </div>
  );
}

export default ExpensePage;
