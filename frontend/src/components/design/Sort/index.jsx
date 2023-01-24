import { useState } from "react";

// styles
import styles from "./index.module.css";

// components
import SingleSelect from "../Form/SingleSelect";
import MemoCard from "../Cards/MemoCard";

// constants
import { categoryConstant } from "../../../constants/category.constants";

/*
array is your array for sorting
setArray is your function to display the array (make sure to keep a copy of original)
*/

const Sort = ({ setArray, array }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState();
  // const [date, setDate] = useState();
  const [addingCategory, setAddingCategory] = useState(false);

 
  const sortFunc = () => {
    console.log(categories);
    // 2 loops 1. for categories 2. date
    if (categories.length !== 0) {
      // filter array.category is in categories
      setArray([])
      const temp = array.filter((item) => categories.includes(item.category));
      setArray(temp);
    }
    // if (date) {
    //   // date
    //   const temp = array;
    //   if (date == 0) {
    //     // latest first
    //     console.log("latest");
    //     temp.sort((a, b) => {
    //       console.log(a.created_at, b.created_at);
    //       return b.created_at - a.created_at;
    //     });
    //   }
    //   if (date == 1) {
    //     // oldest first
    //     temp.sort((a, b) => {
    //       return a.created_at - b.created_at;
    //     });
    //   }
    //   setArray(temp);
    // }
  };

  const removeSorting = () => {
    // setDate();
    setCategories([]);
    setArray(array);
  };

  return (
    <div className={styles.container}>
      {addingCategory && (
        <SingleSelect
          options={categoryConstant}
          label="Add Categories"
          title="categoryName"
          setVal={setNewCategory}
          valueSetter="categoryName"
        />
      )}
      {categories.length !== 0 && (
        <div className={styles.members}>
          {categories.map((category, memberIdx) => (
            <MemoCard member={category} key={memberIdx} />
          ))}
        </div>
      )}
      {!addingCategory ? (
        <button
          className={styles.button}
          onClick={() => setAddingCategory(true)}
        >
          Add a new Category for Sorting
        </button>
      ) : (
        <button
          className={`${styles.button} ${styles.addButton}`}
          onClick={() => {
            const temp = [...categories, newCategory];
            const filteredList = [...new Set(temp)];
            setCategories(filteredList);
            setAddingCategory(false);
          }}
        >
          Add Category
        </button>
      )}
      {/* <div className={styles.addMargin}>
        <SingleSelect
          options={addDates}
          label="Sort According to Date"
          title="label"
          setVal={setDate}
          valueSetter="id"
        />
      </div> */}
      <div className={styles.buttonMenu}>
        <button className={styles.button} onClick={sortFunc}>
          Sort Transactions
        </button>
        <button className={styles.button} onClick={removeSorting}>
          Remove Sorting
        </button>
      </div>
    </div>
  );
};

export default Sort;
