import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeComponent from "./components/Home";
import DashboardComponent from "./components/Dashboard";
import UnauthorizedComponent from "./components/Unauthorized";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <ProtectedRoute path="/dashboard" component={DashboardComponent} />
        <Route exact path="/unauthorized" component={UnauthorizedComponent} />
      </Switch>
    </Router>
  );
}

export default App;
