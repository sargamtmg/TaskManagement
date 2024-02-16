import { useState } from "react";
import { Navigate } from "react-router-dom";

function Login() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    try {
      let url = "http://localhost:8000/user/auth";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert("user authenticate");
        setAuthenticated(true);
        setUserData({
          username: "",
          password: "",
        });
      } else {
        throw new Error("Failed to login");
      }
    } catch (err) {
      alert("error creating user: " + err.message);
    }
  };

  return authenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="login_wrapper">
      <form className="login_form" onSubmit={handleRegister}>
        <div className="username">
          <input
            type="text"
            name="username"
            value={userData.username}
            placeholder="username"
            onChange={handleChange}
          ></input>
        </div>
        <div className="password">
          <input
            type="password"
            name="password"
            value={userData.password}
            placeholder="password"
            onChange={handleChange}
          ></input>
        </div>
        <button type="submit" className="register_submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
