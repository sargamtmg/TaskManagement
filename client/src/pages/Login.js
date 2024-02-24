import { useState } from "react";

function Login() {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let url = "http://localhost:8000/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      if (response.ok) {
        alert("user authenticate");
        setUserData({
          username: "",
          password: "",
        });
        window.location.href = "/";
      } else {
        throw new Error("Failed to login");
      }
    } catch (err) {
      alert("error logging in user: " + err.message);
    }
  };

  return (
    <div className="login_wrapper">
      <form className="login_form" onSubmit={handleLogin}>
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
