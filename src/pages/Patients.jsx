import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  addPatientAPI,
  deletePatientAPI,
  getDonorAPI,
  getPatientsAPI,
  updatedPatientAPI,
} from "../services/allAPi";

const Patients = () => {
  const [patientData, setPatientData] = useState([]);
  const [patients, setPatients] = useState({
    name: "",

    phone: "",
    blood: "",
    organ: "",
    type: "",
    status: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    getAllPatients();
  }, []);
  console.log(patients);
  console.log(patientData);
  console.log(donors);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddPatient = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqBody = { ...patients };
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
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
          getAllPatients();
          handleClose();
        } else {
          alert(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getAllPatients = async () => {
    const token = sessionStorage.getItem("token");
    const admin = sessionStorage.getItem("userRole");
    if (token && admin === "admin") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getPatientsAPI();

        if (result.status === 200) {
          setPatientData(result.data);
          const donorData = await getDonorAPI();
          if (donorData.status === 200) {
            setDonors(donorData.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
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

  const organCounts = patientData.reduce((acc, patient) => {
    acc[patient.organ] = (acc[patient.organ] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.keys(organCounts).map((organ) => ({
    organ,
    count: organCounts[organ],
  }));
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  // Modals
  const handleSaveChanges = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };
    const phoneRegex = /^[6-9]\d{9}$/; // Ensures 10 digits & starts with 6-9
    if (!phoneRegex.test(reqBody.phone)) {
      alert("Invalid phone number! Please enter a valid 10-digit number.");
      return;
    }
    try {
      const result = await updatedPatientAPI(
        selectedPatient._id,
        editFormData,
        reqHeader
      );

      if (result.status === 200) {
        const updatedPatients = patientData.map((p) =>
          p._id === selectedPatient._id ? result.data : p
        );
        setPatientData(updatedPatients);
        setShowDetailsModal(false);
      }
    } catch (err) {
      console.log("Error updating patient:", err);
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };
  const handleShowDetails = (patientData) => {
    setSelectedPatient(patientData);
    setEditFormData(patientData);
    setShowDetailsModal(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleStatusChange = async (patientId, newStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };

      // Find the patient and update locally
      const updatedPatients = patientData.map((p) =>
        p._id === patientId ? { ...p, status: newStatus } : p
      );

      // Set updated state
      setPatientData(updatedPatients);
      setEditFormData((prev) => ({ ...prev, status: newStatus }));

      // API Call to Update in Backend
      const result = await updatedPatientAPI(
        patientId,
        { status: newStatus },
        reqHeader
      );

      if (result.status === 200) {
        console.log("Status updated successfully!");
      }
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  const deletePatient = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        await deletePatientAPI(id, reqHeader);
        getAllPatients();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mt-4 pb-5" style={{ paddingTop: "90px" }}>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Text>
                <strong>
                  "In the journey of organ transplantation, you are the silent
                  force that brings hope to families, comfort to patients, and
                  life to those in need. Your role is more powerful than you
                  know."
                </strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Text>
                <strong>
                  "For every family waiting anxiously, for every patient hoping
                  for a miracle—you are the one who keeps the process moving,
                  ensuring that life and hope are never lost in the system."
                </strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <h3 className="my-5 text-center">Organ Donation Chart</h3>
          <ResponsiveContainer className="pt-2" width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="organ"
                outerRadius={130}
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
        <Col onMouseDown={7}>
          <div>
            <div className="d-flex justify-content-between align-items-center my-5">
              <h2 className="mx-auto fw-bolder">Patient List</h2>
              <button onClick={handleShow} className="btn btn-success">
                Add Patient
              </button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Patient</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={patients.name}
                      onChange={(e) =>
                        setPatients({ ...patients, name: e.target.value })
                      }
                      className="form-control mb-3"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={patients.phone}
                      onChange={(e) =>
                        setPatients({ ...patients, phone: e.target.value })
                      }
                      className="form-control mb-3"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="bloodType">
                    <Form.Label className="fw-semibold">
                      Select Blood type
                    </Form.Label>
                    <Form.Select
                      name="blood"
                      value={patients.blood}
                      onChange={(e) =>
                        setPatients({ ...patients, blood: e.target.value })
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
                  <Form.Label>Organs Required</Form.Label>
                  <Form.Select
                    value={patients.organ}
                    onChange={(e) =>
                      setPatients({ ...patients, organ: e.target.value })
                    }
                  >
                    <option value="">Select Organ Required</option>
                    <option value="Heart">Heart</option>
                    <option value="Kidney">Kidney</option>
                    <option value="Pancreas">Pancreas</option>
                    <option value="Lungs">Lungs</option>
                    <option value="Bones">Bones</option>
                    <option value="Thymus">Thymus</option>
                    <option value="Stomach">Stomach</option>
                  </Form.Select>

                  <Form.Group className="mb-2" controlId="organType">
                    <Form.Label className="fw-semibold">Donor type</Form.Label>
                    <Form.Select
                      value={patients.type}
                      onChange={(e) =>
                        setPatients({ ...patients, type: e.target.value })
                      }
                      className="rounded-3"
                      required
                    >
                      <option value="">....</option>
                      <option value="Self">Self</option>
                      <option value="Friends/Relative">Friends/Relative</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddPatient}>
                  Add Patient
                </Button>
              </Modal.Footer>
            </Modal>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Organ Needed</th>
                  <th>Donor Assigned</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {patientData.map((patient, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className="btn btn-link text-primary"
                        onClick={() => handleShowDetails(patient)}
                      >
                        {patient.name}
                      </button>
                    </td>
                    <td>{patient.blood}</td>
                    <td>{patient.organ}</td>
                    <td>
                      {donors.find((donors) => donors._id == patient.donorId)
                        ?.name || "Not Assigned"}
                    </td>
                    <td>
                      {/* <Form.Select
  name="status"
  value={selectedPatient?._id === editFormData._id ? editFormData.status : patient.status}
  onChange={(e) => handleStatusChange(selectedPatient._id, e.target.value)}
  className="rounded-3"
  required
>
  <option value="Pending">Pending</option>
  <option value="Rejected">Rejected</option>
  <option value="Completed">Completed</option>
</Form.Select> */}
                      <DropdownButton
                        id={`status-dropdown-${index}`}
                        title={patient.status || "Pending"}
                        variant={getStatusColor(patient.status)} // Dynamically apply color
                      >
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(patient._id, "Pending")
                          }
                        >
                          Pending
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(patient._id, "Rejected")
                          }
                        >
                          Rejected
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(patient._id, "Completed")
                          }
                        >
                          Completed
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                    <td>
                      <button className="btn">
                        <i
                          class="fa-solid fa-trash text-primary"
                          onClick={() => deletePatient(patient?._id)}
                        ></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              </Form>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {selectedPatient?.name}
              </p>
              <p>
                <strong>Blood Group:</strong> {selectedPatient?.blood}
              </p>
              <p>
                <strong>Organ to Donate:</strong> {selectedPatient?.organ}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedPatient?.phone}
              </p>

              <p>
                <strong>Status:</strong> {selectedPatient?.status || "Pending"}
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

export default Patients;
