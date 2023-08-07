import React, { useState } from 'react';

const Reservation = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [request, setRequest] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the form data to the server or perform any other actions.
    console.log('Form submitted:', { name, email, phone, partySize, date, time, request });
  };

  return (
    <div className="mx-auto  p-8 bg-gradient-to-r from-creamy-yellow to-crisp-white shadow-md rounded-lg">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-primary text-center">Make a Reservation</h2>
        <input
          placeholder="Enter Your Name"
          type="text"
          id="name"
          className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          type="email"
          id="email"
          className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Phone Number"
          type="text"
          id="phone"
          className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label htmlFor="partySize" className="block font-medium mb-1 text-primary">
          Party Size
        </label>
        <input
          type="number"
          id="partySize"
          className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          required
          min="1"
          step="1"
        />
        <div className="flex justify-between gap-4">
          <input
            placeholder="Select Date"
            type="date"
            id="date"
            className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            placeholder="Time"
            type="time"
            id="time"
            className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <textarea
          name="comment"
          cols="30"
          rows="5"
          placeholder="Make Special Request"
          className="w-full p-2 border border-primary rounded focus:outline-none focus:border-accent"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-secondary hover:bg-accent text-white font-semibold py-2 rounded"
        >
          Reserve Now
        </button>
      </form>
    </div>
  );
};

export default Reservation;
