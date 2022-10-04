import React, { useState, useEffect, Fragment } from 'react';


// function based component created
function Timer()
{
    // state made by useState() when updated, it re-render the view and useEffect() runs after every render, when no dependency is passed
    // useState() accepts the initial state and returns the two values (1) the current state (2) a function that update the state
    // useState() hook allows us to track state in a functional component   // state means data, variables
    // hook is a term designed only for function based component
    const [count, setCount] = useState(0);
    const [calculation, setCalculation] = useState(0);

    // dependency array is passed as an second argument, it means useEffect() runs only on the first render and when count state updated
    useEffect(
        () => {
            setCalculation( () => count * 2 );
        },
        [count]
    );


    // web ui
    return (
        <Fragment>
            <div style={{paddingLeft: "150px"}}>
                <p>Count: {count}</p>
                <button onClick={() => setCount(countParam1 => countParam1 + 1)}>+</button>
                <p>Calculation: {calculation}</p>
            </div>
        </Fragment>
    )
}

export default Timer;