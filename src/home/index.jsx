import { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useHomeStoreAPi } from "./home.store";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { Mail } from "./mail";
import styles from "./home.module.css";

export function Home() {
  const { path } = useRouteMatch();
  useEffect(() => {
    return () => {
      useHomeStoreAPi.getState().reset();
    };
  }, []);

  console.log(path, "path");
  return (
    <div className={styles.homeContainer}>
      <Sidebar />
      <div className={styles.content}>
        <Topbar />
        <div className={styles.routeContent}>
          <Switch>
            <Route path={`${path}/mail`} component={Mail}></Route>
            <Route path={`${path}/dashboard`}>dashboard</Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
