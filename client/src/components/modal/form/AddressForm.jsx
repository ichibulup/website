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
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SaveChange from "../notify/SaveChange.jsx";

const AddressForm = ({ address, show, onHide, onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        tower: '',
        street: '',
        district: '',
        city: '',
        state: '',
        country: ''
    });
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        if (address) {
            setFormData({
                tower: address.tower || '',
                street: address.street || '',
                district: address.district || '',
                city: address.city || '',
                state: address.state || '',
                country: address.country || ''
            });
        } else {
            setFormData({
                tower: '',
                street: '',
                district: '',
                city: '',
                state: '',
                country: ''
            });
        }
    }, [address]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = address ?
                await axios.put(`http://localhost:5172/address/update/${address.idaddress}`, formData) :
                await axios.post('http://localhost:5172/address/addition', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            if (response.status === 200 || response.status === 201) {
                // alert(address ? 'Address updated successfully' : 'Address added successfully');
                onHide();
            }
            onReload()
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Failed to save address');
        }
        // setValidated(true);
    };

    const handleConfirmSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = address
                ? await axios.post(`http://localhost:5172/address/update/${address.idaddress}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                : await axios.put('http://localhost:5172/address/addition', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });

            // const response = address ?
            //     await axios.put(`http://localhost:5172/address/update/${address.idaddress}`, formData) :
            //     await axios.post('http://localhost:5172/address/addition', formData, {
            //         headers: {
            //             Authorization: `Bearer ${token}`
            //         }
            //     });

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
            await axios.delete(`http://localhost:5172/address/delete/${address.idaddress}`, {
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
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>Address Details</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Note</h4>
                    <p>
                        Enter invalid values of all input groups to help us know your location. Then we can deliver your package.
                    </p>
                    <Form noValidate validated={validated} onSubmit={handleInvalid}> {/*onSubmit={handleSubmit, openConfirmModal}*/}
                        <Row className="mb-3">
                            <Form.Group as={Col} md={4} controlId="tower">
                                <Form.Label>Tower</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="tower">
                                        <FontAwesomeIcon icon={faBuilding}/>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="tower"
                                        value={formData.tower}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your building.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={4} controlId="street">
                                <Form.Label>Street</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="street">
                                        <FontAwesomeIcon icon={faRoad}/>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your road.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={4} controlId="district">
                                <Form.Label>District</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="district">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your district.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={4} controlId="city">
                                <Form.Label>City</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="city">
                                        <FontAwesomeIcon icon={faCity}/>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your city.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} md={4} controlId="state">
                                <Form.Label>State</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="state">
                                        <FontAwesomeIcon icon={faFlag}/>
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
                                        <FontAwesomeIcon icon={faGlobe}/>
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
                            </Form.Group>
                        </Row>
                        <hr/>
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
                    {address ?
                        <>
                            <Button onClick={() => setShowConfirmDelete(true)} variant="danger" className="me-3">
                                <FontAwesomeIcon icon={faTrash} className="me-2"/>
                                <span>Delete Address</span>
                            </Button>
                            <Button onClick={handleInvalid} variant="info">
                                <FontAwesomeIcon icon={faCheck} className="me-2"/>
                                <span>Save changes</span>
                            </Button>
                        </> : <>
                            <Button type="submit" variant="success" onClick={handleInvalid}>
                                <FontAwesomeIcon icon={faPlus} className="me-2"/>
                                <span>Create Address</span>
                            </Button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
            <SaveChange
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onSave={() => {handleConfirmSave(); setShowConfirmModal(false)}}
            />
            <SaveChange
                show={showConfirmDelete}
                onHide={() => setShowConfirmDelete(false)}
                onSave={handleDelete}
            />
        </>
    );
}

export default AddressForm
