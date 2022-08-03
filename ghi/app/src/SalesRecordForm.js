import React from 'react';

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobile: '',
            autos: [],
            sales_person: '',
            salespersons: [],
            customer: '',
            customers: [],
            price: '',
        }
        this.handleAutoChange = this.handleAutoChange.bind(this)
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this)
        this.handleCustomerChange = this.handleCustomerChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleAutoChange(event) {
        const value = event.target.value
        this.setState({automobile: value})
    }

    handleSalesPersonChange(event) {
        const value = event.target.value
        this.setState({sales_person: value})
    }

    handleCustomerChange(event) {
        const value = event.target.value
        this.setState({customer: value})
    }
    
    handlePriceChange(event) {
        const value = event.target.value
        this.setState({price: value})
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = {...this.state}
        delete data.autos
        delete data.salespersons
        delete data.customers
        data.price = data.price + ''
        console.log(typeof data.price)


        const salesrecordUrl = 'http://localhost:8090/api/sales_records/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(salesrecordUrl, fetchConfig)
        if (response.ok) {
            const newSales = await response.json()
            console.log(newSales)

            const cleared = {
                auto: '',
                sales_person: '',
                customer: '',
                price: ''
            }
            this.setState(cleared)
        }

    }

    async componentDidMount() {
        const autoUrl = 'http://localhost:8100/api/automobiles/'
        const autoResponse = await fetch(autoUrl)
        if (autoResponse.ok) {
            const autoData = await autoResponse.json()
            this.setState({autos: autoData.autos})
        }

        const salespersonUrl = 'http://localhost:8090/api/sales_persons/'
        const salespersonResponse = await fetch(salespersonUrl)
        if (salespersonResponse.ok) {
            const salespersonData = await salespersonResponse.json()
            this.setState({salespersons: salespersonData.salespersons})
        }

        const customerUrl = 'http://localhost:8090/api/customers/'
        const customerResponse = await fetch(customerUrl)
        if (customerResponse.ok) {
            const customerData = await customerResponse.json()
            this.setState({customers: customerData.customers})
        }
        
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a sales record</h1>
                        <form onSubmit={this.handleSubmit} id="create-sales-record-form">
                            <div className="mb-3">
                                <select value={this.state.automobile} onChange={this.handleAutoChange} required name="auto" id="auto" className="form-select">
                                    <option value="">Choose an automobile</option>
                                    {this.state.autos.map(auto => {
                                        return (
                                            <option key={auto.vin} value={auto.vin}>
                                                {auto.vin}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.sales_person} onChange={this.handleSalesPersonChange} required name="sales_person" id="sales_person" className="form-select">
                                    <option value="">Choose a sales person</option>
                                    {this.state.salespersons.map(sales_person => {
                                        return (
                                            <option key={sales_person.name} value={sales_person.name}>
                                                {sales_person.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.customer} onChange={this.handleCustomerChange} required name="customer" id="customer" className="form-select">
                                    <option value="">Choose a customer</option>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <option key={customer.name} value={customer.name}>
                                                {customer.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePriceChange} value={this.state.price} placeholder="Sale Price" required type="number" name="price" id="price" className="form-control"/>
                                <label htmlFor="price">Sale Price</label>
                            </div> 
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SalesRecordForm