import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import '../css/image-grid.css';



const ImageGrid = ({ attachmentList }) => {


    const navigate = useNavigate();
    const handleImageLink = (attachment) => {
        navigate('/customerSupport/getImage', { state: { attachment } });
    };


    return (
        <Container fluid className="image-grid-container">
        <Row >
            {attachmentList.map((attachment) => (
            <Col key={attachment.feedAttachmentId} xs="6" sm="4" md="3" lg="2" className="image-grid-item" onClick={()=>handleImageLink(attachment)}>
                <img src={attachment.blurredFileUrl !== null ? attachment.blurredFileUrl : attachment.fileUrl} alt={`Feed Attachment ${attachment.feedAttachmentId}`} className="image-grid-img" />
            </Col>
            ))}
        </Row>
        </Container>
    );
    };

export default ImageGrid;
