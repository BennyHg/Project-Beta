import React from 'react'

class SalesPersonHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salesrecords: [],
            sales_person: '',
            salespersons: [],
        }
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this)
    }

    async handleSalesPersonChange(event) {
        const value = event.target.value
        this.setState({sales_person: value})

        const response = await fetch('http://localhost:8090/api/sales_records/')
        if (response.ok) {
            const data = await response.json()
            
            let salesrecord = data.salesrecords

            let salespersonrecord = salesrecord.filter(record => record.sales_person.name === value)
            console.log(salespersonrecord)
            if (value >= 1) {
                this.setState({salesrecords: data.salespersons})
            } else {
                this.setState({salesrecords: salespersonrecord})
            }
        }

    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8090/api/sales_records/')
        if (response.ok) {
            const data = await response.json()
            this.setState({
                salesrecords: data.salesrecords
            })
        }

        const salespersonUrl = 'http://localhost:8090/api/sales_persons/'
        const salespersonResponse = await fetch(salespersonUrl)
        if (salespersonResponse.ok) {
            const salespersonData = await salespersonResponse.json()
            this.setState({salespersons: salespersonData.salespersons})
        }
    }

    render () {
        const hasSales = this.state.salespersons.length > 0
        let options = null;
        if (hasSales) {
            options = (
                <tbody>
                    {this.state.salesrecords.map(salesrecord => {
                        return (
                            <tr key={salesrecord.id}>
                                <td>{ salesrecord.sales_person.name }</td>
                                <td>{ salesrecord.customer.name }</td>
                                <td>{ salesrecord.automobile.vin }</td>
                                <td>${ salesrecord.price }</td>
                            </tr>
                        )
                    })}
                </tbody>
            )
        }
        return (
            <>
            <h1>Sales person history</h1>
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
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales person</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Sale price</th>
                    </tr>
                </thead>
                {options}
            </table>
            </>
        )
    }
}

export default SalesPersonHistory