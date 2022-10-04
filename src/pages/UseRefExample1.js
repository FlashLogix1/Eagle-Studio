import React, { useState, useEffect, Fragment, useRef } from 'react';


// function based component created
function UseRefComponent()
{
    // state made by useState() when updated, it re-render the view and useEffect() runs after every render, when no dependency is passed
    // useState() accepts the initial state and returns the two values (1) the current state (2) a function that update the state
    // useState() hook allows us to track state in a functional component   // state means data, variables
    // hook is a term designed only for function based component
    const [inputValue, setInputValue] = useState("");
    // The useRef Hook allows you to persist values between renders.
    // It can be used to store a mutable value that does not cause a re-render when updated.
    // It can be used to access a DOM element directly.
    const count = useRef(0);

    // no dependency is passed as an second argument, it means useEffect() runs after every render
    // function argument 1 can return for cleanup purposes
    useEffect(
        () => {
            count.current = count.current + 1;
        },
        [inputValue]
    );


    // web ui
    return (
        <Fragment>
            <div style={{paddingLeft: "150px"}}>
                <input type="text" value={inputValue} onChange={eventParam1 => setInputValue(eventParam1.target.value)} />
                <h1>Render Count: {count.current}</h1>
            </div>
        </Fragment>
    )
}

export default UseRefComponent;

