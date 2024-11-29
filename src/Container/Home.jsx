import { FaSearch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";

const Home = () => {
  const Navigate = useNavigate();
  const [valueUrl, setValueUrl] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const idArray = valueUrl.split("=");
    const vdID = idArray[1];
    Navigate(`videoDetails/${vdID}`);
  };

  return (
    <div>
      <header>
        <h2>
          : :{" "}
          <span>
            {" "}
            <NavLink to={"/"}> Alpha</NavLink>
          </span>
        </h2>
      </header>
      <main>
        <div className="title">
          <h1>
            Discover Your earing <br />
            Potential
          </h1>
          <p>
            Turn your Youtube expertise into a lucrative income through resource
            sharing
          </p>
        </div>
        <form onSubmit={handleChange}>
          <div className="input-box">
            <img src="./images/YLogo.png" alt="" />
            <input
              type="url"
              value={valueUrl}
              onChange={(e) => setValueUrl(e.target.value)}
              placeholder="Enter youtube video link"
            />
          </div>
          <button type="submit">
            <FaSearch />
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};
export default Home;
