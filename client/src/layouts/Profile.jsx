import React, {useEffect} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import UserSidebar from "./UserSidebar.jsx";
import AccountInfo from "../pages/user-infomation/AccountInfo.jsx";

const Profile = ({ children }) => {
    useEffect(() => {
        Main();
    }, [])
    return (
        <>
            <Container style={{marginTop: 112, marginBottom: 56}}>
                <Row lg="8">
                    <Col sm={12} md={3} lg={3}>
                        <Card
                            className="sticky-summary"
                            style={{
                                position: "sticky",
                                padding: '15px 12px 15px 12px',
                                borderRadius: 10,
                                // position: "fixed",
                                top: 80,
                                border: "none",
                                backgroundColor: '#f8f9fa', // backgroundColor: '#eaedf0' '0, 12px'
                            }}>
                            <UserSidebar/>
                        </Card>
                    </Col>
                    <Col sm={12} md={9} lg={9}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile