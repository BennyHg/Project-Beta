import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import React from 'react';
import ServiceForm from './ServiceForm';
import ServicesList from './ServicesList';
import TechnicianForm from './TechnicianForm';
import ServiceHistory from './ServiceHistory';

function App(props) {
  if (props.services === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="services/new" element={<ServiceForm />} />
          <Route path="services_list" element={<ServicesList/>} />
          <Route path="services_history" element={<ServiceHistory />} />
          <Route path="technician/new" element={<TechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
