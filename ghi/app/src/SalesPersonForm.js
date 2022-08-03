import React from "react";

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_number: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = {...this.state}
        console.log(data)

        const salespersonUrl = 'http://localhost:8090/api/sales_persons/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(salespersonUrl, fetchConfig)
        if (response.ok) {
            const newSalesperson = await response.json()
            console.log(newSalesperson)

            const cleared = {
                name: '',
                employee_number: '',
            }
            this.setState(cleared)
        }
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({name: value})
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value
        this.setState({employee_number: value})
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a sales person</h1>
                        <form onSubmit={this.handleSubmit} id="create-sales-person-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Sales person name</label>
                            </div> 
                            <div className="form-floating mb-3">
                                <input value={this.state.employee_number} onChange={this.handleEmployeeNumberChange} placeholder="Employee number" required type="number" name="employee_number" id="employee_number" className="form-control"/>
                                <label htmlFor="employee_number">Employee number</label>
                            </div> 
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default SalesPersonForm