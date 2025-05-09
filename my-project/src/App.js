import "./App.css";
import Create from "./components/Create";
import Home from "./components/Home";
import Submit from "./components/Submit";
import Timeout from "./components/Timeout";
import Timein from "./components/Timein";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Edit from "./components/Edit";
import Error from "./components/Error";
import Login from "./components/Login";
import Overview from "./components/Overview";
import Students from "./components/Students";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";

export const AppContext = createContext();

function App() {
  const [date, setDate] = useState(new Date());
  const [student_info_id, setStudent_info_id] = useState("");
  const [transaction, setTransaction] = useState("");

  return (
    <div>
      <AppContext.Provider
        value={{
          date,
          setDate,
          student_info_id,
          setStudent_info_id,
          transaction,
          setTransaction,
        }}
      >
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/timein" element={<Timein />} />
            <Route exact path="/attendance" element={<Timeout />} />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/submit/:id" element={<Submit />} />
            <Route exact path="/edit/:id" element={<Edit />} />
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Overview />} />
              <Route path="students" element={<Home />} />
              <Route path="quiz" element={<Quiz />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
