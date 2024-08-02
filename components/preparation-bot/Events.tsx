import React from 'react';

interface Event {
  date: string;
  headline: string;
  description: string;
}

interface EventsProps {
  events: Event[];
}

export const Events: React.FC<EventsProps> = ({ events }) => (
  <div className="events">
    {events.map((event, index) => (
      <div key={index} className="event">
        <h3>{event.headline}</h3>
        <p>{event.date}</p>
        <p>{event.description}</p>
      </div>
    ))}
  </div>
);