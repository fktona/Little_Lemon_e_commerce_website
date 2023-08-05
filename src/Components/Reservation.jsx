import React, { useState } from 'react';

const Reservation = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [ request , setRequest] = useState('')

  // const [reservationForm , setReservationForm] = ({
  //   name: '',
  //   email:'',
  //   phone
  // })

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the form data to the server or perform any other actions.
    console.log('Form submitted:', { name, email, phone, partySize, date, time });
  };

  return (
    <div className=" mx-auto mt-8 bg-crisp_white  shadow-md ">
      <form className='lg:flex gap-6 p-5 items-center justify-center opacity-80  bg-crisp-white  
       rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg' onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center w-80">Make a Reservation</h2>
        <div className="grid   gap-2 flex-1">
          <div>
            <input
              placeholder='Enter Your Name' 
              type="text"
              id="name"
              className="w-full border  px-3 py-2 outline-none focus:border-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder='Email'
              type="email"
              id="email"
              className="w-full border  px-3 py-2 outline-none focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder='Phone Number'
              type="text"
              id="phone"
              className="w-full border  px-3 py-2 outline-none focus:border-primary"
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
              className="w-full border  px-3 py-2 outline-none focus:border-primary"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              required
              min="1"
              step="1"
            />
          </div>
          <div className='flex  justify-around gap-6'>
            <input
              placeholder='Select Date'
              type="date"
              id="date"
              className="w-full border  px-3 py-2 outline-none focus:border-primary"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          
            <input
              placeholder='Time'
              type="time"
              id="time"
              className="w-full border  px-3 py-2 outline-none focus:border-primary"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div>
          <textarea
            name="comment"
            id="" cols="13" rows="6"
            placeholder='Make Special Request'
            className=' border-2 border-primary text-center w-full p-2 m-4 mx-auto'>
            </textarea>
        <button
          type="submit"
          className="mt-4 w-full bg-secondary  hover:bg-accent  text-white font-semibold py-2 "
        >
          Reserve Now
        </button>
          </div>
        </div>
        
      </form>
    </div>
  );
};

export default Reservation;
