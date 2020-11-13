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
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/employee/add" component={AddEmployee} />
        <Route path="/employee/edit" component={EditEmployee} />
        <Route path="/employee/delete" component={DeleteEmployee} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
