import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Row, Modal, Form } from "react-bootstrap";
import { deleteDonorAPI, deletePatientAPI, editUserAPI, getUserAPI } from "../services/allAPi";

const User = () => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [request, setRequest] = useState([]);
  const [show, setShow] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editType, setEditType] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = sessionStorage.getItem("token");
    const users = JSON.parse(sessionStorage.getItem("users") || "{}");
    const id = users?._id || users?.id;

    if (!id) {
      console.error("User ID is missing!");
      return;
    }

    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await getUserAPI(id, reqHeader);
      if (result.status === 200) {
        setUser(result.data.user);
        setDonations(result.data.donations || []);
        setRequest(result.data.requests || []);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = (id, type) => {
    let selectedData = {};

    if (type === "user") {
      selectedData = user;
    } else if (type === "donation") {
      selectedData = donations.find((donation) => donation._id === id) || {};
    } else if (type === "request") {
      selectedData = request.find((req) => req._id === id) || {};
    }

    setEditType(type);
    setEditFormData(selectedData);
    setShow(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    console.log("Edit Type:", editType);
    console.log("Edit Form Data:", editFormData);
    console.log("Token:", token);

    try {
        let response;
        if (editType === "user") {
            response = await editUserAPI(editFormData._id, editFormData, reqHeader);
        } else if (editType === "donation") {
            response = await updatedDonorAPI(editFormData._id, editFormData, reqHeader);
        } else if (editType === "request") {
            response = await updatedPatientAPI(editFormData._id, editFormData, reqHeader);
        }

        console.log("Response received:", response);

        if (response && response.status === 200) {
            alert("Updated successfully!");
            fetchUserData();
            setShow(false);
        } else {
            console.error("Unexpected response:", response);
        }
    } catch (error) {
        console.error("Update failed:", error);
    }
};
const deleteDonation = async (id) => {
  const token = sessionStorage.getItem("token");
  if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
          await deleteDonorAPI(id, reqHeader);
          getAllDonations(); // Refresh donation data
      } catch (err) {
          console.error("Error deleting donation:", err);
      }
  }
};

const deleteRequest = async (id) => {
  const token = sessionStorage.getItem("token");
  if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
          await deletePatientAPI(id, reqHeader);
          getAllRequests(); // Refresh request data
      } catch (err) {
          console.error("Error deleting request:", err);
      }
  }
};


  return (
    <div style={{ marginTop: "80px", padding: "20px" }} className="container">
      <div className="container mt-4 shadow bg-light">
        <h2 className="text-center mb-4 pt-3">Personal Information</h2>
        <div className="p-5 rounded mx-auto w-75">
          <dl className="row">
            {user ? (
              <>
                <dt className="col-sm-5 fw-bold fs-5">Username:</dt>
                <dd className="col-sm-7 pb-2 fs-5">{user?.name || "N/A"}</dd>
                <dt className="col-sm-5 fw-bold fs-5">Blood:</dt>
                <dd className="col-sm-7 pb-2 fs-5">{user?.blood || "N/A"}</dd>
                <dt className="col-sm-5 fw-bold fs-5">Age:</dt>
                <dd className="col-sm-7 pb-2 fs-5">{user?.age || "N/A"}</dd>
                <dt className="col-sm-5 fw-bold fs-5">Email:</dt>
                <dd className="col-sm-7 pb-2 fs-5">{user?.email || "N/A"}</dd>
                <dt className="col-sm-5 fw-bold fs-5">Phone:</dt>
                <dd className="col-sm-7 pb-2 fs-5">{user?.phone || "N/A"}</dd>
                <button
                  className="btn btn-danger col-sm-4"
                  onClick={() => handleEdit(user._id, "user")}
                >
                  Edit
                </button>
              </>
            ) : (
              <dt className="col-sm-8">No user data available.</dt>
            )}
          </dl>
        </div>
      </div>

      <Row className="gap-5 p-3 mt-3">
        <Col>
          <h2>Your Donations</h2>
          <table className="table mt-2">
            <thead>
              <th>Organ</th>
              <th>Status</th>
              <th>Action</th>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index}>
                  <td>{donation.organ}</td>
                  <td>{donation.status || "Pending"}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleEdit(donation._id, "donation")}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary ms-3" onClick={deleteDonation}
                      
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>

        <Col >
          <h2>Your Requests</h2>
          <table className="table mt-2">
          <thead>
              <th>Organ</th>
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </thead>
            <tbody>
              {request.map((req, index) => (
                <tr key={index}>
                  <td>{req.organ}</td>
                  <td>{req.status}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleEdit(req._id, "request")}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary ms-3" onClick={deleteRequest}
                      
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit{" "}
            {editType === "user"
              ? "User"
              : editType === "donation"
              ? "Donation"
              : "Request"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Fields for User */}
            {editType === "user" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editFormData.name || ""}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Blood</Form.Label>
                  <Form.Control
                    type="text"
                    name="blood"
                    value={editFormData.blood || ""}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    value={editFormData.age || ""}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={editFormData.email || ""}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={editFormData.phone || ""}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </>
            )}

            {/* Fields for Donations */}
            {editType === "donation" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editFormData.name || ""}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>blood</Form.Label>
                  <Form.Control
                    type="text"
                    name="blood"
                    value={editFormData.blood || ""}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Organ</Form.Label>
                  <Form.Select
                  name="organ"
                    value={editFormData.organ}
                    onChange={handleEditChange}
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
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                  name="tyoe"
                    value={editFormData.type}
                    onChange={handleEditChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Self">Self</option>
                    <option value="Relative">Relative</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}

            {/* Fields for Requests */}
            {editType === "request" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editFormData.name || ""}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>blood</Form.Label>
                  <Form.Control
                    type="text"
                    name="blood"
                    value={editFormData.blood || ""}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Organ</Form.Label>
                  <Form.Select
                  name="organ"
                    value={editFormData.organ}
                    onChange={handleEditChange}
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
                <Form.Group className="mb-3">
                  <Form.Label>Patient Type</Form.Label>
                  <Form.Select
                  name="type"
                    value={editFormData.type}
                    onChange={handleEditChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Self">Self</option>
                    <option value="Relative">Relative</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;
