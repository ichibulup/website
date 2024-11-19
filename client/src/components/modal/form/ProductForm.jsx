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
export const ProductForm = ({ product, show, onHide, onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        brand: '',
        category_name: '',
        // product_image: '',
        product_name: '',
        idcategory: ''
    });
    const [data1, setData1] = useState([])
    const fetchAPI1 = async () => {
        const response = await axios.get("http://localhost:5172/admin/get-category")
        console.log(response.data)
        setData1(response.data)
    };

    const findIdCategoryByName = (name) => {
        const category = data1.find(cat => cat.category_name.toLowerCase() === name.toLowerCase());
        return category ? category.idcategory : null;
    };
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    useEffect(() => {
        if (product) {
            setFormData({
                brand: product.brand || '',
                category_name: product.category_name || '',
                // product_image: product.product_image || '',
                product_name: product.product_name || '',
                idcategory: product.idcategory || ''
            });
        } else {
            setFormData({
                brand: '',
                category_name: '',
                // product_image: '',
                product_name: '',
                idcategory: ''
            });
        }
        fetchAPI1();
    }, [product]);
    const convertFormDataToString = (data) => {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, String(value || "")])
        );
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: String(value) }));
    };

    const handleInvalid = async (event) => {
        console.log(formData)
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        const dataAsString = convertFormDataToString(formData);
        const idCategory = findIdCategoryByName(dataAsString.category_name)
        const stringid = String(idCategory)
        dataAsString.idcategory = stringid;
        console.log(formData)
        if (form.checkValidity() === false) {
            console.log("0")
            setValidated(true);
        } else {
            const allFieldsFilled = Object.values(dataAsString).every(value => value.trim() !== "");

            if (allFieldsFilled) {
                setShowConfirmModal(true);

            } else {
                setValidated(true);

            }
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         setValidated(true);
    //         return;
    //     }

    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = address ?
    //             await axios.put(`http://localhost:5172/address/update/${address.idaddress}`, formData) :
    //             await axios.post('http://localhost:5172/address/addition', formData, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });

    //         if (response.status === 200 || response.status === 201) {
    //             // alert(address ? 'Address updated successfully' : 'Address added successfully');
    //             onHide();
    //         }
    //         onReload()
    //     } catch (error) {
    //         setError(error.response ? error.response.data.message : 'Failed to save address');
    //     }
    //     // setValidated(true);
    // };

    const handleConfirmSave = async () => {
        try {
            const dataAsString = convertFormDataToString(formData);
            // const token = localStorage.getItem('token');
            console.log(formData)
            const response = product
                ? await axios.post(`http://localhost:5172/products/update-productname/${product.idproduct}`, dataAsString)
                : await axios.put('http://localhost:5172/admin/abc', formData)

            if (response.status === 200 || response.status === 201) {
                // alert(address ? 'Address updated successfully' : 'Address added successfully');
                setShowConfirmModal(false)
                onHide();
                onReload()
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Failed to save address');
        }
        onReload()
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5172/products/delete-productname/${product.idproduct}`);
            setShowConfirmDelete(false);
            onHide();
            onReload()
        } catch (error) {
            console.error("Error deleting product:", error);
            setError(error.response ? error.response.data.message : 'Failed to save product name');
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
                        <h3>Edit Product</h3>
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
                                        Please enter Product Name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={5} controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="brand">
                                        <FontAwesomeIcon icon={faUser} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter brand.
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
                            <Form.Group as={Col} md={12} controlId="category_name">
                                <Form.Label>Category</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="category_name">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="category_name"
                                        value={formData.category_name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter category.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>


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
                    {product ?
                        <>
                            <Button onClick={() => setShowConfirmDelete(true)} variant="danger" className="me-3">
                                <FontAwesomeIcon icon={faTrash} className="me-2" />
                                <span>Delete Product</span>
                            </Button>
                            <Button onClick={handleInvalid} variant="info">
                                <FontAwesomeIcon icon={faCheck} className="me-2" />
                                <span>Save changes</span>
                            </Button>
                        </> : <>
                            <Button type="submit" variant="success" onClick={handleInvalid}>
                                <FontAwesomeIcon icon={faPlus} className="me-2" />
                                <span>Create Product</span>
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