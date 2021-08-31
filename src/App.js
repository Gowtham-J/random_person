import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const getPerson = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { email, phone } = person;
    const { first, last } = person.name;
    const {
      street: { name, number },
    } = person.location;
    const { large: image } = person.picture;
    const {
      dob: { age },
    } = person;
    const { password } = person.login;

    const newPerson = {
      age,
      email,
      phone,
      image,
      password,
      name: `${first} ${last}`,
      street: `${number} ${name}`,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleMouseOver = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            className="user-img"
            src={(person && person.image) || defaultImage}
            alt="randomUser"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleMouseOver}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleMouseOver}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseOver={handleMouseOver}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleMouseOver}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleMouseOver}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleMouseOver}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getPerson}>
            {loading ? "loading..." : "random person"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
