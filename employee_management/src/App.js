import './App.css';
import HomePage from "./components/Home/Home";
import LoginPage from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import EditEmployee from "./components/EditEmployeeDetails/EditEmployeeDetails";
import DeleteEmployee from "./components/DeleteEmployee/DeleteEmployee";
import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/employee/add" component={AddEmployee} />
        <Route exact path="/employee/edit" component={EditEmployee} />
        <Route exact path="/employee/delete" component={DeleteEmployee} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
