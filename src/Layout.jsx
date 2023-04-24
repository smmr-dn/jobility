import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";

const Layout = () => {
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  const [background, setBackground] = useState("transparent");

  const listenScrollEvent = (e) => {
    if ((window.scrollY > 10) & (window.scrollY < 40)) {
      setBackground("scroll");
    }
    if (window.scrollY > 40) {
      setBackground("middle-scroll");
    } else {
      setBackground("transparent");
    }
  };

  return (
    <>
      <nav>
        <div id="nav-bar" className={`navbar-${background}`}>
          <div className="home">
            <Link to="/">
              <img id="logo-image" src="../src/img/suitcase.png" />
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>

            <Link to="/discussion">See Discussions</Link>

            <Link to="#">Articles</Link>

            <Link to="/create">
              <button>+ Add</button>
            </Link>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
