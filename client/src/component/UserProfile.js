import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function UserProfile(props) {
  const [currentUser, setCurrentUser] = useState();
  const deleteMenuRef = useRef(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user`, {
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

  const logOut = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("unable to logout");
        }
        return response.json();
      })
      .then((data) => {
        window.location.href = "/login";
      })
      .catch((err) => {
        alert("unable to logout : " + err);
      });
  };

  const showMenu = (event) => {
    // Prevent the default behavior of the event (in this case, following the link)
    event.preventDefault();
    if (deleteMenuRef.current) {
      deleteMenuRef.current.style.display = "block";
    }
  };

  const closeMenu = () => {
    if (deleteMenuRef.current) {
      deleteMenuRef.current.style.display = "none";
    }
  };

  return (
    <div className="user_profile_section">
      <div className="user_wrapper" onMouseLeave={closeMenu}>
        <div className="user" onClick={showMenu}>
          <div className="profile">
            {currentUser?.username[0].toUpperCase()}
          </div>
          <div className="user_info">
            <div className="user_title">User</div>
            <div className="user_username">{currentUser?.username}</div>
          </div>
        </div>
        <div ref={deleteMenuRef} className="options">
          <div className="option" onClick={logOut}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="trashCan"
            />
            Log out
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
