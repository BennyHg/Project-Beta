import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import React from 'react';
import ServiceForm from './ServiceForm';
import ServicesList from './ServicesList';
import TechnicianForm from './TechnicianForm';
import ServiceHistory from './ServiceHistory';
import SalesRecordList from './SalesRecordList';
import SalesRecordForm from './SalesRecordForm';
import SalesPersonHistory from './SalesPersonHistory';
import SalesPersonForm from './SalesPersonForm';
import CustomerForm from './CustomerForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';
import AutoList from './AutoList';
import AutoForm from './AutoForm';

function App() {
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
          <Route path="/sales_records" element={<SalesRecordList />} />
          <Route path="/sales_records/new" element={<SalesRecordForm />} />
          <Route path="/sales_records/history" element={<SalesPersonHistory />} />
          <Route path="/sales_persons/new" element={<SalesPersonForm />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/vehicle_models" element={<VehicleModelList />} />
          <Route path="/vehicle_models/new" element={<VehicleModelForm />} />
          <Route path="/automobiles" element={<AutoList />} />
          <Route path="/automobiles/new" element={<AutoForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
