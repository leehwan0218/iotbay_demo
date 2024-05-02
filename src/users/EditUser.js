import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Change to null instead of []
  const [error, setError] = useState(false);
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email; // Null check added here

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }

    // Fetch all users from the backend
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        console.log("Fetched users from backend:", response.data); // Log the fetched users data
        // Filter out the user with the matching email
        const filteredUser = response.data.find(
          (user) => user.email === userEmail
        );
        if (filteredUser) {
          setUser(filteredUser);
        } else {
          setError(true); // Set error state to true if user is not found
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(true);
      });
  }, [userEmail, navigate]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled out
    if (
      !user.email ||
      !user.firstName ||
      !user.lastName ||
      !user.dob ||
      !user.password ||
      !user.phoneNumber ||
      !user.streetNumber ||
      !user.postCode ||
      !user.gender ||
      !user.terms
    ) {
      setError(true); // Set error state to true
      return;
    }

    // If everything is filled out, make the API call to update user details
    try {
      await axios.put(`http://localhost:8080/user/${user.id}`, user);
      // Redirect to view user page after successful update
      navigate(`/viewuser/${user.id}`);
    } catch (error) {
      // Handle the error appropriately
      console.error("There was an error updating user details:", error);
    }
  };


  if (!user) {
    return null; // Render nothing until user data is fetched
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User Profile</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              All fields are required.
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${
                  error && !user.email ? "is-invalid" : ""
                }`}
                placeholder="Enter your email"
                name="email"
                value={user.email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Add input fields for other user details */}
            {/* First Name input */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  error && !user.firstName ? "is-invalid" : ""
                }`}
                placeholder="Enter your first name"
                name="firstName"
                value={user.firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Last Name input */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  error && !user.lastName ? "is-invalid" : ""
                }`}
                placeholder="Enter your last name"
                name="lastName"
                value={user.lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Date of Birth input */}
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className={`form-control ${
                  error && !user.dob ? "is-invalid" : ""
                }`}
                placeholder="Enter your DOB"
                name="dob"
                value={user.dob}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Password input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  error && !user.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                name="password"
                value={user.password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Phone Number input */}
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className={`form-control ${
                  error && !user.phoneNumber ? "is-invalid" : ""
                }`}
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Street Number input */}
            <div className="mb-3">
              <label htmlFor="streetNumber" className="form-label">
                Street Number
              </label>
              <input
                type="text"
                className={`form-control ${
                  error && !user.streetNumber ? "is-invalid" : ""
                }`}
                placeholder="Enter your street number"
                name="streetNumber"
                value={user.streetNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Post Code input */}
            <div className="mb-3">
              <label htmlFor="postCode" className="form-label">
                Post Code
              </label>
              <input
                type="text"
                className={`form-control ${
                  error && !user.postCode ? "is-invalid" : ""
                }`}
                placeholder="Enter your post code"
                name="postCode"
                value={user.postCode}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Gender select */}
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className={`form-control ${
                  error && !user.gender ? "is-invalid" : ""
                }`}
                name="gender"
                value={user.gender}
                onChange={onInputChange}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
              </select>
            </div>
            {/* Terms checkbox */}
            <div className="mb-3">
              <input
                type="checkbox"
                id="terms"
                className={`form-check-input ${
                  error && !user.terms ? "is-invalid" : ""
                }`}
                name="terms"
                checked={user.terms}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="terms" className="form-check-label">
                Agree to Terms of Service
              </label>
            </div>
            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            {/* Cancel link */}
            <Link className="btn btn-danger btn-block mx-2" to={`/View`}>
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
