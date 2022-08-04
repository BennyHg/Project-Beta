import React from 'react';

class ServiceHistory extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            vin: "",
            services: [],
        };
        this.handleChangeVin = this.handleChangeVin.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    async onSearch(event) {
        event.preventDefault();
        const data = { ...this.state };
        console.log(data)
        
        const vinUrl = `http://localhost:8080/api/services/${data.vin}`;
        const response = await fetch(vinUrl);
        if (response.ok) {
            const vins = await response.json();
            console.log(vins)
            this.setState({services:[vins]})
            
            const cleared = {
                vin: '',
            };
            this.setState(cleared);
        }
    }
    
    handleChangeVin(event) {
        const value = event.target.value;
        this.setState({ vin: value });
        console.log(value)
    }

    render() {
        return (
            <>
            <p></p>
            <div>
            <div className= "input-group"> 
            <form onSubmit= {this.onSearch} id= "search-bar" className='search-bar'>
                <input onChange={this.handleChangeVin} value={this.state.vin} required placeholder="Enter VIN" 
                type="search" id="search" name="vin" className="form-control rounded" /> <button> Search</button>
            </form>
            </div>
            </div>
            <p></p>
            <div className= "service list"> 
                <h2> Service History</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                    </thead>
                    <tbody>
                        {console.log(this.state.services)}
                            {this.state.services.map((service) => {
                                return (
                                    <tr key={service.vin}>
                                        <td>{service.vin}</td>
                                        <td>{service.customer_name}</td>
                                        <td>{service.date.split("T")[0]}</td>
                                        <td>{service.time.split("T")[1].slice(0, 5)}</td>
                                        <td>{service.technician.name}</td>
                                        <td>{service.reason}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                </table>
            </div>
            </>
        );
    }
}
export default ServiceHistory;