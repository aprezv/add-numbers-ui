import React, {useState} from 'react';
import {FormGroup, Label, Input, Button, Jumbotron} from "reactstrap";
import axios from 'axios';
import FormFeedback from "reactstrap/es/FormFeedback";


export default function ({addHistoryRecord}) {

    const [addend1, setAddend1] = useState("");
    const [addend2, setAddend2] = useState("");
    const [result, setResult] = useState();
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const getPayload = () => {
        return {
            addend1: stringToArray(addend1),
            addend2: stringToArray(addend2),
        }
    };

    const stringToArray = (string) => {
        const array =  [string.length];
        for (let i = 0; i < string.length; i++) {
            array[i] = parseInt(string.charAt(i))
        }
        return  array;
    };

    const add = () => {

        if(!isValid())
            return;

        setProcessing(true);
        const payload = getPayload();
        axios.post("/api/add", payload)
            .then(({data})=>{
                addHistoryRecord(data);
                setResult(data.result);
            })
            .finally(()=>{
                setProcessing(false);
            })
    };

    const isValid = () =>{
        let err = {};
        if(!isInteger(addend1)){
           err.addend1 = true;
        }

        if(!isInteger(addend2)){
           err.addend2 = true;
        }
        setErrors(err);

        return Object.keys(err) < 1;
    };

    const isInteger = (str) => {
        const n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    };

    return (

        <Jumbotron>
            <FormGroup>
                <Label>Sumando 1</Label>
                <Input value={addend1} onChange={(e)=>setAddend1(e.target.value)}/>
                {errors.addend1 && <FormFeedback className={'d-block'}>Por favor ingrese un número válido</FormFeedback>}
            </FormGroup>

            <FormGroup>
                <Label>Sumando 2</Label>
                <Input value={addend2}  onChange={(e)=>setAddend2(e.target.value)}/>
                {errors.addend2 && <FormFeedback className={'d-block'}>Por favor ingrese un número válido</FormFeedback>}
            </FormGroup>

            <Button color={'primary'} disabled={processing} onClick={add}>Sumar</Button>
            {result && <span className={'ml-2'}>Resultado: <code>{result}</code></span> }
        </Jumbotron>

    )
}


