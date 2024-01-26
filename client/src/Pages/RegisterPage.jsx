import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
    } catch (error) {
      alert("Registration failed. Please try again later");
    }
  };
  return (
    <div className="mt-2 flex grow items-center justify-around">
      <div className="mb-64 -mt-25">
        <h1 className="text-4xl mb-4 text-center">Register</h1>
        <form action="" className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Peter An"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a menber?
            <Link to={"/login"} className="underline text-balance">
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
