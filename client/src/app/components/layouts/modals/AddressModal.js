"use client";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
const AddressModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Do not even try to press
        escape key.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddressModal;
