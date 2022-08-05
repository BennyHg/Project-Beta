import React from "react";

class VehicleModelList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            models: []
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8100/api/models/')
        if (response.ok) {
            const data = await response.json()
            this.setState({
                models: data.models
            })
        }
    }
    render () {
        return (
            <>
            <h1>Vehicle models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.models.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{ model.name }</td>
                                <td>{ model.manufacturer.name }</td>
                                <td><img src={model.picture_url} height="100" width="200" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        )
    }
}

export default VehicleModelList