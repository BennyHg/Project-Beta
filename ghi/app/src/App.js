import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesRecordList from './SalesRecordList';
import SalesRecordForm from './SalesRecordForm';
import SalesPersonHistory from './SalesPersonHistory';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
