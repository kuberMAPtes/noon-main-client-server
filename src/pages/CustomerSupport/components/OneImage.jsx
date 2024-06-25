import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/image-grid.css';
import {
    Container,
    Button,
    Card,
    CardHeader,
    CardBody,
    Table,
    Badge,
    Row,
    Col,
  } from "reactstrap";


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
                {attachment.blurredFileUrl == null?
                  <Badge color="primary" style={styles.badge} >
                    블러 전
                  </Badge>  
                  :
                  <Badge color="secondary" style={styles.badge} >
                    블러 됨
                  </Badge>  
                }
                <img src={attachment.blurredFileUrl !== null ? attachment.blurredFileUrl : attachment.fileUrl} alt={`Feed Attachment ${attachment.feedAttachmentId}`} className="image-grid-img" />
            </Col>
            ))}
        </Row>
        </Container>
    );




    
};


const styles = {
    badgeContainer: {
        position: 'absolute',
        zIndex: 10,
      },
      badge: {
        width: '70px',
        height: '20px'
      },
}

export default ImageGrid;
