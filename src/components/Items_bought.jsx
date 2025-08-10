import { useState } from "react";
import styles from "./Items_bought.module.css";

function Items_bought({ setMonth, getItems, editItems, setYear, getTotalSpent }) {
  const [itemName, setItemName] = useState("");
  const [removeIndex, setRemoveIndex] = useState(-4);
  const [itemPrice, setItemPrice] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const months = {
    "":"",
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

  const inputItemName = (event) => {
    setItemName(event.target.value);
  };
  const inputItemPrice = (event) => {
    setItemPrice(event.target.value);
  };
  const inputRemoveIndex = (event) => {
    setRemoveIndex(event.target.value - 1);
  };
  const addItem = () => {
    editItems([...getItems, { Name: itemName, Price: itemPrice }]);
    const newTotal = totalSpent + Number(itemPrice);
    setTotalSpent(newTotal);
    getTotalSpent(newTotal);
  };
  const removeItem = () => {
    editItems([
      ...getItems.slice(0, removeIndex),
      ...getItems.slice(removeIndex + 1, getItems.length),
    ]);
    const newTotal = totalSpent - Number(getItems[removeIndex]["Price"]);
    setTotalSpent(newTotal);
    getTotalSpent(newTotal);
  };
  const resetList = () => {
    editItems([]);
    setTotalSpent(0);
    getTotalSpent(0);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.container_banner}>SPENDING FOR {months[setMonth].toUpperCase()} {setYear}</div>
        <div className={styles.column_container}>
          <div className={styles.container_column_1}>
            {/*Container 1 for index*/}
            <div className={styles.container_column_item}>INDEX</div>
            {getItems.map((item, index) => (
              <div className={styles.container_column_item}>{index + 1}</div>
            ))}
          </div>
          <div className={styles.container_column_2}>
            {/*Container 2 for item name*/}
            <div className={styles.container_column_item}>ITEM</div>
            {getItems.map((item, index) => (
              <div className={styles.container_column_item}>{item["Name"]}</div>
            ))}
          </div>
          <div className={styles.container_column_3}>
            {/*Container 3 for price*/}
            <div className={styles.container_column_item}>PRICE</div>
            {getItems.map((item, index) => (
              <div className={styles.container_column_item}>${item["Price"]}</div>
            ))}
          </div>
        </div>
        <div className={styles.container_banner} style={{ marginTop:"auto" }}>
        TOTAL AMOUNT SPENT: <span style={{ color:"green" }}>${totalSpent}</span>
        </div>
      </div>
      <div className={styles.input_container}>
        Add Item:
        <input
          className={styles.search_bar}
          type="text"
          placeholder="Item name"
          onChange={inputItemName}
        />
        <input
          className={styles.search_bar}
          type="number"
          placeholder="Item price"
          onChange={inputItemPrice}
        />
        <button
          className={styles.button_style}
          onClick={addItem}
          disabled={itemPrice <= 0 || itemName === ""}
        >
          Add
        </button>
      </div>
      <div className={styles.input_container}>
        Remove item (Input item index):
        <input
          className={styles.search_bar}
          type="number"
          placeholder="Enter item"
          onChange={inputRemoveIndex}
        />
        <button
          className={styles.button_style}
          onClick={removeItem}
          disabled={
            getItems.length <= 0 ||
            removeIndex < 0 ||
            removeIndex > getItems.length - 1
          }
        >
          Remove
        </button>
      </div>
      <div className={styles.input_container}>
        <button className={styles.button_style} onClick={resetList}>
          Reset List
        </button>
      </div>
    </div>
  );
}

export default Items_bought;
