import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

const SignUp = ({ setUser }) => {
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    phone_number: "",
    location: "",
    interest: "student",
  });

  const handleChange = (e) => {
    const { value, id } = e.target;
    setFormInputs((currentFormInputs) => {
      const newFormInputs = { ...currentFormInputs, [id]: value };
      return newFormInputs;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      ...formInputs,
      egg_1: false,
      egg_2: false,
      egg_3: false,
      egg_4: false,
      egg_5: false,
      egg_6: false,
    };
    const usersRef = collection(db, "users");
    addDoc(usersRef, newUser).then(({ id }) => {
      const user = { id, name: formInputs.name, progress: 0 };
      setUser(user);
    });
  };

  return (
    <div className="sign-page">
      <h2>Please enter your details</h2>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <label htmlFor="name">Full name:</label>
        <input
          type="text"
          aria-label="name"
          id="name"
          value={formInputs.name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Email Address:</label>
        <input
          type="text"
          aria-label="email"
          id="email"
          value={formInputs.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="phone_number">Phone Number:</label>
        <input
          type="number"
          aria-label="phone_number"
          id="phone_number"
          value={formInputs.phone_number}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          aria-label="location"
          id="location"
          value={formInputs.location}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="interest">Source of interest:</label>
        <select
          aria-label="interest"
          id="interest"
          value={formInputs.interest}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="business">Business</option>
        </select>
        <br />
        <button type="submit">Start the hunt!</button>
      </form>
    </div>
  );
};

export default SignUp;
