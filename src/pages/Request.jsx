import React, { useEffect, useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import heart from "../assets/heart.jpg";
import kidney from "../assets/kidney.jpeg";
import note from "../assets/note.jpeg";
import liver from "../assets/liver.jpeg";
import bg from "../assets/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { addPatientAPI, getDonorsForPatientsAPI } from "../services/allAPi";

const Request = () => {
  const [results, setResults] = useState([]);
  const [donors, setDonors] = useState([]);
  const [reqInfo, setReqInfo] = useState({ Blood: "", organ: "" });
  const [show, setShow] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [patients, setPatients] = useState({
    name: "",

    phone: "",
    blood: "",
    organ: "",
    type: "",
    status: "",
  });

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const result = await getDonorsForPatientsAPI();
        if (result.status === 200) {
          setDonors(result.data);
        }
      } catch (err) {
        console.error("Error fetching donors:", err);
      }
    };
    fetchDonors();
  }, []);
  console.log(donors);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = (donor) => {
    setSelectedDonor(donor);
    setShow(true);
  };

  const handleClosePatientModal = () => setShowPatientModal(false);
  const handleShowPatientModal = () => {
    if (selectedDonor) {
      setPatients({
        ...patients,
        blood: selectedDonor.blood, // Autofill blood group
        organ: selectedDonor.organ, // Autofill organ
        name: "", // Keep name empty
        phone: "",
        type: "",
        status: "",
      });
    } else {
      setPatients({
        name: "",
        blood: "",
        organ: "",
        phone: "",
        type: "",
        status: "",
      });
    }
    setShow(false); // Close donor modal first
    setShowPatientModal(true); // Open patient modal
  };

  const handleSearch = () => {
    if (reqInfo.Blood != "" && reqInfo.organ != "") {
      const filteredResults = donors.filter(
        (donor) =>
          donor.blood === reqInfo.Blood && donor.organ === reqInfo.organ
      );
      setResults(filteredResults);
    } else {
      setResults(donors);
    }
  };

  const handleAddPatient = async () => {
    const token = sessionStorage.getItem("token"); // Get token if available

    const reqBody = {
      ...patients,
      donorId: selectedDonor ? selectedDonor._id : null,
    }; // Include donorId
    const reqHeader = {
      "Content-Type": "application/json",
    };

    // Add Authorization header only if token exists
    if (token) {
      reqHeader.Authorization = `Bearer ${token}`;
    }

    const phoneRegex = /^[6-9]\d{9}$/; // Ensures 10 digits & starts with 6-9
    if (!phoneRegex.test(reqBody.phone)) {
      alert("Invalid phone number! Please enter a valid 10-digit number.");
      return;
    }

    try {
      const result = await addPatientAPI(reqBody, reqHeader);
      if (result.status === 200) {
        setPatients({
          name: "",
          status: "",
          phone: "",
          organ: "",
          blood: "",
          type: "",
        });

        alert("Request submitted successfully!");
        handleClosePatientModal(); // Close modal
      } else {
        alert(result.response?.data || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error adding patient:", err);
      alert("Failed to submit request. Please try again.");
    }
  };

  const handleRequest = () => {};
  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center position-relative pb-5"
      style={{
        paddingTop: "80px",
        overflowY: "auto",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Title Section (Moved inside the container for better responsiveness) */}
      <div className="text-center container mt-4">
        <h3 className="fw-bolder text-wrap text-primary display-6">
          Find an Organ Donor Today!
        </h3>
        <h4
          className="text-dark conatiner mt-3 text-wrap"
          style={{
            fontFamily: "Dancing Script",
            textAlign: "justify",
          }}
        >
          Every donation brings hope, healing, and a second chance at life. By
          registering for organ donation, you are making a difference in the
          lives of those in need. Your generosity today can change the future
          for someone in desperate need of a life-saving transplant.
        </h4>
      </div>

      {/* Main Container */}
      <div className="container-fluid ">
        <div
          className="row justify-content-center mx-auto gap-4 align-items-stretch"
          style={{ maxWidth: "85%", marginTop: "40px" }}
        >
          {/* Left Column - Selection Box */}
          <div className="col-md-5 d-flex flex-column px-5 pt-4 pb-5 rounded shadow bg-white h-100">
            <h2 className="text-center mb-5 fs-4">Search For Match</h2>

            <Form>
              {/* Blood Group Selection */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bolder">Blood Group</Form.Label>
                <Form.Select
                  value={reqInfo.Blood}
                  onChange={(e) =>
                    setReqInfo({ ...reqInfo, Blood: e.target.value })
                  }
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

              {/* Organ Selection */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bolder">Organ Required</Form.Label>
                <Form.Select
                  value={reqInfo.organ}
                  onChange={(e) =>
                    setReqInfo({ ...reqInfo, organ: e.target.value })
                  }
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

              <Button
                variant="success"
                className="w-100"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Form>
          </div>

          {/* Right Column - Carousel */}
          <div className="col-md-6 d-flex align-items-stretch">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide w-100 shadow h-100"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner h-100">
                <div
                  className="carousel-item active h-100"
                  data-bs-interval="3000"
                >
                  <img
                    src={heart}
                    className="d-block w-100 h-100 rounded object-fit-cover"
                    alt="Organ Donation"
                  />
                </div>
                <div className="carousel-item h-100" data-bs-interval="3000">
                  <img
                    src={note}
                    className="d-block w-100 h-100 rounded object-fit-cover"
                    alt="Note"
                  />
                </div>
                <div className="carousel-item h-100" data-bs-interval="3000">
                  <img
                    src={kidney}
                    className="d-block w-100 h-100 rounded object-fit-cover"
                    alt="Kidney"
                  />
                </div>
                <div className="carousel-item h-100" data-bs-interval="3000">
                  <img
                    src={liver}
                    className="d-block w-100 h-100 rounded object-fit-cover"
                    alt="Liver"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Results Section */}
      <div
        className="mt-4 shadow bg-light p-3 rounded"
        style={{ minWidth: "1200px", maxWidth: "1250px" }}
      >
        <h4 className="text-center">Search Results</h4>
        {results.length > 0 ? (
          <div className="row justify-content-center mt-3">
            {results.map((donor) => (
              <div key={donor._id} className="col-md-4 mb-3">
                <Card className="shadow">
                  <Card.Body>
                    <Card.Title>{donor.name}</Card.Title>
                    <Card.Text>
                      <strong>Blood Group:</strong> {donor.blood} <br />
                      <strong>Organ:</strong> {donor.organ} <br />
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShow(donor);
                        }}
                      >
                        View more details
                      </a>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center ">
            <p className="mt-3 text-danger">No matching donors found.</p>
            <button
              className="btn btn-success "
              onClick={handleShowPatientModal}
            >
              Add Request
            </button>
          </div>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Donor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDonor ? (
            <>
              <p>
                <strong>Donor Name:</strong> {selectedDonor.name}
              </p>
              <p>
                <strong>Blood Group:</strong> {selectedDonor.blood}
              </p>
              <p>
                <strong>Organ:</strong> {selectedDonor.organ}
              </p>
              <p>
                <strong>Phone:</strong> {selectedDonor.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedDonor.email}
              </p>
            </>
          ) : (
            <>
              <p>No details available.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleShowPatientModal}>
            Request the organ
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPatientModal} onHide={handleClosePatientModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={patients.name}
                onChange={(e) =>
                  setPatients({ ...patients, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Select
                value={patients.blood}
                onChange={(e) =>
                  setPatients({ ...patients, blood: e.target.value })
                }
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

            <Form.Group className="mb-3">
              <Form.Label>Organ Required</Form.Label>
              <Form.Select
                value={patients.organ}
                onChange={(e) =>
                  setPatients({ ...patients, organ: e.target.value })
                }
                required
              >
                <option value="">Select an Organ</option>
                <option value="Heart">Heart</option>
                <option value="Kidney">Kidney</option>
                <option value="Liver">Liver</option>
                <option value="Lungs">Lungs</option>
                <option value="Pancreas">Pancreas</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={patients.phone}
                onChange={(e) =>
                  setPatients({ ...patients, phone: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={patients.email}
                onChange={(e) =>
                  setPatients({ ...patients, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Patient Type</Form.Label>
              <Form.Select
                value={patients.type}
                onChange={(e) =>
                  setPatients({ ...patients, type: e.target.value })
                }
                required
              >
                <option value="">Select Type</option>
                <option value="Self">Self</option>
                <option value="Relative">Relative</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePatientModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPatient}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Request;
