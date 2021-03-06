import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Header = props => {
  const { branding } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 py--0">
      <div className="container">
        <a href="/feed" className="navbar-brand">
          {branding}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/Training/Add" className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Feed" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Profile" className="nav-link">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  branding: "Training App"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
