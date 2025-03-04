import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import { useContext } from "react";
import { loginAPI, registerAPI, adminLoginAPI } from "../services/allAPi";
import { tokenAuthContext } from "../contextAPI/contextAPI";

const Auth = ({ insideRegister, insideHospital, onSetUserData }) => {
  const [authType, setAuthType] = useState("user"); // Default: User
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    phone: "",
    blood: "",
    email: "",
    password: "",
  });
  const [user,setUser] = useState([])

  const [hospitalData, setHospitalData] = useState({
    hEmail: "",
    password: "",
  });
  const { login } = useContext(tokenAuthContext);


  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("users"));
    const admin = JSON.parse(sessionStorage.getItem("admin"));
    if (user) {
      setIsLoggedIn(true);
      onSetUserData(user);
    } else if (admin) {
      setIsLoggedIn(true);
      onSetUserData(admin);
    }
  }, []);

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (userData.name && userData.age && userData.phone && userData.blood && userData.email && userData.password) {
      try {
        const result = await registerAPI(userData); // Call register API
        if (result.status === 200) {
          alert("Registration Successful! Please log in.");
          navigate("/login");
          setUserData({name: "",
            age: "",
            phone: "",
            blood: "",
            email: "",
            password: ""})
        } else {
          alert(result.data || "Registration failed");
        }
      } catch (err) {
        console.error("Registration Error:", err);
        alert("Something went wrong. Try again.");
      }
    } else {
      alert("Please fill all fields!");
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (authType === "user" && userData.email && userData.password) {
      try {
        const result = await loginAPI(userData);
        if (result.status === 200) {
          sessionStorage.setItem("users", JSON.stringify(result.data.users));
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem("userRole", "users");
          login(result.data.token, result.data.users, "users");
          alert(`Welcome ${result.data.users.name}`);
          navigate("/");
        } else {
          alert("Invalid login credentials");
        }
      } catch (err) {
        console.error("User Login Error:", err);
      }
    } else if (authType === "hospital" && hospitalData.hEmail && hospitalData.password) {
      try {
        const result = await adminLoginAPI(hospitalData);
        if (result.status === 200) {
          sessionStorage.setItem("admin", JSON.stringify(result.data.admin));
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem("userRole", "admin");
          login(result.data.token, result.data.admin, "admin");
          navigate("/");
        } else {
          alert("Invalid login credentials");
        }
      } catch (err) {
        console.error("Hospital Login Error:", err);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };
  

  // Handle Auth Type Change (Reset Form Fields)
  const handleAuthTypeChange = (type) => {
    setAuthType(type);

    if (type === "hospital") {
      setUserData({
        name: "",
        age: "",
        phone: "",
        blood: "",
        email: "",
        password: "",
      }); // Reset user fields
    } else {
      setHospitalData({ hEmail: "", password: "" }); // Reset hospital fields
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh", width: "100%", paddingTop: "90px" }}
    >
      <div className="container">
        <div className="card shadow py-1 px-3">
          <div className="row py-3">
            <div className="col-lg-6 d-flex justify-content-center align-items-center">
              <img
                src={loginImg}
                alt="Login"
                className="img-fluid"
                style={{
                  minWidth: "100%",
                  minHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="col-lg-6 bg-light rounded">
              <h3>
                <i className="fa-solid fa-hand-holding-heart me-2 "></i>ARJ
                Organ Donation
              </h3>
              <h5 className="mt-1">Sign {insideRegister ? "Up" : "In"}</h5>

              <div className="d-flex justify-content-center mb-2">
                <button
                  className={`btn me-2 ${
                    authType === "user" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => handleAuthTypeChange("user")}
                >
                  User
                </button>
                <button
                  className={`btn ${
                    authType === "hospital"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handleAuthTypeChange("hospital")}
                >
                  Hospital
                </button>
              </div>

              <Form onSubmit={insideRegister ? handleRegister : handleLogin}>

                {/* USER REGISTRATION FORM (Only if insideRegister is true and user is selected) */}
                {authType === "user" && insideRegister && (
                  <>
                    <FloatingLabel
                      controlId="floatingName"
                      label="Name"
                      className="mb-2"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingAge"
                      label="Age"
                      className="mb-2"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Age"
                        value={userData.age}
                        onChange={(e) =>
                          setUserData({ ...userData, age: e.target.value })
                        }
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingPhone"
                      label="Phone"
                      className="mb-2"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Phone"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData({ ...userData, phone: e.target.value })
                        }
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingBlood"
                      label="Blood Group"
                      className="mb-2"
                    >
                      <Form.Select
                        value={userData.blood}
                        onChange={(e) =>
                          setUserData({ ...userData, blood: e.target.value })
                        }
                      >
                        <option value="">Select...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </Form.Select>
                    </FloatingLabel>
                  </>
                )}

                {/* COMMON EMAIL & PASSWORD FIELDS */}
                <FloatingLabel
                  controlId="floatingEmail"
                  label="Email address"
                  className="mb-2"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={
                      authType === "hospital"
                        ? hospitalData.hEmail
                        : userData.email
                    }
                    onChange={(e) =>
                      authType === "hospital"
                        ? setHospitalData({
                            ...hospitalData,
                            hEmail: e.target.value,
                          })
                        : setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={
                      authType === "hospital"
                        ? hospitalData.password
                        : userData.password
                    }
                    onChange={(e) =>
                      authType === "hospital"
                        ? setHospitalData({
                            ...hospitalData,
                            password: e.target.value,
                          })
                        : setUserData({ ...userData, password: e.target.value })
                    }
                  />
                </FloatingLabel>

                <div className="d-flex justify-content-center w-100">
                  <button
                    type="submit"
                    className="btn my-3 btn-danger px-5 py-2"
                  >
                    {authType === "hospital"
                      ? "Login"
                      : insideRegister
                      ? "Register"
                      : "Login"}
                  </button>
                </div>

                {authType === "user" &&(
                  <p className="text-center">
                  {insideRegister ? (
                    <>
                      Already registered? Click here to{" "}
                      <Link to="/login">Login</Link>
                    </>
                  ) : (
                    <>
                      New user? Click here to{" "}
                      <Link to="/register">Register</Link>
                    </>
                  )}
                </p>)}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
