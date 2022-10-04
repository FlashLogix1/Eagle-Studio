import React, { useState, Fragment } from "react";

// This file illustrates multiple states in a function component

// function based component created
function Car()
{
    // state made by useState() when updated, it re-render the view and useEffect() runs after every render, when no dependency is passed
    // useState() accepts the initial state and returns the two values (1) the current state (2) a function that update the state
    // useState() hook allows us to track state in a functional component   // state means data, variables
    // hook is a term designed only for function based component
    const [brand, setBrand] = useState("Ford");
    const [model, setModel] = useState("Mustang");
    const [year, setYear] = useState("1964");
    const [color, setColor] = useState("red");

    return (
        <Fragment>
            <div style={{paddingLeft: "150px"}}>
                <h1>My {brand}</h1>
                <p>It is a {color} {model} from {year}</p>
            </div>
        </Fragment>
    )

}

export default Car;