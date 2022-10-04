import React, { useState, useEffect, Fragment } from 'react';

// This example illustrates we have to prop drilling, if we do not use context hook

// function based component created
function ComponentOne()
{
    // state made by useState() when updated, it re-render the view and useEffect() runs after every render, when no dependency is passed
    // useState() accepts the initial state and returns the two values (1) the current state (2) a function that update the state
    // useState() hook allows us to track state in a functional component   // state means data, variables
    // hook is a term designed only for function based component
    const [userName, setUserName] = useState("Mian Sumair Imtiaz");

    // empty array is passed as an second argument, it means useEffect() runs only on the first render
    // function argument 1 can return for cleanup purposes
    useEffect(
        () => {
            console.log('Outer most Component is rendered!');
        },
        []
    );


    // web ui
    return (
        <Fragment>
            <div style={{paddingLeft: "150px"}}>
                <h1>{`Assalamu Alaikum ${userName}!`}</h1>
                <ComponentTwo user={userName} />
            </div>
        </Fragment>
    )
}

export default ComponentOne;

function ComponentTwo( {user} )
{
    return (
        <Fragment>
            <h1>Component Two Web UI</h1>
            <ComponentThree user={user} />
        </Fragment>
    )
}

function ComponentThree( {user} )
{
    return (
        <Fragment>
            <h1>Component Three Web UI</h1>
            <ComponentFour user={user} />
        </Fragment>
    )
}

function ComponentFour( {user} )
{
    return (
        <Fragment>
            <h1>Component Four Web UI</h1>
            <ComponentFive user={user} />
        </Fragment>
    )
}

function ComponentFive( {user} )
{
    return (
        <Fragment>
            <h1>Component Five Web UI</h1>
            <h2>{`Assalamu Alaikum, ${user}!`}</h2>
        </Fragment>
    )
}
