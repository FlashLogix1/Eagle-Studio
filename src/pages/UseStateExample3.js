import React, { useState, Fragment } from "react";

// This file illustrates how to make an object with single useState() in a function component

// function based component created
function Car()
{
    // state made by useState() when updated, it re-render the view and useEffect() runs after every render, when no dependency is passed
    // useState() accepts the initial state and returns the two values (1) the current state (2) a function that update the state
    // useState() hook allows us to track state in a functional component   // state means data, variables
    // hook is a term designed only for function based component
    const [car, setCar] = useState({
        brand: "Ford",
        model: "Mustang",
        year: "1964",
        color: "red"
    });

    const updateColor = () =>
    {
        setCar(previousStateParam1 => {
            return { ...previousStateParam1, color: "blue" }
        });
    }

    return (
        <Fragment>
            <div style={{paddingLeft: "150px"}}>
                <h1>My {car.brand}</h1>
                <p>It is a {car.color} {car.model} from {car.year}</p>
                <button type="button" onClick={updateColor}>Blue</button>
            </div>
        </Fragment>
    )

}

export default Car;