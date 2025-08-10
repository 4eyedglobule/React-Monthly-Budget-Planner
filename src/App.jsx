import { useState } from 'react'
import Items_bought from './components/Items_bought';
import Budget_history from './components/Budget_history';
import './App.css'

function App() {
  const [monthlyBudget,setMonthlyBudget] = useState(-5);
  const [budgetHistory,setBudgetHistory] = useState([]);
  const [totalSpent,setTotalSpent] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-3);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(0);
  const [overBudget, setOverBudget] = useState(false);

  const addToHistory = (value) => {
    setBudgetHistory([...budgetHistory, value]);
  };
  const removeBudgetHistory = (removeIndex) => {
    if(removeIndex == selectedIndex){
      setSelectedIndex(-5);
    }
    setBudgetHistory([
      ...budgetHistory.slice(0, removeIndex),
      ...budgetHistory.slice(removeIndex + 1, budgetHistory.length),
    ]);
  };
  const clearBudgetHistory = () => {
    setBudgetHistory([]);
    setSelectedIndex(-5);
  };
  const changeBudgetHistory = (value) => {
    const tempHistory = [...budgetHistory];
    tempHistory[selectedIndex]["Budget"] = value;
    setBudgetHistory(tempHistory);
  };
  const selectBudgetHistory = (index) => {
    setSelectedIndex(index);
    setSelectedMonth(budgetHistory[index]["Month"]);
    setSelectedYear(budgetHistory[index]["Year"]);
  }
  const changeTotalSpent = (value) => {
    setTotalSpent(value);
    if(value>monthlyBudget && monthlyBudget > -1){
      setOverBudget(true);
    }
    else{
      setOverBudget(false);
    }
  };
  const changeMonthlyBudget = (event) => {
    setMonthlyBudget(event.target.value);
    if(totalSpent>Number(event.target.value) && monthlyBudget > -1){
      setOverBudget(true);
    }
    else{
      setOverBudget(false);
    }
  };
  return (
    <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #feb84fff, #ffffffff)',
        }}>
      <div className="app_title">
        BUDGET PLANNER
      </div>
      <div className="input_container">
        MONTHLY BUDGET:
        $<input className="search_bar" type="number" placeholder="Enter monthly budget" onChange={changeMonthlyBudget} />
      </div>
      <div className="container_of_containers">
        <Budget_history setHistory={budgetHistory} getSelectedIndex={selectBudgetHistory} onAddBudget={addToHistory} onRemoveBudget={removeBudgetHistory} onClearHistory={clearBudgetHistory}/>
        {budgetHistory.length>0 && selectedIndex > -1 && <Items_bought setYear={selectedYear} getItems={budgetHistory[selectedIndex]["Budget"]} editItems={changeBudgetHistory} setMonth={selectedMonth} getTotalSpent={changeTotalSpent}/>}
      </div>
      {overBudget && <div className="budget_warning_text">
        OVER MONTHLY BUDGET
      </div>}
    </div>
  )
}

export default App
