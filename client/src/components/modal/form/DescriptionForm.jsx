import axios from "axios";
import SaveChange from "../notify/SaveChange.jsx";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuilding,
    faCheck,
    faCity,
    faFlag,
    faGlobe,
    faPlus,
    faRoad,
    faTrash,
    faUser,
    faXmark,
    faPhone,
    faMailBulk
} from "@fortawesome/free-solid-svg-icons";
export const DescriptionForm = ({ description, show, onHide, onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        title_description: '',
        product_name: '',
        sub_description: ' ',
        img_description: ' ',
    });
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    useEffect(() => {
        if (description) {
            setFormData({
                title_description: description.title_description || '',
                product_name: description.product_name || '',
                sub_description: description.sub_description || '',
                img_description: description.img_description || '',
            });
        } else {
            setFormData({
                title_description: '',
                product_name: '',
                sub_description: ' ',
                img_description: ' ',
            });
        }
    }, [description]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleInvalid = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");

            if (allFieldsFilled) {
                setShowConfirmModal(true);
            } else {
                setValidated(true);
            }
        }
    };

    const handleConfirmSave = async () => {
        try {
            // const token = localStorage.getItem('token');
            console.log(formData);
            const response = description
                ? await axios.post(`http://localhost:5172/admin/update-description/${description.iddescription}`, formData)
                : await axios.put('http://localhost:5172/admin/create-description', formData);


            if (response.status === 200 || response.status === 201) {
                // alert(address ? 'Address updated successfully' : 'Address added successfully');
                setShowConfirmModal(false)
                onHide();
                onReload()
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Failed to save address');
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5172/admin/delete/${color.idaddress}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowConfirmDelete(false);
            onHide();
            onReload()
        } catch (error) {
            console.error("Error deleting address:", error);
            setError(error.response ? error.response.data.message : 'Failed to save address');
        }
    };
    return (
        <>
            <Modal
                // {...address}
                show={show}
                onHide={onHide} //
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>Edit Color</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4>Note</h4> */}
                    {/* <p>
                        Enter invalid values of all input groups to help us know your location. Then we can deliver your package.
                    </p> */}
                    <Form noValidate validated={validated} onSubmit={handleInvalid}> {/*onSubmit={handleSubmit, openConfirmModal}*/}
                        <Row className="mb-3">
                            <Form.Group as={Col} md={7} controlId="product_name">
                                <Form.Label>Product Name</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="product_name">
                                        <FontAwesomeIcon icon={faUser} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your Product Name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={5} controlId="title_description">
                                <Form.Label>Title Description</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="title_description">
                                        <FontAwesomeIcon icon={faUser} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="title_description"
                                        value={formData.title_description}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter Title Description.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            {/* <Form.Group as={Col} md={4} controlId="email">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="email">
                                        <FontAwesomeIcon icon={faUser} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group> */}
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={12} controlId="sub_description">
                                <Form.Label>Sub Description</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="sub_description">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="sub_description"
                                        value={formData.sub_description}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter Sub Description.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={12} controlId="img_description">
                                <Form.Label>Img Description</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="img_description">
                                        <FontAwesomeIcon icon={faMailBulk} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="img_description"
                                        value={formData.img_description}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter Img Description.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            {/* <Form.Group as={Col} md={4} controlId="state">
                                <Form.Label>State</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="state">
                                        <FontAwesomeIcon icon={faFlag} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your state.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} md={4} controlId="country">
                                <Form.Label>Country</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="country">
                                        <FontAwesomeIcon icon={faGlobe} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your country.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group> */}
                        </Row>
                        <hr />
                        {error && <p className="text-danger">{error}</p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="secondary" style={{ marginRight: "auto" }}>
                        <FontAwesomeIcon icon={faXmark} className="me-2" />
                        <span>Close</span>
                    </Button>
                    {/*<Button type="submit" variant="info"*/}
                    {/*        onClick={handleSubmit}> /!*onClick={handleSubmit, openConfirmModal}*!/*/}
                    {/*    <FontAwesomeIcon icon={faCheck} className="me-2"/>*/}
                    {/*    <span>Save changes</span>*/}
                    {/*</Button>*/}
                    {description ?
                        <>
                            {/* <Button onClick={() => setShowConfirmDelete(true)} variant="danger" className="me-3">
                                <FontAwesomeIcon icon={faTrash} className="me-2" />
                                <span>Delete Address</span>
                            </Button> */}
                            <Button onClick={handleInvalid} variant="info">
                                <FontAwesomeIcon icon={faCheck} className="me-2" />
                                <span>Save changes</span>
                            </Button>
                        </> : <>
                            <Button type="submit" variant="success" onClick={handleInvalid}>
                                <FontAwesomeIcon icon={faPlus} className="me-2" />
                                <span>Create Address</span>
                            </Button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
            <SaveChange
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onSave={() => { handleConfirmSave(); setShowConfirmModal(false) }}
            />
            <SaveChange
                show={showConfirmDelete}
                onHide={() => setShowConfirmDelete(false)}
                onSave={handleDelete}
            />
        </>
    )
}