import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Request from "./pages/Request";
import Donate from "./pages/Donate";
import Auth from "./pages/Auth";
// import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Donors from "./pages/Donors";
import User from "./components/User";


function App() {
  const [insideHospital, setInsideHospital] = useState(
    sessionStorage.getItem("insideHospital") === "true"
  );
  const [userData, setUserData] = useState(null);

  const location = useLocation();

  useEffect(() => {
    setInsideHospital(sessionStorage.getItem("insideHospital") === "true");
  }, [location]);

  return (
    <>
      <Header insideHospital={insideHospital} setInsideHospital={setInsideHospital} userData={userData} setUserData={setUserData}  />
      <Routes>
        <Route path="/" element={<Home insideHospital={insideHospital} />} />
        <Route path="/request" element={<Request />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/login" element={<Auth onSetUserData={setUserData} />} />
        <Route path="/register" element={<Auth insideRegister={true} onSetUserData={setUserData} />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/user" element={<User/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;