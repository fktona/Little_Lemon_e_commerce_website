import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdWest } from "react-icons/md";
import useSubmit from "../assets/useFormData";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Message: "",
  });

  const {
    emptyField,
    isLoading,
    emptyFieldKey,
    handleSubmit,
    Navigate,
    handleInputChange,
  } = useSubmit("address", formData, setFormData);

  return (
    <div className="flex flex-col items-center md:flex-row p-8 md:p-16 bg-crisp-white">
      {/* Company Info */}
      <div className="md:w-1/2  p-4 flex flex-col justify-between  border-b md:border-b-0 md:border-r border-accent">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-primary">Call Us</h3>

          <p className="mb-4 text-secondary">08123235678</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-primary">
            Company Address
          </h3>

          <p className="mb-4 text-secondary">
            123 Main Street
            <br />
            City, Country
          </p>
        </div>
        <div className="space-x-4">
          <h3 className="text-2xl font-semibold mb-4 text-primary"> Socials</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="md:w-1/2 px-4 mt-8 md:mt-0">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1 text-secondary"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border rounded"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-medium mb-1 text-secondary"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block font-medium mb-1 text-secondary"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Your message here"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
