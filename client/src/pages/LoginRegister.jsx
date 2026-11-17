import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

function LoginRegister({ user, setUser }) {
  const [register, setRegister] = useState(false);
  const [message, setMessage] = useState("");

  const registered = () => {
    setRegister(false);
    setMessage("Account created. Please log in.");
  };

  if (user) {
    return <Navigate to="/photos" replace />;
  }

  return (
    <section className="authPage">
      <h1>{register ? "Create an account" : "Login"}</h1>
      {message && <p role="status">{message}</p>}
      {register ? <RegisterForm registered={registered} /> : <LoginForm setUser={setUser} />}
      <button type="button" className="switchForm" onClick={() => {
        setRegister(!register);
        setMessage("");
      }}>
        {register ? "Already have an account? Login" : "Need an account? Register"}
      </button>
    </section>
  );
}

export default LoginRegister;
