import React, { useState } from "react";
import "./NewPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    console.log(inputs);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price, 10),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom, 10),
          bathroom: parseInt(inputs.bathroom, 10),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size, 10),
          school: parseInt(inputs.school, 10),
          bus: parseInt(inputs.bus, 10),
          restaurant: parseInt(inputs.restaurant, 10),
        },
      });
      navigate("/");
    } catch (error) {
      console.error(
        "Error during API request:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" required />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
                required
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                required
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" required>
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property" required>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities" required>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" required>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
                required
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input min={0} id="bus" name="bus" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                min={0}
                id="restaurant"
                name="restaurant"
                type="number"
                required
              />
            </div>
            <button className="sendButton" type="submit">
              Add
            </button>
            {error && <span className="error">{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "rohit8008",
            uploadPreset: "estate",
            maxImageFileSize: 5000000,
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
};

export default NewPostPage;
