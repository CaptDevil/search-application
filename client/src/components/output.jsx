import React from 'react';

function Output(props) {
    let button;
    console.log(props)
    if(props.data.time>0)
        button=<p>Searched from {props.data.count} results in {props.data.time} ns.</p>
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