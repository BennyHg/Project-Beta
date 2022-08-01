# CarCar

Team:

* Person 1 - Which microservice?
* Person 2 - Which microservice?

## Design

## Service microservice
The Service functionality needs to keep track of service appointments for automobiles and their owners.

- Frontend: 

    - TechnicianForm : create a form that allows a person to enter an automotive technician's name and employee number

    - SeviceAppointmentForm: create a form that allows a service concierge to enter 
                                    the VIN of the vehicle, 
                                    the name of the person to whom the vehicle belongs, 
                                    the date and time of the appointment, 
                                    the assigned technician,  
                                    a reason for the service appointment (like "oil change" or "routine maintenance")
                            -  When the form is submitted, the service appointment should be saved in the application  
                            -  create a link in the navbar to get to the Enter a service appointment form.

    - List of appointments :                          
                                    VIN, 
                                    customer name, 
                                    date and time of the appointment, 
                                    the assigned technician's name, 
                                    the reason for the service

                            - cancel/finish button
                            - VIP treatment if the car was in inventory list   

    - ServiceHistoryForm: create a page that has an input that allows someone to type in the VIN.
                            - on form submission, fetch all of the service appointments for an automobile with the VIN in the input.
                                Then, show that list of service appointments to include 
                            - create a link in the navbar to get to the page that shows the service history for a specific VIN.

- Backend: 
    - model.py
    - view.py                                

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
