import { useEffect, useState } from "react";

function UserProfile(props) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/user`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data);
        console.log(JSON.stringify(data));
      })
      .catch((err) => {
        alert("error fetching error : " + err);
      });
  }, []);

  return (
    <div className="user_profile_section">
      <div className="user">
        <div className="profile">{currentUser?.username[0].toUpperCase()}</div>
        <div className="user_info">
          <div className="user_title">User</div>
          <div className="user_username">{currentUser?.username}</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
