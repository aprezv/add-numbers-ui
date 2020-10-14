import React from 'react';


export default function HistoryRecord({record}) {

    return (
        <li>
            <code>{`${record.addend1} + ${record.addend1} = ${record.result}`}</code>
        </li>
    )

}
