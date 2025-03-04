import React from "react";

const Sidebar = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-3 d-none d-sm-inline">
                <i className="fa-solid fa-hand-holding-heart me-2 text-white"></i>
                ARJ Organ Donation
              </span>
            </a>
            <ul className="nav mt-5 nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <a href="#" className="nav-link align-middle px-0 text-white">
                  <i className="fa-solid fa-house me-2"></i> 
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </a>
              </li>
              <li>
                <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                  <i className="fa-solid fa-list-check me-2"></i> 
                  <span className="ms-1 d-none d-sm-inline">Request</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-0 align-middle text-white">
                  <i className="fa-solid fa-hand-holding-medical me-2"></i> 
                  <span className="ms-1 d-none d-sm-inline">Donate</span>
                </a>
              </li>
            </ul>
            <hr />
            <div className="dropdown pb-4">
              <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-user me-2"></i>
                <span className="d-none d-sm-inline mx-1">User</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li><a className="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
