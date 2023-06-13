import type { ChangeEvent, FC, FormEvent } from "react";
import { useState, useEffect } from "react";
import Agent from "./Agent";
import { IAgent } from "../../types/Agent";
import axios from "axios";
import "./Agents.css";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialData = {
  firstName: "",
  lastName: "",
  agentLicence: "",
  address: "",
  practiceAreas: "",
  aboutMe: "",
};

const Agents: FC = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredAgent, setFilteredagent] = useState<IAgent[]>([]);

  const navigate = useNavigate();

  const handleModalToggle = () => setShowModal(!showModal);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const agent = await axios.post("/agents", formData);
    if (agent) {
      handleModalToggle();
      setFormData(initialData);
    }
  };

  useEffect(() => {
    async function fetchInitialData() {
      const response = await axios.get("/agents");
      setAgents(response.data);
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    const filterList = () => {
      const filteredAgent = agents.filter((agent) => {
        const fullName = `${agent.firstName} ${agent.lastName}`.toLowerCase();
        const practiceAreas = agent.practiceAreas.toLowerCase();

        return (
          fullName.includes(searchTerm) || practiceAreas.includes(searchTerm)
        );
      });

      setFilteredagent(filteredAgent);
    };
    filterList();
  }, [searchTerm, agents]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  return (
    <div className="section-container">
      <div className="header-content">
        <h2>Agent Lists</h2>
        <button className="primary-btn" onClick={handleModalToggle}>
          Join the team!
        </button>
      </div>
      <hr />

      <Form.Group controlId="filterInput">
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Agent"
        />
      </Form.Group>

      <Row>
        {filteredAgent.length > 0 ? (
          filteredAgent.map((agent) => (
            <Col xs={6} sm={4}>
              <div onClick={() => navigate(`/agents/${agent.id}`)}>
                <Agent key={agent.id} agent={agent} />
              </div>
            </Col>
          ))
        ) : (
          <div className="no-content">No Agent Found!</div>
        )}
      </Row>

      {/* <div className="agents">
        {agents.map((agent) => (
          <Agent key={agent.id} agent={agent} />
        ))}
      </div> */}

      <Modal show={showModal} onHide={handleModalToggle} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Agent Information Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="agentLicence">
              <Form.Label>Agent License</Form.Label>
              <Form.Control
                type="text"
                name="agentLicence"
                value={formData.agentLicence}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Agent Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="practiceAreas">
              <Form.Label>Practice Areas</Form.Label>
              <Form.Control
                type="text"
                name="practiceAreas"
                value={formData.practiceAreas}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="aboutMe">
              <Form.Label>About You</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleInputChange}
              />
            </Form.Group>
            <button type="submit" className="primary-btn">
              Save
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Agents;
