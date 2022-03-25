import React from 'react';
import '../../css/Activity.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function Activity() {
  const screenName = localStorage.getItem('screenName');
  const [yourEvents, setYourEvents] = useState([]);
  const [othersEvents, setOthersEvents] = useState([]);

  useEffect(() => {
    getYourEvents();
    getOthersEvents();
  }, []);

  const getYourEvents = async () => {
    const { data } = await axios.get(
      `https://api.github.com/users/${screenName}/events`
    );
    setYourEvents(data);
  };

  const getOthersEvents = async () => {
    const { data } = await axios.get(
      `https://api.github.com/users/${screenName}/received_events`
    );
    setOthersEvents(data);
  };

  // console.log(yourEvents);
  // console.log(othersEvents);

  return (
    <div className='activity'>
      <h3>Activity</h3>

      {yourEvents.map((event) => (
        <div className='events' key={event.id}>
          <p>{event.type}</p>
          <p>{event.repo.name}</p>
          <p>{event.created_at.slice(0, 10)}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
