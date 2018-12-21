import React from 'react';

const Inputs = (props) => {
    return (
        <div>
            {props.placeholders.map((placeholder, index) => {
                return (
                    <div>
                        <label for={`input-${index}`}>{placeholder}</label>
                        <input id={`input-${index}`}>{props.inputs[index]}</input>
                    </div>
                )
            })}
        </div>
    )
}

export default Inputs;