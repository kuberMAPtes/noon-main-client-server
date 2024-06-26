import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/image-grid.css';
import {
  Container,
  Badge,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardFooter
} from "reactstrap";

const ImageGrid = ({ attachmentList }) => {

  const navigate = useNavigate();
  const handleImageLink = (attachment) => {
    navigate('/customerSupport/getImage', { state: { attachment } });
  };

  return (
    <Container fluid className="image-grid-container">
      <Row>
        {attachmentList.map((attachment) => (
          <Col key={attachment.feedAttachmentId} xs="6" sm="4" md="3" lg="2" className="image-grid-item">
            <Card onClick={() => handleImageLink(attachment)}>
              <div style={{ position: 'relative' }}>
                {attachment.blurredFileUrl == null ? (
                  <Badge color="primary" style={styles.badge}>블러 전</Badge>
                ) : (
                  <Badge color="secondary" style={styles.badge}>블러 됨</Badge>
                )}
                <img src={attachment.blurredFileUrl !== null ? attachment.blurredFileUrl : attachment.fileUrl} alt={`Feed Attachment ${attachment.feedAttachmentId}`} className="image-grid-img" />
              </div>
              <CardBody>
                <CardText>ID: {attachment.attachmentId}</CardText>
                <CardFooter>
                  <Row>
                    <Col><span>{attachment.fileType}</span></Col>
                  </Row>
                </CardFooter>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const styles = {
  badge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
    width: '70px',
    height: '20px'
  }
}

export default ImageGrid;
