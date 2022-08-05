import React from "react";

class VehicleModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            picture_url: '',
            manufacturer: '',
            manufacturers: []
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureURLChange = this.handlePictureURLChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = {...this.state}
        delete data.manufacturers
        data.manufacturer_id = data.manufacturer
        delete data.manufacturer
        console.log(data)

        const vehiclemodelUrl = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(vehiclemodelUrl, fetchConfig)
        if (response.ok) {
            const newModel = await response.json()
            console.log(newModel)

            const cleared = {
                name: '',
                picture_url: '',
                manufacturer: '',
            }
            this.setState(cleared)
        }
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({name: value})
    }

    handlePictureURLChange(event) {
        const value = event.target.value;
        this.setState({ picture_url: value });
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({ manufacturer: value });
    }

    async componentDidMount() {
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const manuResponse = await fetch(manufacturerUrl)
        if (manuResponse.ok) {
            const manuData = await manuResponse.json()
            this.setState({manufacturers: manuData.manufacturers})
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a vehicle model</h1>
                        <form onSubmit={this.handleSubmit} id="create-sales-person-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div> 
                            <div className="form-floating mb-3">
                                <input value={this.state.picture_url} onChange={this.handlePictureURLChange} placeholder="Picture URL" required type="textarea" name="picture_url" id="picture_url" className="form-control"/>
                                <label htmlFor="picture_url">Picture URL</label>
                            </div> 
                            <div className="mb-3">
                                <select value={this.state.manufacturer} onChange={this.handleManufacturerChange} placeholder="Manufacturer" required name="manufacturer" id="manufacturer" className="form-select">
                                    <option value="">Choose a manufacturer</option>
                                        {this.state.manufacturers.map(manufacturer => {
                                            return (
                                                <option key={manufacturer.id} value={manufacturer.id}>
                                                    {manufacturer.name}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div> 
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default VehicleModelForm