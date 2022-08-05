import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"aria-current="page" to="/services/new">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/services_list">Services List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/services_history">Services History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/technician/new">Technician</NavLink>
            </li>

            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/manufacturers">Manufacturers</NavLink>
            </li> 
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/manufacturers/new">Add a manufacturer</NavLink>
            </li> 
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/vehicle_models">Vehicle Models</NavLink>
            </li> 
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/vehicle_models/new">Create a Vehicle Model</NavLink>
            </li> 
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/automobiles">Automobiles</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/automobiles/new">Add a automobile</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/sales_persons/new">Add new sales person</NavLink>
            </li>   
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/customers/new">Add new customer</NavLink>
            </li>   
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/sales_records/new">Create a Sales record</NavLink>
            </li> 
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/sales_records">Sales records</NavLink>
            </li>   
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/sales_records/history">Salesperson history</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
