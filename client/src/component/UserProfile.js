function UserProfile(props) {
  return (
    <div className="user_profile_section">
      <div className="user">
        <div className="profile">{props.userInfo.username[0]}</div>
        <div className="user_info">
          <div className="user_title">User</div>
          <div className="user_username">{props.userInfo.username}</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
