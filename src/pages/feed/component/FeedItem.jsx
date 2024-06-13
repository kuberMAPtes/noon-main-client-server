import { Card, Col, Container, Row, Image } from 'react-bootstrap';

const FeedItem = ({ data }) => {
    const {
        feedId,
        title,
        feedText,
        buildingName,
        writerNickname,
        writtenTime,
        feedAttachmentURL,
    } = data;

    // 데이터 처리
    const writtenTimeReplace = data.writtenTime.replace('T', ' ');

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle class="mb-2 text-muted">
                                {writerNickname} | {writtenTimeReplace} |{' '}
                                {buildingName}
                            </Card.Subtitle>
                            <Card.Text>{feedText}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Image
                                src={feedAttachmentURL}
                                alt={`Attachment ${feedAttachmentURL}`}
                                fluid
                            />
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FeedItem;
