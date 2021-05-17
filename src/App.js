import { Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./login";
import { Home } from "./home";
import { useUserStore } from "./stores/user.store";

function App() {
  const isLoggedIn = useUserStore((store) => store.isLoggedIn);

  console.log("not logged in", isLoggedIn);

  return (
    <Switch>
      <Route path="/home">
        {isLoggedIn ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        {isLoggedIn ? <Redirect to="/home" /> : <Login />}
      </Route>
      <Route path="/" exact>
        {isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
}

export default App;
