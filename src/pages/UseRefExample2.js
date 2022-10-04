import React, { useState, useEffect, Fragment, useRef } from 'react';


// function based component created
function UseRefComponent()
{
    const inputElement = useRef();

    const focusInput = () => 
    {
        inputElement.current.focus();
    }
    

    
    // web ui
    return (
        <Fragment>
            <div style={{paddingLeft: "150px", margin: "30px"}}>
                <input type="text" ref={inputElement} />
                <button onClick={focusInput}>Focus Input</button>
            </div>
        </Fragment>
    )
}

export default UseRefComponent;

