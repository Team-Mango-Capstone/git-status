import React, { useState, useEffect } from 'react';

function DateTime() {
  const [dateState, setDateState] = useState('');
  const spanStyle = { color: '#58a6ff' };

  // useEffect(() => {
  //   setInterval(() => setDateState(new Date()), 1000);
  // }, []);

  return (
    <div className='time'>
      {dateState && (
        <h2>
          {
            new Date(
              dateState.getTime() - dateState.getTimezoneOffset() * 60000
            )
              .toISOString()
              .split('T')[0]
          }{' '}
          |{' '}
          <span style={spanStyle}>
            {dateState.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </span>
        </h2>
      )}
    </div>
  );
}

export default DateTime;
