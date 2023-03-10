import React from 'react';
// import "./index.css";

function ServicesList2(props) {
    // console.log(props)
    function onCancel(vin){
    console.log("worked")
    const url = `http://localhost:8080/api/services/${vin}/`
        const fetchConfig = {
            method: "PUT",
        }
    }
    function onFinish(vin){
    console.log("worked")
    const url = `http://localhost:8080/api/services/${vin}/`
        const fetchConfig = {
            method: "PUT",
        }
    }

    return (
        <>
        <p></p>
        <h2> Service Appointment</h2>
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
                    {props.services.filter(service => service.status.id === 1).map(service => {
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
                                    <button className='cancel' onClick={() => onCancel()}>Cancel </button>
                                    <button className='finish' onClick={() => onFinish()}>Finished</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
        </table>
        </>
    )
}
export default ServicesList2;








