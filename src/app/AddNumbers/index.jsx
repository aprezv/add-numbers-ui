import React from 'react';
import { Container, Row, Col } from "reactstrap";
import AddForm from './AddForm'
import History from './History';
import HistoryContextProvider, {HistoryContext} from "../../context/HistoryContext";

export default function () {


    return (

        <HistoryContextProvider>
            <Container className={'mt-5'}>

                    <h1 className="display-3">Suma 2 números!</h1>

                    <Row>
                        <Col md={7}>
                            <HistoryContext.Consumer>
                                { ({addHistoryRecord}) => <AddForm addHistoryRecord={addHistoryRecord} />}
                            </HistoryContext.Consumer>
                        </Col>

                        <Col md={5}>
                            <History />
                        </Col>
                    </Row>
            </Container>
        </HistoryContextProvider>
    )

}
