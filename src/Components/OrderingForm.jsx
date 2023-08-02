import React, { useState } from 'react';

const OrderingForm = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the form data to the server or perform any other actions.
    console.log('Form submitted:', { name, email, phone, partySize, date, time });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-crisp_white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Make a Reservation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium mb-1 text-primary">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="partySize" className="block font-medium mb-1">
              Party Size
            </label>
            <input
              type="number"
              id="partySize"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              required
              min="1"
              step="1"
            />
          </div>
          <div>
            <label htmlFor="date" className="block font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block font-medium mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
        >
          Reserve Now
        </button>
      </form>
    </div>
  );
};

export default OrderingForm;
