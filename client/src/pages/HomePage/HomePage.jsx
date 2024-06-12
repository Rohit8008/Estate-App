import React from "react";
import "./HomePage.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
const HomePage = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real & Get Your Dream Place</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident magni suscipit ab quisquam consequuntur itaque, unde soluta vitae ea, enim, quos tenetur? Ab, at iste vero alias corrupti quibusdam in.</p>
          <SearchBar/>
          <div className="boxes">
            <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
            </div>
            <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
            </div>
            <div className="box">
                <h1>1200+</h1>
                <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default HomePage;
