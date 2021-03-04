import React from 'react';

function Input(props) {
    return (
        <div>
            <input type="text" onChange={(e)=>props.onInput(e.target.value)} placeholder="Enter a word..." />
        </div>
    );
}
 
export default Input;