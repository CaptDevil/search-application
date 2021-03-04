import React from 'react';

function Output(props) {
    return (
        <div>
            <p>Searched in {props.data.time} ns, from {props.data.count} results.</p>
            <ul>
                {props.data.results.map(a=><li key={parseInt(Math.random()*1000)}>{a}</li>)}
            </ul>
        </div>
    );
}
 
export default Output;