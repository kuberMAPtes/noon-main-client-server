import React from 'react';


import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
const FeedList = () => {
  return (
    <>
    <div className="chatroom-list">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>City</th>
                    <th className="text-right">Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dakota Rice</td>
                    <td>피드피드피드</td>
                    <td>Oud-Turnhout</td>
                    <td className="text-right">$36,738</td>
                  </tr>
                  <tr>
                    <td>Minerva Hooper</td>
                    <td>Curaçao</td>
                    <td>Sinaai-Waas</td>
                    <td className="text-right">$23,789</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  </>
  );
};

export default FeedList;