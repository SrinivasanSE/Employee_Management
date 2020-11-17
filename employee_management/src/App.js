import './App.css';
import HomePage from "./components/Home/Home";
import LoginPage from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import EditEmployee from "./components/EditEmployeeDetails/EditEmployeeDetails";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { isUserAuthenticated } from "./helpers/auth"

function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      exact={true}
      render={(props) => isLoggedIn
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}


function PublicRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      exact={true}
      render={(props) => !isLoggedIn
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />}
    />
  )
}
function App() {
  console.log(isUserAuthenticated())
  console.log("here")
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/home" isLoggedIn={isUserAuthenticated()} component={HomePage} />
        <PublicRoute path="/login" isLoggedIn={isUserAuthenticated()} component={LoginPage} />
        <PrivateRoute path="/dashboard" isLoggedIn={isUserAuthenticated()} component={Dashboard} />
        <PrivateRoute path="/employee/add" isLoggedIn={isUserAuthenticated()} component={AddEmployee} />
        <PrivateRoute path="/employee/edit/:id" isLoggedIn={isUserAuthenticated()} component={EditEmployee} />
        <Route render={() => (<Redirect to="/dashboard" />)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
