import { useState } from "react";
import illustration from "../img/taskwise.jpg";

function Register() {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
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

  const handleRegister = (e) => {
    e.preventDefault();
    let url = "http://localhost:8000/user/register";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          //code need to be review here
          setIsError(true);
          if (response.status === 400) {
            setErrorMsg("Username is already taken");
            throw new Error("Username is already taken.");
          }
          setErrorMsg("Please try again");
          throw new Error("Please try again.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("user created");
        setIsError(false);
        setUserData({
          username: "",
          password: "",
        });
        window.location.href = "/login";
      })
      .catch((error) => {
        setUserData({
          username: "",
          password: "",
        });
        console.log(error);
      });
  };

  return (
    <div className="register_wrapper">
      <div className="form_wrapper">
        <div className="application_wrapper">
          <div className="application_name">TaskWise</div>
        </div>
        <div className="form_section">
          <form className="register_form" onSubmit={handleRegister}>
            <div className="form_heading">Registration Form</div>
            <div className="input_wrapper">
              <input
                type="text"
                name="username"
                className="input_form"
                value={userData.username}
                placeholder="username"
                onChange={handleChange}
              ></input>
              {isError && <div className="error_message">{errorMsg}</div>}
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
            </div>
            <button type="submit" className="register_submit">
              Register
            </button>
            <div className="login_message_wrapper">
              <a href="/login" className="login_message">
                Already have account? Login
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

export default Register;
