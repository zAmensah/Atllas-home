import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Row, Col, Card, Button, Breadcrumb, Form } from "react-bootstrap";

import "./SingleAgent.css";
import { IAgent } from "../../types/Agent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Review from "./Review";
import Loader from "../../utils/Loader/Loader";

const initialData = {
  name: "",
  comment: "",
};

const SingleAgent: FC = () => {
  const [agent, setAgent] = useState<IAgent>();
  const [review, setReview] = useState(initialData);
  const [practiceArea, setPracticeArea] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReview((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      comment: review.comment,
      agentId: id,
      name: review.name,
    };

    const reviewData = await axios.post(`/reviews/${id}`, data);

    if (reviewData) {
      setReview(initialData);
    }
  };

  useEffect(() => {
    async function fetchSingleAgent() {
      const response = await axios.get(`/agents/${id}`);
      setAgent(response.data);
      setPracticeArea(response.data.practiceAreas.split(","));
    }
    fetchSingleAgent();
  }, [id]);

  return (
    <div className="section-container mt-5">
      <Breadcrumb>
        <Breadcrumb.Item onClick={handleNavigation}>Agent List</Breadcrumb.Item>
        <Breadcrumb.Item active>Agent Details</Breadcrumb.Item>
      </Breadcrumb>

      <hr />

      {agent != null ? (
        <Row>
          <Col lg={5}>
            <Card className="card-white grid-margin">
              <Card.Header>
                <Card.Title>Agent Profile</Card.Title>
              </Card.Header>
              <Card.Body className="user-profile-card mb-3">
                <div className="avatar-holder">
                  <img
                    className="round"
                    src={agent?.photoUrl}
                    alt={agent?.firstName}
                  />
                </div>
                <h4 className="text-center mt-2">
                  {agent?.firstName + " " + agent?.lastName}
                </h4>
                <p className="text-center small">
                  <strong>Address:</strong> {agent?.address}
                </p>
                <p className="text-center small">
                  <strong>License #: </strong>
                  {agent?.agentLicence}
                </p>
              </Card.Body>
              <Card.Header className="mt-3">
                <Card.Title>Practice Areas</Card.Title>
              </Card.Header>
              <Card.Body className="mb-3">
                <div className="skills">
                  <ul>
                    {practiceArea.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </Card.Body>
              <Card.Header className="mt-3">
                <Card.Title>About Me</Card.Title>
              </Card.Header>
              <Card.Body className="mb-3">
                <p className="mb-0">{agent?.aboutMe}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="card-white grid-margin">
              <Card.Body>
                <div className="post">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={review.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        name="comment"
                        placeholder="Review Here"
                        value={review.comment}
                        onChange={handleInputChange}
                        className="mb-3"
                      />
                      <Button
                        variant="outline-primary"
                        className="float-right"
                        type="submit"
                      >
                        Post
                      </Button>
                    </Form.Group>
                  </Form>
                </div>
              </Card.Body>
            </Card>
            <div className="profile-timeline">
              <ul className="list-unstyled">
                <li className="timeline-item">
                  <Card className="card-white grid-margin">
                    <Card.Body>
                      {agent?.reviews.length > 0 ? (
                        agent?.reviews.map((review) => (
                          <Review review={review} />
                        ))
                      ) : (
                        <div className="no-content">No Review Yet!</div>
                      )}
                    </Card.Body>
                  </Card>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SingleAgent;
