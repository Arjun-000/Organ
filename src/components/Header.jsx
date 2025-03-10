import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { tokenAuthContext } from "../contextAPI/contextAPI";

const Header = () => {
  const { user, isAdmin, isAuthenticated, logout } = useContext(tokenAuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isHome = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
    setExpanded(false);
  };

  return (
    <Navbar expand="lg" className="bg-dark shadow" fixed="top" expanded={expanded}>
      <div className="container-fluid">
        <Navbar.Brand>
          <Link to="/" className="fw-bolder text-decoration-none text-white" onClick={() => setExpanded(false)}>
            <i className="fa-solid fa-hand-holding-heart me-2 text-white"></i> ARJ Organs
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" onClick={() => setExpanded(!expanded)} />

        <Navbar.Collapse id="basic-navbar-nav" className={`bg-dark px-3 ${expanded ? "show" : ""}`}>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white fw-bold" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>

            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/request" className="text-white fw-bold" onClick={() => setExpanded(false)}>
                  Request An Organ
                </Nav.Link>
                <Nav.Link as={Link} to="/donate" className="text-white fw-bold" onClick={() => setExpanded(false)}>
                  Donate
                </Nav.Link>
              </>
            )}

            {isAdmin && (
              <>
                <Nav.Link as={Link} to="/patients" className="text-white fw-bold" onClick={() => setExpanded(false)}>
                  Patients
                </Nav.Link>
                <Nav.Link as={Link} to="/donors" className="text-white fw-bold" onClick={() => setExpanded(false)}>
                  Donors
                </Nav.Link>
              </>
            )}

            <div className="dropdown mt-2 me-5">
              <button className="btn dropdown-toggle" type="button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <i className="fa-solid fa-user text-light"></i>
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-end show" onClick={() => setDropdownOpen(false)}>
                  {isAuthenticated ? (
                    <>
                      <li>
                        <Link to="/user" className="dropdown-item fw-bold">
                          {user?.name || ""}
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
