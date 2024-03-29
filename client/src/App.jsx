import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import IndexPages from "./Pages/indexPages";
import Layout from "./Layout";
import RegisterPage from "./Pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./Pages/AccountPage";

axios.defaults.baseURL = "http://localhost:4000";
// axios.defaults.withCredentials = true; set token on cookie be faile

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPages />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
