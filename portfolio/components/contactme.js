import React from 'react';
import { FiMail, FiPhone, FiSend } from 'react-icons/fi';

function ContactMe() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mx-auto max-w-7xl py-16 mb-20 h-full pb-20">
      <div className="md:w-1/2 px-6 mb-10 md:mb-0 text-white text-center md:text-left">
        <h1 className="text-4xl font-bold mb-6">Let's Have A Conversation</h1>
        <p className="text-lg mb-4">
          Fill the form, and let's chat about your project or idea.
        </p>
        <div className="flex items-center mb-2">
          <FiMail className="mr-2 text-xl" />
          <p className="text-lg">
            <span className="font-semibold">Email:</span> hadjsaidbouras@hotmail.com
          </p>
        </div>
        <div className="flex items-center">
          <FiPhone className="mr-2 text-xl" />
          <p className="text-lg">
            <span className="font-semibold">Phone:</span> +213 699 74 06 16
          </p>
        </div>
      </div>
      <div className="md:w-1/2 px-6">
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              type="button"
            >
              <FiSend className="mr-2" />
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactMe;
