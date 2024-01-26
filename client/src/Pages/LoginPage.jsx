/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        {
          email,
          password,
        }
      ); //withCedentials: true be faile
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-2 flex grow items-center justify-around">
      <div className="mb-64 -mt-25">
        <h1 className="text-4xl mb-4 text-center">Login</h1>
        <form
          action=""
          className="max-w-md mx-auto "
          onSubmit={handleLoginSubmit}
        >
          <input
            type="email"
            placeholder="Your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to={"/register"} className="underline text-balance">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
