import "./App.css";
import { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList.tsx";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter.tsx";
import ExpenseForm from "./expense-tracker/components/ExpenseForm.tsx";
import TimeLogList from "./timelog//components/TimeLogList";
import TimeLogForm from "./timelog/components/TimeLogForm";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 2, category: "Utilities" },
    { id: 2, description: "bbb", amount: 2, category: "Groceries" },
    { id: 3, description: "ccc", amount: 2, category: "Entertainment" },
  ]);

  //filtered list to be rendered in expense list
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  const [entries, setEntries] = useState([
    {
      id: 1,
      title: "Reading",
      description: "Read 20 pages of the girl who fell beneath the sea",
      hours: 0,
      minutes: 35,
    },
    {
      id: 1,
      title: "Drawing",
      description: "sketching thumbnails",
      hours: 2,
      minutes: 20,
    },
  ]);

  //timelog
  const handleOnDelete = (id: number) => {
    setEntries(entries.filter((entry) => entry.id != id));
  };
  return (
    <>
      <ExpenseForm
        onSubmit={(expense) =>
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
        }
      />
      <ExpenseFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ExpenseList
        expenses={visibleExpenses}
        //get all expenses except the one with the given id
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id != id))
        }
      />
      <TimeLogForm
        onSubmit={(entry) =>
          setEntries([...entries, { ...entry, id: entries.length + 1 }])
        }
      />
      <TimeLogList entries={entries} onDelete={(id) => handleOnDelete(id)} />
    </>
  );
}

export default App;
