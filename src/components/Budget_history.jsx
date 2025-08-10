import { useState } from "react";
import styles from "./Budget_history.module.css";

function Budget_history({ setHistory, getSelectedIndex, onAddBudget, onRemoveBudget, onClearHistory }){
    const [year,setYear] = useState(0);
    const [month,setMonth] = useState("");
    const [removeIndex,setRemoveIndex] = useState(-5);
    const [currentIndex,setCurrentIndex] = useState(-3);
    const months = {
        "1":"January",
        "2":"Feburary",
        "3":"March",
        "4":"April",
        "5":"May",
        "6":"June",
        "7":"July",
        "8":"August",
        "9":"September",
        "10":"October",
        "11":"November",
        "12":"December",
    }

    const selectMonth = (event) => {
        setMonth(event.target.value);
    };
    const selectYear = (event) => {
        setYear(event.target.value);
    };
    const addBudget = () => {
        onAddBudget({Month:month, Year:year, Budget:[]});
    };
    const inputRemoveIndex = (event) => {
        setRemoveIndex(event.target.value-1);
    };
    const selectHistoryMonth = (index) => {
        getSelectedIndex(index);
        setCurrentIndex(index);
    };
    const removeBudget = () => {
        onRemoveBudget(removeIndex);
        if(currentIndex === removeIndex){
            setCurrentIndex(-3);
        }
    };
    const clearBudgets = () => {
        onClearHistory();
        setCurrentIndex(-3);
    };

    return(
        <div className={styles.parent}>
            <div className={styles.container}>
                <div className={styles.container_banner}>
                    BUDGET HISTORY
                </div>
                <div className={styles.column_container}>
                    <div className={styles.index_column}>
                        {setHistory.map((item, index) => (
                            <div className={styles.container_column_item}>
                                {index+1}
                            </div>
                        ))}
                    </div>
                    <div className={styles.months_column}>
                        {setHistory.map((item, index) => (
                            <button
                                className={styles.button_style}
                                onClick={() => selectHistoryMonth(index)}
                                disabled={index === currentIndex}
                            >
                                {months[item["Month"]]}, {item["Year"]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.input_container}>
                Insert new budget: 
                <select value={month} onChange={selectMonth}>
                    <option value="">-- Select Month --</option>
                    <option value="1">January</option>
                    <option value="2">Feburary</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <input
                className={styles.search_bar}
                type="Number"
                placeholder="Enter year"
                onChange={selectYear}
                />
                <button
                    className={styles.button_style}
                    onClick={addBudget}
                    disabled = {year <= 0 || month === "" || setHistory.some(budget => budget.Month === month && budget.Year === year)}
                >
                    Add
                </button>
            </div>
            <div className={styles.input_container}>
                Remove budget: 
                <input
                className={styles.search_bar}
                type="Number"
                placeholder="Enter index"
                onChange={inputRemoveIndex}
                />
                <button
                    className={styles.button_style}
                    onClick={removeBudget}
                    disabled = {removeIndex < 0 || removeIndex > setHistory.length - 1 || setHistory.length <= 0}
                >
                    Remove
                </button>
            </div>
            <div className={styles.input_container}>
                <button className={styles.button_style} onClick={clearBudgets}>
                    Clear budgets
                </button>
            </div>
        </div>
    );
}

export default Budget_history;