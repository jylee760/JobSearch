import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/axios.js";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(username, password);
      const token = response.data;

      localStorage.setItem("token", token);
      console.log(localStorage.getItem("token"));
      navigate("/home");
    } catch (err) {
      setError("Invalid username or password");
    }
  };
  const rerouteToRegister = () =>{
    navigate("/register")
  }

  return (<>
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
    <button onClick={rerouteToRegister}>Register</button>
  </>
  );
};

export default LoginForm;
