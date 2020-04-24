import React from 'react';
import config from "../../config";
import {Image, Modal} from "react-bootstrap";
import Button from "react-bootstrap/es/Button";

const ImageModal = ({show, close, image}) => {
    return(
        <Modal show={show} onHide={close}>
            <Modal.Body>
                <Image
                    style={{width: '100%', height: '480px', objectFit: 'cover'}}
                    src={config.apiUrl + '/uploads/' + image}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ImageModal;