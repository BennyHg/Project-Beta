import React from 'react';
// import "./index.css";

function ServicesList(props) {
    // console.log(props)

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
                    {props.services.map(service => {
                        return (
                            <tr key={service.vin}>
                                <td>{service.vin}</td>
                                <td>{service.customer_name}</td>
                                <td>{service.date.split("T")[0]}</td>
                                <td>{service.time.split("T")[1].slice(0, 5)}</td>
                                <td>{service.technician.name}</td>
                                <td>{service.reason}</td>
                                <td>{(service.vip)? "False" :"True"}</td>
                                <td>{service.status}</td>
                                
                            </tr>
                        );
                    })}
                </tbody>
        </table>
        </>
    )
}
export default ServicesList;








