import { useState } from "react";
import illustration from "../img/taskwise.jpg";

function Login() {
  const [isLoginError, setIsLoginError] = useState(false);
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
        setIsLoginError(false);
        console.log("user authenticate");
        setUserData({
          username: "",
          password: "",
        });
        window.location.href = "/";
      } else {
        throw new Error("Failed to login");
      }
    } catch (err) {
      setIsLoginError(true);
      setUserData({
        username: "",
        password: "",
      });
      console.log("error logging in user: " + err.message);
    }
  };

  return (
    <div className="login_wrapper">
      <div className="form_wrapper">
        <div className="application_wrapper">
          <div className="application_name">TaskWise</div>
        </div>
        <div className="form_section">
          <form className="login_form" onSubmit={handleLogin}>
            <div className="form_heading">Login Form</div>
            <div className="input_wrapper">
              <input
                type="text"
                name="username"
                className="input_form"
                value={userData.username}
                placeholder="username"
                onChange={handleChange}
              ></input>
            </div>
            <div className="input_wrapper">
              <input
                type="password"
                name="password"
                className="input_form"
                value={userData.password}
                placeholder="password"
                onChange={handleChange}
              ></input>
              {isLoginError && (
                <div className="error_message">
                  The username or Password is iscorrect
                </div>
              )}
            </div>
            <button type="submit" className="login_submit">
              Login
            </button>
            <div className="register_message_wrapper">
              <a href="/register" className="register_message">
                Don't have an account ? Register
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="app_detail">
        <img src={illustration} alt="illustration" className="illustration" />
      </div>
    </div>
  );
}

export default Login;
