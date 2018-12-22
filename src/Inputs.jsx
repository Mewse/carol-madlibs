import React from 'react';
import "./Inputs.css";

const Inputs = (props) => {
    return (
        <div className="inputs">
            {props.placeholders.map((placeholder, index) => 
                    <div className="input" key={index}>
                        <label className="input-label">{index}:&nbsp;{placeholder}:</label>
                        <input
                            className="input-input" 
                            value={props.inputs[index]} 
                            onChange={(event) => props.onChange(index, event.target.value)}
                        />
                    </div>     
            )}
            <button className="submit" onClick={props.compile}> Go!</button>
        </div>
    )
}

export default Inputs;