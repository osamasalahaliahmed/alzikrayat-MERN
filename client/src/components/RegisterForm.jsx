import { useState } from "react";

function RegisterForm({ registered }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    description: "",
    occupation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const register = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Could not create your account. Check your details.");
        return;
      }
      registered();
    } catch (error) {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={register} className="authForm">
      <label htmlFor="firstName">First name</label>
      <input id="firstName" name="firstName" autoComplete="given-name" required value={form.firstName} onChange={change} />
      <label htmlFor="lastName">Last name</label>
      <input id="lastName" name="lastName" autoComplete="family-name" required value={form.lastName} onChange={change} />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={change} />
      <label htmlFor="password">Password (at least 8 characters)</label>
      <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required value={form.password} onChange={change} />
      <label htmlFor="location">Location (optional)</label>
      <input id="location" name="location" autoComplete="address-level2" value={form.location} onChange={change} />
      <label htmlFor="occupation">Occupation (optional)</label>
      <input id="occupation" name="occupation" value={form.occupation} onChange={change} />
      <label htmlFor="description">About you (optional)</label>
      <textarea id="description" name="description" rows={3} value={form.description} onChange={change} />
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "Creating account..." : "Register"}</button>
    </form>
  );
}

export default RegisterForm;
