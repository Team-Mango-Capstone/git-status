import React, { useState, useEffect } from 'react';
import '../../css/Activity.css';
import axios from 'axios';

export function Activity() {
  const screenName = localStorage.getItem('screenName');
  const [yourEvents, setYourEvents] = useState([]);
  const [othersEvents, setOthersEvents] = useState([]);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const getYourEvents = async () => {
      const { data } = await axios.get(
        `https://api.github.com/users/${screenName}/events`
      );
      setYourEvents(data.slice(0, 20));
    };

    const getOthersEvents = async () => {
      const { data } = await axios.get(
        `https://api.github.com/users/${screenName}/received_events`
      );
      setOthersEvents(data.slice(0, 20));
    };
    getYourEvents();
    getOthersEvents();
  }, []);

  return (
    <div className='activity'>
      <div className='activity-tab'>
        <h2>Activity</h2>
        <div className='activity-toggle'>
          <button
            className={status ? 'activity-btn-active' : 'activity-btn'}
            onClick={() => setStatus(true)}
          >
            <h4>Yours</h4>
          </button>
          <button
            className={!status ? 'activity-btn-active' : 'activity-btn'}
            onClick={() => setStatus(false)}
          >
            <h4>Others</h4>
          </button>
        </div>
      </div>
      <div className='your-events'>
        {status ? (
          yourEvents ? (
            yourEvents.map((event) => (
              <div className='event' key={event.id}>
                <div className='event-day'>
                  <h2>{event.type.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')}</h2>
                  <h3>{event.created_at.slice(0, 10)}</h3>
                </div>
                <p>{event.repo.name}</p>
                {event === yourEvents[yourEvents.length - 1] ? <div /> : <hr />}
              </div>
            ))
          ) : (
            <h3 className='no-activity'>No activity to display!</h3>
          )
        ) : othersEvents ? (
          othersEvents.map((event) => (
            <div className='event' key={event.id}>
              <p>&#187; {event.actor.display_login}</p>
              <div className='event-day'>
                <h2>{event.type.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')}</h2>
                <h3>{event.created_at.slice(0, 10)}</h3>
              </div>
              <p>{event.repo.name}</p>
              {event === othersEvents[othersEvents.length - 1] ? (
                <div />
              ) : (
                <hr />
              )}
            </div>
          ))
        ) : (
          <h3 className='no-activity'>No activity to display!</h3>
        )}
      </div>
    </div>
  );
}
