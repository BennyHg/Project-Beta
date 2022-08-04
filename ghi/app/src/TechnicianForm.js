import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_number: '',
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
    
        const technicianUrl = 'http://localhost:8080/api/technician/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);

            const cleared = {
                name: '',
                employee_number: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
       
    }
    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({ employee_number: value })
    }

    render() {
        return (
            <div className="row">

                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new technician</h1>
                        <form onSubmit={this.handleSubmit} id="create-technician-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange}
                                    placeholder="Name" required type="text" name="name"
                                    id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.employee_number} onChange={this.handleEmployeeNumberChange}
                                    placeholder="Employee Number" required type="text" name="employee_number"
                                    id="employee_number" className="form-control" />
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TechnicianForm;