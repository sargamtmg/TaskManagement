import { useState } from "react";

function Register() {
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
      let url = "http://localhost:8000/user";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert("user created successfully");
        setUserData({
          username: "",
          password: "",
        });
      } else {
        throw new Error("Failed to create user");
      }
    } catch (err) {
      alert("error creating user: " + err.message);
    }
  };

  return (
    <div className="register_wrapper">
      <form className="register_form" onSubmit={handleRegister}>
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
          Register
        </button>
      </form>
      <div>
        {userData.username}
        {userData.password}
      </div>
    </div>
  );
}

export default Register;
