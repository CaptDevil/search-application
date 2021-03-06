import React from 'react';

function Output(props) {
    let button,i=0;
    if(props.data.time>=0 && props.data.count>=0)
        button=<p>Searched from {props.data.count} results in {props.data.time} ns.</p>
    else
        button=<p></p>
    return (
        <div>
            {button}
            <ul>
                {props.data.results.map(a=><li key={i++}><a href={"https://www.google.com/search?q="+a}>{a}</a></li>)}
            </ul>
        </div>
    );
}
 
export default Output;