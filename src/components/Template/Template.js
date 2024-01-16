import Header from "../Header/Header";
import { Col, Container, Row } from "react-bootstrap";

function Template({children}) {
    return (
        <div className={`Template`}>
            <Header />
            <Container fluid>
                <Row className="justify-content-md-center mt-5" >
                    <Col xs={10}>
                    {children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Template;