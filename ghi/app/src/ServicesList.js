
import React from 'react';

class ServicesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            services: [],
        };
    
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }
    
    async componentDidMount() {
        const url = 'http://localhost:8080/api/services/';
        const response = await fetch(url);
        // console.log(response)
        if (response.ok) {
            const data = await response.json();
            this.setState({ services:data.services});
            // console.log(data)
        }
    }

    async handleChangeStatus(service) {
        // const value = event.target.value;
        // event.preventDefault();
        console.log("button is clicked")
        const data = { "status": "Cancel"};
        // const body = {"status": status}
        // console.log("status:", status)
        console.log(service)
        const serviceUrl = `http://localhost:8080/api/services/${service.vin}/status/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(serviceUrl, fetchConfig);
        if (response.ok) {
            // console.log(response)
            const newStatus= await response.json();
            console.log(newStatus);
            };
            // window.location.reload(false);
        }
    async handleChangeStatus(service) {
        // const value = event.target.value;
        // event.preventDefault();
        console.log("button is clicked")
        const data = { "status": "Finish"};
        // const body = {"status": status}
        // console.log("status:", status)
        console.log(service)
        const serviceUrl = `http://localhost:8080/api/services/${service.vin}/status/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(serviceUrl, fetchConfig);
        if (response.ok) {
            // console.log(response)
            const newStatus= await response.json();
            console.log(newStatus);
            };
            // window.location.reload(false);
        }
    
    render() {
        return (
            <>
            <p></p>
            <h2> Service Appointment</h2>
            <form>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>VIP</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                            {this.state.services.map(service => {
                                // console.log(service.status.name)
                                if(service.status.id === 1){
                                    return (
                                        <tr key={service.vin}>
                                            <td>{service.vin}</td>
                                            <td>{service.customer_name}</td>
                                            <td>{service.date.split("T")[0]}</td>
                                            <td>{service.time.split("T")[1].slice(0, 5)}</td>
                                            <td>{service.technician.name}</td>
                                            <td>{service.reason}</td>
                                            <td>{(service.vip)? "False" :"True"}</td>
                                            <td>
                                                <button onClick={() => this.handleChangeStatus(service)} value ={service.vin}
                                                 type= "button" className="btn btn-danger">Cancel</button>
                                                <button onClick={() => this.handleChangeStatus(service)} value ={service.vin}
                                                 type= "button" className="btn btn-success">Finish</button>

                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                </table>
            </form>
            </>
        );
    }
}

export default ServicesList;