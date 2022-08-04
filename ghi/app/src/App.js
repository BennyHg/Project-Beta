import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesRecordList from './SalesRecordList';
import SalesRecordForm from './SalesRecordForm';
import SalesPersonHistory from './SalesPersonHistory';
import SalesPersonForm from './SalesPersonForm';
import CustomerForm from './CustomerForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sales_records" element={<SalesRecordList />} />
          <Route path="/sales_records/new" element={<SalesRecordForm />} />
          <Route path="/sales_records/history" element={<SalesPersonHistory />} />
          <Route path="/sales_persons/new" element={<SalesPersonForm />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/vehicle_models" element={<VehicleModelList />} />
          <Route path="/vehicle_models/new" element={<VehicleModelForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
