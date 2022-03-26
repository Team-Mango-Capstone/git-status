import React, { useState, useEffect } from 'react';


function DateTime() {
    const [dateState, setDateState] = useState("");

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000)
    }, [])

    // console.log("This is the date state", dateState.toISOString().slice(0, 10))

    return (
        <div className='time'>
            {/* {dateState && <h1>Day {dateState.toISOString().slice(0, 10)} / Time {dateState.toLocaleTimeString("en-US", {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}</h1>} */}
            {dateState && <h1>Day {new Date(dateState.getTime() - (dateState.getTimezoneOffset() * 60000)).toISOString().split("T")[0]} / Time {dateState.toLocaleTimeString("en-US", {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}</h1>}
        </div>
    )
}

export default DateTime;