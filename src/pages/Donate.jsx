import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import bg from "../assets/bg.jpg";
import { addDonorAPI } from "../services/allAPi";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const [donateInfo, setDonateInfo] = useState({
    name: "",
    email: "",
    phone: "",
    organ: "",
    type: "",
    blood: "",
  });
  const navigate = useNavigate();

  const handleAddDonor = async () => {
    const { name, email, phone, organ, type, blood } = donateInfo;
    if (sessionStorage.getItem("token")) {
      if (name && email && phone && organ && type && blood) {
        const token = sessionStorage.getItem("token");
        if (token) {
          const reqBody = { name, email, phone, organ, type, blood };
          const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const phoneRegex = /^[6-9]\d{9}$/; // Ensures 10 digits & starts with 6-9
          if (!phoneRegex.test(reqBody.phone)) {
            alert(
              "Invalid phone number! Please enter a valid 10-digit number."
            );
            return;
          }

          try {
            const result = await addDonorAPI(reqBody, reqHeader);
            if (result.status === 200) {
              setDonateInfo({
                name: "",
                email: "",
                phone: "",
                organ: "",
                type: "",
                blood: "",
              });
            } else {
              alert(result.response.data);
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          alert("Authentication Failed! Please log in again.");
        }
      } else {
        alert("Please fill the form completely.");
      }
    } else {
      alert("Please login to Donate");
      navigate("/login");
    }
  };

  return (
    <div
      className="d-flex align-items-center pb-5"
      style={{
        marginTop: "70px",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container>
        {/* Hero Section */}
        <Row className="text-center my-4">
          <Col>
            <h1 className="text-success fw-bold">Become an Organ Donor</h1>
            <p className="text-muted fs-5">
              Your decision to donate can give someone a second chance at life.
            </p>
          </Col>
        </Row>

        {/* Form Section */}
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 shadow-lg rounded-4 border-0">
              <Card.Body>
                <Card.Title className="text-center mb-3 fs-4 fw-semibold text-success">
                  Register as a Donor
                </Card.Title>
                <Form>
                  <Form.Group className="mb-2" controlId="name">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      className="rounded-3"
                      required
                      value={donateInfo.name}
                      onChange={(e) =>
                        setDonateInfo({ ...donateInfo, name: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="email">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      className="rounded-3"
                      required
                      value={donateInfo.email}
                      onChange={(e) =>
                        setDonateInfo({ ...donateInfo, email: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="phone">
                    <Form.Label className="fw-semibold">
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      className="rounded-3"
                      required
                      value={donateInfo.phone}
                      onChange={(e) =>
                        setDonateInfo({ ...donateInfo, phone: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="organType">
                    <Form.Label className="fw-semibold">
                      Organs You Wish to Donate
                    </Form.Label>
                    <Form.Select
                      value={donateInfo.organ}
                      onChange={(e) =>
                        setDonateInfo({ ...donateInfo, organ: e.target.value })
                      }
                      className="rounded-3"
                      required
                    >
                      <option value="">Select Organ</option>
                      <option value="Heart">Heart</option>
                      <option value="Kidney">Kidney</option>
                      <option value="Pancreas">Pancreas</option>
                      <option value="Lungs">Lungs</option>
                      <option value="Bones">Bones</option>
                      <option value="Thymus">Thymus</option>
                      <option value="Stomach">Stomach</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="bloodType">
                    <Form.Label className="fw-semibold">
                      Select Blood type
                    </Form.Label>
                    <Form.Select
                      value={donateInfo.blood}
                      onChange={(e) =>
                        setDonateInfo({ ...donateInfo, blood: e.target.value })
                      }
                      className="rounded-3"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="O+">O+</option>
                      <option value="AB+">AB+</option>
                      <option value="A-">A-</option>
                      <option value="B-">B-</option>
                      <option value="O-">O-</option>
                      <option value="AB-">AB-</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="organType">
                    <Form.Label className="fw-semibold">Donor type</Form.Label>
                    <Form.Select
                      value={donateInfo.type}
                      onChange={(e) =>
                        setDonateInfo({ ...donateInfo, type: e.target.value })
                      }
                      className="rounded-3"
                      required
                    >
                      <option value="">....</option>
                      <option value="Self">Self</option>
                      <option value="Friends/Relative">Friends/Relative</option>
                    </Form.Select>
                  </Form.Group>

                  <Button
                    variant="success"
                    onClick={handleAddDonor}
                    className="w-100 rounded-3 fw-semibold"
                  >
                    Submit Registration
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Donate;
