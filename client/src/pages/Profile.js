import { useState, useEffect } from 'react';
import { Row, Container, Modal, Button, Spinner } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import API from '../API.js';
import "../style/Profile.css";

function Profile(props) {
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('');

    useEffect(() => {
        setLoading(true);
        API.GET_UserTesting()
            .then((usr) => {
                setUser(usr);
                setLoading(false);
            })
            .catch((e) => handleErrors(e));
    }, []);

    const handleErrors = (err) => {
        console.log(err);
    };

    return (
        <>
            {loading ? <> <Row className="justify-content-center mt-5">
                < Spinner animation="border" size="xl" variant="secondary" />
            </Row > </> :
                <Container>
                    <Row className="justify-content-center mt-5">
                        <PersonCircle size='80' />
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <h1 className="mt-3">Buon appetito, {user.first_name}!</h1>
                        <p style={{ fontSize: '17px' }}>{user.email}</p>
                    </Row>
                    <Row className="justify-content-center mt-5" xs={4} sm={4}>
                        <Button style={{ background: '#15a45f' }} onClick={() => setModalShow(true)}>Logout</Button>
                        <ModalAlert show={modalShow} onHide={() => setModalShow(false)} />
                    </Row>
                </Container>}
        </>
    );
}

function ModalAlert(props) {
    return (
        <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    You cannot log out
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
                <p>This account is for testing purposes only.</p>
                <p style={{ fontSize: '14px' }}>(and please do not add cream to carbonara)</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} style={{ background: '#15a45f' }}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Profile;
