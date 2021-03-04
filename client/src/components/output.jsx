import React from 'react';

function Output(props) {
    let button;
    if(props.data.time>0)
        button=<p>Searched in {props.data.time} ns, from {props.data.count} results.</p>
    else
        button=<p></p>
    return (
        <div>
            {button}
            <ul>
                {props.data.results.map(a=><li key={parseInt(Math.random()*1000)}>{a}</li>)}
            </ul>
        </div>
    );
}
 
export default Output;