import React, { useState, useEffect, Fragment, useRef } from 'react';

// a combination of useState, useEffect, and useRef to keep track of the previous state.

// function based component created
function UseRefComponent()
{
    const [inputValue, setInputValue] = useState("");
    const previousStateValue = useRef("");
    
    useEffect(
        () => {
            previousStateValue.current = inputValue;
        },
        [inputValue]
    );

    
    // web ui
    return (
        <Fragment>
            <div style={{paddingLeft: "150px", margin: "30px"}}>
                <input type="text" value={inputValue} onChange={eventParam1 => setInputValue(eventParam1.target.value)} />
                <h2>Current Value: {inputValue}</h2>
                <h2>Previous Value: {previousStateValue.current}</h2>
            </div>
        </Fragment>
    )
}

export default UseRefComponent;

