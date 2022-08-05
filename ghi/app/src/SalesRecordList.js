import React from "react"

class SalesRecordList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salesrecords: []
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
    }

    render () {
        return (
            <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales person</th>
                        <th>Employee Number</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Sale price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.salesrecords.map(salesrecord => {
                        return (
                            <tr key={salesrecord.id}>
                                <td>{ salesrecord.sales_person.name }</td>
                                <td>{ salesrecord.sales_person.employee_number }</td>
                                <td>{ salesrecord.customer.name }</td>
                                <td>{ salesrecord.automobile.vin }</td>
                                <td>${ salesrecord.price }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        )
    }
}

export default SalesRecordList