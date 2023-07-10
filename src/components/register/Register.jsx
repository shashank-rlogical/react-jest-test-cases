import React, { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [state, setState] = useState(initialState);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value.trim(),
      };
    });
  }

  function handleRegister(e) {
    e.preventDefault();
    const {
      name = "shashank",
      email = "shashank@test.com",
      password = "123456",
    } = state;
    setSuccessMsg("");
    setErrorMsg("");
    if (name && email && password) {
      console.log("If calling....");
      setSuccessMsg("Successfully registed!!");
      setTimeout(() => {
        setSuccessMsg("");
        setState(initialState);
      }, 2000);
    } else {
      console.log("Else calling....");
      setErrorMsg("All fields are required...");
    }
  }

  return (
    <div className="register" style={{ textAlign: "left" }}>
      <h2 className="register_title">Register</h2>
      <form onSubmit={handleRegister}>
        {successMsg && <p data-testid="success">{successMsg}</p>}
        {errorMsg && <p data-testid="error">{errorMsg}</p>}
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            data-testid="name"
            name="name"
            placeholder="Enter name"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            data-testid="email"
            name="email"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            data-testid="password"
            name="password"
            placeholder="Enter password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
