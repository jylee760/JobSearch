import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/axios.js";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await register(username, password);
      navigate("/login");
    } catch (err) {
      setError("Invalid username for registration");
    }
  };
  const rerouteToLogin = () =>{
    navigate("/login")
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

      <button type="submit">Register</button>
    </form>
    <button onClick={rerouteToLogin}>Login</button>
  </>
  );
};

export default RegisterForm;