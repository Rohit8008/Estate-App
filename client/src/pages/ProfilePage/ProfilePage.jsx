import React, { useContext } from "react";
import "./ProfilePage.scss";
import List from "../../components/List/List";
import Chat from "../../components/Chat/Chat";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
const ProfilePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button> <Link to={"/profile/update"}> Update Profile</Link></button>
          </div>
          <div className="info">
            <span>
              Avatar: <img src={currentUser.avatar || "/favicon.png"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>LogOut</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button><Link to={"/add"}>Create New Post</Link></button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
