import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="bg-dark text-white  pt-5">
      <Container>
        <Row className="gy-4">
          {/* Website Intro */}
          <Col xs={12} md={4} className="text-start">
            <h4 className="fw-bold">
              <i className="fa-solid fa-hand-holding-heart me-2"></i>ARJ Organ Donation
            </h4>
            <p>Designed and built with all the love in the world by the Luminar team with the help of our contributors.</p>
            <p>Code licensed MIT, docs CC BY 3.0.</p>
            <p>Currently v5.3.3.</p>
          </Col>

          {/* Quick Links */}
          <Col xs={12} md={2} className="text-start">
            <h5>Links</h5>
            <Link to="/" className="text-white text-decoration-none d-block">Landing Page</Link>
            <Link to="/login" className="text-white text-decoration-none d-block">Home Page</Link>
            <Link to="/register" className="text-white text-decoration-none d-block">Donation</Link>
          </Col>

          {/* Guides */}
          <Col xs={12} md={2} className="text-start">
            <h5>Guides</h5>
            <a href="https://react.dev/" target="_blank" className="text-white text-decoration-none d-block">React</a>
            <a href="https://react-bootstrap.netlify.app/" target="_blank" className="text-white text-decoration-none d-block">React Bootstrap</a>
            <a href="https://www.npmjs.com/package/react-router-dom" target="_blank" className="text-white text-decoration-none d-block">React Router</a>
          </Col>

          {/* Contact & Social Icons */}
          <Col xs={12} md={4} className="text-start">
            <h5>Contact Us</h5>
            <div className="d-flex">
              <input
                type="text"
                placeholder="Enter your email..."
                className="form-control me-2"
              />
              <button className="btn btn-info">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            {/* Social Media Links */}
            <div className="d-flex gap-3 mt-3">
              <a href="https://twitter.com/" target="_blank" className="text-white">
                <i className="fa-brands fa-twitter fs-5"></i>
              </a>
              <a href="https://www.instagram.com/" target="_blank" className="text-white">
                <i className="fa-brands fa-instagram fs-5"></i>
              </a>
              <a href="https://www.facebook.com/" target="_blank" className="text-white">
                <i className="fa-brands fa-facebook fs-5"></i>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" className="text-white">
                <i className="fa-brands fa-linkedin fs-5"></i>
              </a>
              <a href="https://github.com/" target="_blank" className="text-white">
                <i className="fa-brands fa-github fs-5"></i>
              </a>
              <a href="https://www.call.com/" target="_blank" className="text-white">
                <i className="fa-solid fa-phone fs-5"></i>
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-2">
          <Col>
            <p className="text-center">© May 2024 Batch, ARJ Donations. Built with React.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
