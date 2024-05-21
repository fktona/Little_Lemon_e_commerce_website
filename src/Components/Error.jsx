// src/components/ErrorPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
const ErrorPage = () => {
  return (
    <>
    <Nav />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-center text-gray-600 mb-6 max-w-md">
        The page you are looking for does not exist. Please check the URL or return to the homepage.
      </p>
      <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
        Go to Home
      </Link>
    </div>
    </>
  );
};

export default ErrorPage;
