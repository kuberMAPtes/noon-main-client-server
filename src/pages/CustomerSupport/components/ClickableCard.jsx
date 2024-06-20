import React from 'react';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/customerSupport.css';

const ClickableCard = ({ path, iconClass, category, title }) => {
  const navigate = useNavigate();

  return (
    <Col lg="3" md="6" sm="6" onClick={() => navigate(path)} className="clickable-col">
      <Card className="card-stats">
        <CardBody className="d-flex flex-column align-items-center">
          <Row className="w-100">
            <Col className="d-flex flex-column align-items-center">
              <div className="icon-big text-center icon-warning">
                <i className={iconClass} />
              </div>
              <div className="numbers text-center">
                <p className="card-category">{category}</p>
                <CardTitle tag="p">{title}</CardTitle>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ClickableCard;
