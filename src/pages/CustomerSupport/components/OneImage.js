import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import '../css/image-grid.css';



const ImageGrid = ({ images }) => {




    const navigate = useNavigate();

    const handleImageLink = () => {

        navigate('/customerSupport/getImage');

    };





    return (
        <Container fluid className="image-grid-container">
        <Row >
            {images.map((image) => (
            <Col key={image.feedAttachmentId} xs="6" sm="4" md="3" lg="2" className="image-grid-item" onClick={handleImageLink}>
                <img src={image.blurredFileUrl !== null ? image.blurredFileUrl : image.fileUrl} alt={`Feed Attachment ${image.feedAttachmentId}`} className="image-grid-img" />
            </Col>
            ))}
        </Row>
        </Container>
    );
    };

export default ImageGrid;
