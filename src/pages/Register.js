import React from "react";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="signin-form " onSubmit={handleSubmit}>
      <div className="login-input-card">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          placeholder="Your Name"
          className="form-inputs"
          required
        />
      </div>
      <div className="login-input-card">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="form-inputs"
          required
        />
      </div>
      <div className="login-input-card">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="form-inputs"
          required
        />
      </div>
      <button type="submit" className="btn-green-dark btn-center btn ">
        Register
      </button>
    </form>
  );
};
export default Register;
