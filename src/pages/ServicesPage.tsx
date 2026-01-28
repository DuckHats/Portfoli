import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Services } from '../components/Services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Helmet>
        <title>Services - DuckHats</title>
        <meta name="description" content="Explore our digital development services: Web, API, Backoffice, and more." />
      </Helmet>
      <Navbar />
      <Services />
      <Footer />
    </div>
  );
};

export default ServicesPage;
