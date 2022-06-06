import { AuthProvider } from "./Context/AuthContext";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarFixed from "./Components/NavbarFixed";
import Home from "./Pages/Home";
import SignPage from "./Pages/SignPage";
import TransactionPage from "./Pages/TransactionPage";
import AddTransactionButton from "./Components/AddTransactionButton";
import StatsPage from "./Pages/StatsPage";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavbarFixed />
        <Routes>
          <Route path="/start" element={<SignPage />} />

          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/transactions"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
        <AddTransactionButton />
      </AuthProvider>
    </Router>
  );
}

export default App;
