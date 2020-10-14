import React from 'react';
import {HistoryContext} from "../../context/HistoryContext";
import HistoryRecord from "../../components/HistoryRecord";

export default function () {

    return (

        <React.Fragment>
            <h5>Historial</h5>
           <HistoryContext.Consumer>
               {({history}) => (
                   history.map((h, i)=>{
                           return <HistoryRecord key={i} record={h} />
                       })
               )}
            </HistoryContext.Consumer>
        </React.Fragment>
    )
}
