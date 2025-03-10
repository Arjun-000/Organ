import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import heart from "../assets/heart-scope.png";
import hosp from "../assets/hosp (1).jpeg";
import hospital from "../assets/hosp (2).jpeg";

const Home = () => {
  const [userRole, setUserRole] = useState("user"); // Default role is "user"

  useEffect(() => {
    // Check if a user role exists in sessionStorage
    const storedRole = sessionStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);
  const storedUser = sessionStorage.getItem("users");
  const userData = storedUser ? JSON.parse(storedUser) : null;
  const userName = userData ? userData.name : "Guest";

  return (
    <div className="" style={{ margingTop: "80px"}} isHome={true}>
      <div className="container-fluid">
      
         { userRole === "admin" ? (
          // Hospital/Admin View
          <>

            <Carousel style={{paddingTop:'70px'}}>
              <Carousel.Item>
                <Card className=" shadow-lg border-0">
                  <Card.Body>
                    <img src={hosp} alt="" width={"100%"} height={"600px"} />
                  </Card.Body>
                </Card>
              </Carousel.Item>
              <Carousel.Item>
                <Card className=" shadow-lg border-0">
                  <Card.Body>
                    <img
                      src={hospital}
                      alt=""
                      width={"100%"}
                      height={"600px"}
                    />
                  </Card.Body>
                </Card>
              </Carousel.Item>
            </Carousel>
            <div className="py-5 ">
              <div className="container">
                ARJ Hospital the most trusted hospital in India ARJ
                Medical College Hospital, located in Thiruvalla, Kerala, stands
                as a beacon of excellence in the ministry of healing. As the
                healing arm of the Believers Eastern Church , this institution
                provides world-class medical services with a focus on compassion
                and care. A greenfield project initiated in 2014 on a sprawling
                25-acre campus, the hospital is affiliated to the Kerala
                University of Health Sciences (KUHS) and holds accreditation
                from NABH (National Accreditation Board for Hospitals and Health
                Care Providers) and NABL (National Accreditation Board for
                Labs). Renowned as one of the best hospitals in Kerala,
                Believers Hospital combines advanced medical treatment with
                compassionate care to bring hope and healing with the love of
                Christ. Our mission is to provide holistic care and assistance
                to those in need, reflecting the church's commitment to the
                community.
              </div>
            </div>
            <Row className="mx-5 my-3">
              <Col className="col-lg-6 mb-5">
                <Card
                  className="shadow-sm"
                  style={{
                    width: "auto",
                    height: "330px",
                    textAlign: "justify",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
                    <Card.Title className="fw-bolder mb-2">Heart</Card.Title>
                    <Card.Text>
                      Heart Transplant A heart transplant is a surgery to remove
                      a diseased heart from a person and replace it with a
                      healthy one from an organ donor. Finding a donor heart is
                      difficult. To remove the heart from the donor, two or more
                      healthcare providers must declare the donor brain-dead.
                      The transplant procedure is done only if the healthcare
                      provider confirms that it is the best treatment choice for
                      your heart failure. The healthcare team also makes sure
                      the patient is healthy enough to go through the transplant
                      process. After the transplant, medical care is advised for
                      the rest of your life to avoid complications.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col className="col-lg-6 mb-5">
                <Card
                  className="shadow-sm"
                  style={{
                    width: "auto",
                    height: "330px",
                    textAlign: "justify",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
                    <Card.Title className="fw-bolder mb-2">Kidney</Card.Title>
                    <Card.Text>
                      A kidney transplant/renal transplant procedure is
                      performed to replace a diseased kidney with a healthy
                      kidney from a donor. The donated kidney can come from a
                      deceased donor or a living person - a relative, spouse, or
                      friend. A kidney transplant is often advised when a person
                      suffers from end-stage renal disease. A working
                      transplanted kidney does a better job of filtering wastes
                      and is healthier than dialysis. Those who donate a kidney
                      can lead a healthy life with one healthy kidney.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col className="col-lg-6 mb-5">
                <Card
                  className="shadow-sm"
                  style={{
                    width: "auto",
                    height: "330px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card.Body
                    className="d-flex flex-column justify-content-center align-items-center text-center"
                    style={{ textAlign: "justify" }}
                  >
                    <Card.Title className="fw-bolder mb-2 text-end">
                      Liver
                    </Card.Title>
                    <Card.Text>
                      A liver transplant replaces a patient’s diseased liver
                      with a whole or partially healthy liver from another
                      person. It is the only cure for liver failure because no
                      device or machine performs all functions of the liver.
                      People who require a liver transplant may be affected by
                      Acute Liver Failure or Chronic Liver Failure. Cirrhosis is
                      one of the major conditions that affect the liver. Apart
                      from Cirrhosis, certain conditions such as primary liver
                      cancers, viral and acute hepatitis, acute hepatic
                      necrosis, and autoimmune hepatitis also affect the
                      functioning of the liver. Types of organ donors include
                      brain-dead organ donors, cardiac-death organ donors and
                      living donors. A divided liver can grow back to full size
                      in both the living donor’s and the recipient’s bodies. The
                      transplant process may usually take 6 to 12 hours.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col className="col-lg-6 mb-5">
                <Card
                  className="shadow-sm"
                  style={{
                    width: "auto",
                    height: "330px",
                    textAlign: "justify",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
                    <Card.Title className="fw-bolder mb-2">
                      Stem Cell
                    </Card.Title>
                    <Card.Text>
                      The stem cell transplant replaces unhealthy cells by
                      adding new blood-forming stem cells into the bloodstream.
                      Stem cells are made in the bone marrow and develop into
                      different types of blood cells. This advanced procedure is
                      an effective treatment for certain kinds of cancer,
                      especially blood cancers such as leukaemia, lymphoma, and
                      multiple myeloma. A stem cell transplant may also be used
                      to treat certain genetic conditions and some noncancerous
                      blood diseases.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

          </>
        ) : (
          // Regular User View
          <>
            <Row className="position-relative mb-5" style={{paddingTop:'60px'}}>
              {/* Left Side Content */}
              <Col md={6} className="d-flex flex-column justify-content-center">
                <div style={{ paddingLeft: "70px" }}>
                  {userRole=='users' &&(
                    <h1 className="fw-bolder">Welcome <span style={{color:'red'}}>{userName}</span> </h1>                  )}
                  <h2>Trusted and Reliable</h2>
                  <h4>Organ And Tissue Transplant Organization</h4>
                 {userRole!="users" ?(<>
                   <Button className="btn btn-success mt-2">
                      <Link
                        to={"/login"}
                        className="text-white text-decoration-none"
                      >
                        Get Started
                      </Link>
                    </Button>
                 </>)
                  :
                  (<>
                    <Button className="btn btn-success mt-2">
                       <Link
                         to={"/request"}
                         className="text-white text-decoration-none"
                       >
                         Request An Organ
                       </Link>
                     </Button>
                     <Button className="btn btn-primary mt-2 ms-3">
                       <Link
                         to={"/donate"}
                         className="text-white text-decoration-none"
                       >
                         Donate
                       </Link>
                     </Button>
                  </>)
                 }
                </div>
              </Col>

              {/* Right Side Image */}
              <Col md={6} className="d-flex justify-content-end">
                <img
                  src={heart}
                  alt="Organ Donation"
                  className="w-100"
                  style={{ maxHeight: "90vh" }}
                />
              </Col>
            </Row>

            {/* Hero Section */}
            <Row className="text-center mb-4">
              <Col>
                <h1 className="text-success">Become an Organ Donor</h1>
                <p className="lead">
                  Your decision to donate can save multiple lives.
                </p>
              </Col>
            </Row>

            {/* Marquee Section */}
            <Row className="mb-4">
              <marquee behavior="scroll" direction="left">
                <Row className="d-flex flex-nowrap gap-3">
                  {[
                    "Heart",
                    "Kidney",
                    "Liver",
                    "Lungs",
                    "Pancreas",
                    "Bones",
                  ].map((organ, index) => (
                    <Col key={index} className="px-2">
                      <Card className="shadow-sm" style={{ width: "auto" }}>
                        <Card.Body>
                          
                          <Card.Text className="text-center fs-4 fw-semobold">
                             {organ}
                            
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </marquee>
            </Row>

            {/* Testimony Section */}
            <Row className="text-center mb-4">
              <Col>
                <h2 className="text-primary mb-3">Testimonials</h2>
                <Carousel>
                  <Carousel.Item>
                    <Card className="p-4 shadow-lg border-0">
                      <Card.Body>
                        <Card.Title className="">John Doe</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Heart Transplant Recipient
                        </Card.Subtitle>
                        <Card.Text>
                          "I received a heart transplant, and it completely
                          changed my life. The generosity of donors gave me a
                          second chance, and I’m forever grateful."
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Card className="p-4 shadow-lg border-0">
                      <Card.Body>
                        <Card.Title className="">Jane Smith</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Mother of a Recipient
                        </Card.Subtitle>
                        <Card.Text>
                          "Organ donation gave my child a second chance at life.
                          Watching them grow healthy and happy is a blessing
                          beyond words."
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Card className="p-4 shadow-lg border-0">
                      <Card.Body>
                        <Card.Title className="">Emily Brown</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Kidney Transplant Recipient
                        </Card.Subtitle>
                        <Card.Text>
                          "Thanks to a kidney donor, I can live a normal life
                          again. My family and I are forever indebted to this
                          life-saving act."
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
            
          </>
        )
        }
      </div>
    </div>
  );
};

export default Home;
