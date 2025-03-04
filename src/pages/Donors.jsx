import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  addDonorAPI,
  deleteDonorAPI,
  getDonorAPI,
  updatedDonorAPI,
} from "../services/allAPi";

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    organ: "",
    blood: "",
    phone: "",
    email: "",
    type: "",
  });
  const [show, setShow] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  console.log(donors);
  console.log(formData);

  useEffect(() => {
    getAllDonors();
  }, []);

  const getAllDonors = async () => {
    const token = sessionStorage.getItem("token");
    const admin = sessionStorage.getItem("userRole");
    if (token && admin == "admin") {
      const reqHeader = {
        Authorization: ` Bearer ${token}`,
      };
      try {
        const result = await getDonorAPI();
        if (result.status == 200) {
          setDonors(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  //  name, email, phone, organ, type, blood

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddDonor = async () => {
    const { name, email, phone, organ, type, blood } = formData;
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
              setFormData({
                name: "",
                email: "",
                phone: "",
                organ: "",
                type: "",
                blood: "",
              });
              getAllDonors();
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

  const organCounts = donors.reduce((acc, donor) => {
    acc[donor.organ] = (acc[donor.organ] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(organCounts).map((organ) => ({
    organ,
    count: organCounts[organ],
  }));

  const handleStatusChange = async (donorId, newStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };

      // Send API request first
      const result = await updatedDonorAPI(
        donorId,
        { status: newStatus },
        reqHeader
      );

      if (result.status === 200) {
        console.log("Status updated successfully!", result.data);

        // Only update the UI if API call is successful
        setDonors((prevDonors) =>
          prevDonors.map((p) =>
            p._id === donorId ? { ...p, status: newStatus } : p
          )
        );

        // Update form data
        setEditFormData((prev) => ({ ...prev, status: newStatus }));
      } else {
        console.error("API response error:", result);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning"; // Yellow
      case "Rejected":
        return "danger"; // Red
      case "Completed":
        return "success"; // Green
      default:
        return "secondary"; // Gray (default)
    }
  };

  const handleShowDetails = (donor) => {
    setSelectedDonor(donor);
    setEditFormData(donor);
    setShowDetailsModal(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const phoneRegex = /^[6-9]\d{9}$/; // Ensures 10 digits & starts with 6-9
    if (!phoneRegex.test(reqBody.phone)) {
      alert("Invalid phone number! Please enter a valid 10-digit number.");
      return;
    }
    try {
      const result = await updatedDonorAPI(
        selectedDonor._id,
        editFormData,
        reqHeader
      );
      if (result.status === 200) {
        const updatedDonors = donors.map((d) =>
          d._id === selectedDonor._id ? result.data : d
        );
        setDonors(updatedDonors);
        setShowDetailsModal(false);
      }
    } catch (err) {
      console.log("Error updating donor:", err);
    }
  };

  const deleteDonor = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        await deleteDonorAPI(id, reqHeader);
        getAllDonors();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="container mt-4 pb-5" style={{ paddingTop: "90px" }}>
      <h2 className="text-center fw-bolder">Donors Information</h2>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Donor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control type="text" name="blood" value={formData.blood} onChange={handleChange} required />
            </Form.Group> */}
            <Form.Group className="mb-2" controlId="bloodType">
              <Form.Label className="fw-semibold">Select Blood type</Form.Label>
              <Form.Select
                name="blood"
                value={formData.blood}
                onChange={(e) =>
                  setFormData({ ...formData, blood: e.target.value })
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
            <Form.Group className="mb-3">
              <Form.Label>Organ to Donate</Form.Label>
              <Form.Select
                name="organ"
                value={formData.organ}
                onChange={(e) =>
                  setFormData({ ...formData, organ: e.target.value })
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
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="organType">
              <Form.Label className="fw-semibold">Donor type</Form.Label>
              <Form.Select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="rounded-3"
                required
              >
                <option value="">....</option>
                <option value="Self">Self</option>
                <option value="Friends/Relative">Friends/Relative</option>
              </Form.Select>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAddDonor}>
                Add Donor
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Why Donate?</Card.Title>
              <Card.Text>
                Every year, thousands of people wait for organ transplants. Your
                generosity can make a difference and give them a second chance
                at life.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Who Can Donate?</Card.Title>
              <Card.Text>
                Almost anyone can become a donor, regardless of age or medical
                history. Register today to help others in need.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3 className="my-5 text-center">Organ Donation Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="organ"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col>
          <div className="d-flex justify-content-between align-items-center my-5">
            <h2 className="mx-auto">Donors List</h2>
            <button onClick={handleShow} className="btn btn-success">
              Add Donor
            </button>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Organ to Donate</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={index}>
                  <td>
                    <button
                      className="btn btn-link text-primary"
                      onClick={() => handleShowDetails(donor)}
                    >
                      {donor.name}
                    </button>
                  </td>
                  <td>{donor.blood}</td>
                  <td>{donor.organ}</td>
                  <td>
                    <DropdownButton
                      id={`status-dropdown-${index}`}
                      title={donor.status || "Pending"}
                      variant={getStatusColor(donor.status)} // Ensure color updates
                    >
                      <Dropdown.Item
                        onClick={() => handleStatusChange(donor._id, "Pending")}
                      >
                        Pending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleStatusChange(donor._id, "Rejected")
                        }
                      >
                        Rejected
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleStatusChange(donor._id, "Completed")
                        }
                      >
                        Completed
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                  <td>
                    <i
                      class="fa-solid fa-trash text-primary"
                      onClick={() => deleteDonor(donor?._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Donor" : "Donor Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            <>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Control
                    type="text"
                    name="blood"
                    value={editFormData.blood}
                    onChange={handleEditChange}
                  />
                </Form.Group> */}
                <Form.Group className="mb-2" controlId="bloodType">
                  <Form.Label className="fw-semibold">
                    Select Blood type
                  </Form.Label>
                  <Form.Select
                    name="blood"
                    value={editFormData.blood}
                    onChange={handleEditChange}
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

                {/* <Form.Group className="mb-3">
                  <Form.Label>Organ to Donate</Form.Label>
                  <Form.Control
                    type="text"
                    name="organ"
                    value={editFormData.organ}
                    onChange={handleEditChange}  // name, email, phone, organ, type, blood
                  />
                </Form.Group> */}
                <Form.Label>Organs to Donate</Form.Label>
                <Form.Select
                  name="organ"
                  value={editFormData.organ}
                  onChange={handleEditChange}
                >
                  <option value=""></option>
                  <option value="Heart">Heart</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Pancreas">Pancreas</option>
                  <option value="Lungs">Lungs</option>
                  <option value="Bones">Bones</option>
                  <option value="Thymus">Thymus</option>
                  <option value="Stomach">Stomach</option>
                </Form.Select>
                <Form.Group className="mb-3">
                  <Form.Label>Phone No:</Form.Label>
                  <Form.Control
                    type="text"
                    name="blood"
                    value={editFormData.phone}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="text"
                    name="blood"
                    value={editFormData.email}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Form>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {selectedDonor?.name}
              </p>
              <p>
                <strong>Blood Group:</strong> {selectedDonor?.blood}
              </p>
              <p>
                <strong>Organ to Donate:</strong> {selectedDonor?.organ}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedDonor?.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedDonor?.email}
              </p>

              <p>
                <strong>Status:</strong> {selectedDonor?.status || "Pending"}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Donors;
