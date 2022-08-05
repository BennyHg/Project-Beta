import React from 'react';

class ServiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vin: '',
            customer_name: '',
            date: '',
            time: '',
            reason: '',
            technician: '',
            technicians: [],  
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeVin = this.handleChangeVin.bind(this);
        this.handleChangeCustomerName = this.handleChangeCustomerName.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleChangeReason = this.handleChangeReason.bind(this);
        this.handleChangeTechnician = this.handleChangeTechnician.bind(this);
    }
    
    async componentDidMount() {
        const url = 'http://localhost:8080/api/technician/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ technicians: data.technicians });
        }
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        console.log(data)
        delete data.technicians;
        const serviceUrl = 'http://localhost:8080/api/services/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const response = await fetch(serviceUrl, fetchConfig);
        if (response.ok) {
            const newservice = await response.json();
            console.log(newservice)
            const cleared = {
                vin: '',
                customer_name: '',
                date: '',
                time: '',
                reason: '',
                technician: '',
            };
            this.setState(cleared);
        } else {
            console.error(response)
        }
    }
    
    handleChangeVin(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }
    
    handleChangeCustomerName(event) {
        const value = event.target.value;
        this.setState({ customer_name: value });
    }
    
    handleChangeDate(event) {
        const value = event.target.value;
        this.setState({ date: value });
    }
    
    handleChangeTime(event) {
        const value = event.target.value;
        this.setState({ time: value });
    }
    
    handleChangeReason(event) {
        const value = event.target.value;
        this.setState({ reason: value });
    }
    handleChangeTechnician(event) {
        const value = event.target.value;
        console.log(value)
        this.setState({ technician: value });
    }
    

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a service appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-service-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeVin} required placeholder="VIN" type="text"
                                    id="vin" name="vin" className="form-control" value={this.state.vin} />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeCustomerName} required placeholder="Customer Name" type="text"
                                    id="customer_name" name="customer_name" className="form-control" value={this.state.customer_name} />
                                <label htmlFor="customer_name">Customer Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeDate} required placeholder="Date" type="date"
                                    id="date" name="date" className="form-control" value={this.state.date} />
                                <label htmlFor="date">Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeTime} required placeholder="Time" type="time"
                                    id="time" name="time" className="form-control" value={this.state.time} />
                                <label htmlFor="time">Time</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeReason} required placeholder="Reason" type="text"
                                    id="reason" name="reason" className="form-control" value={this.state.reason} />
                                <label htmlFor="reason">Reason</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChangeTechnician} required id="technician" name="technician" className="form-select" value={this.state.technician}>
                                    <option >Choose a technician</option>
                                    {this.state.technicians.map(technician => {
                                        return (
                                            <option key={technician.employee_number} value={technician.employee_number}>
                                                {technician.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceForm;
