import React, { useState, Fragment } from "react";


// function based component created
function FavoriteColorComponent()
{
    // state made by useState() when updated, it re-render the view and useEffect() runs after every render, when no dependency is passed
    // useState() accepts the initial state and returns the two values (1) the current state (2) a function that update the state
    // useState() hook allows us to track state in a functional component   // state means data, variables
    // hook is a term designed only for function based component
    const [color, setColor] = useState("Blue");     
    
    // return web ui
    return (
        <Fragment>
            <div style={{paddingLeft: "150px"}}>
                <h1>My Favorite color is {color}!</h1>
                <button type="button" onClick={() => setColor("blue")}>Blue</button>
                <button type="button" onClick={() => setColor("red")}>Red</button>
                <button type="button" onClick={() => setColor("pink")}>Pink</button>
                <button type="button" onClick={() => setColor("green")}>Green</button>
            </div>
        </Fragment>
    )

}

export default FavoriteColorComponent;