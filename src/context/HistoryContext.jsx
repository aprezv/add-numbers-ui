import React, {useEffect, useState} from 'react';
import axios from "axios";

export const HistoryContext = React.createContext({history: []});

export default class HistoryContextProvider extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            history: []
        };

        this.addRecord = this.addRecord.bind(this);
    }

    componentDidMount() {
        this.getHistory();
    }


    addRecord(record){
        this.setState({history: this.state.history.concat(record)})
    }

    getHistory = () => {
        axios.get("/api/history")
            .then(({data})=>{
                this.setState({history: data.content || []})
            })
    };


    render() {

        const { children } = this.props;
        const { history } = this.state;

        return (
            <HistoryContext.Provider value={{history, addHistoryRecord: this.addRecord}}>
                {children}
            </HistoryContext.Provider>
        )
    }
}
