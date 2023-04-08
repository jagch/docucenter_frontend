import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import LogTer from "./components/log_ter/LogTer";
import LogMar from "./components/log_mar/LogMar";
import Clientes from "./components/clientes/Clientes";
import NotFound from "./components/404/NotFound";
import { AuthContext } from "./utils/context";
import { isUserLogedApi } from "./utils/utils";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);
  useEffect(() => {
    setUser(isUserLogedApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin]);

  if (!loadUser) return null;
  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Routes>
          {/* <Route path="/" exact element={<Login />} /> */}
          <Route
            path="/"
            exact
            element={<Home setRefreshCheckLogin={setRefreshCheckLogin} />}
          />
          <Route
            path="/logTer"
            exact
            element={<LogTer setRefreshCheckLogin={setRefreshCheckLogin} />}
          />
          <Route
            path="/logMar"
            exact
            element={<LogMar setRefreshCheckLogin={setRefreshCheckLogin} />}
          />
          <Route
            path="/clientes"
            exact
            element={<Clientes setRefreshCheckLogin={setRefreshCheckLogin} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Login setRefreshCheckLogin={setRefreshCheckLogin} />
      )}
    </AuthContext.Provider>
  );
}
