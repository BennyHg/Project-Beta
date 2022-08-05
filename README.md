# CarCar

Team:

Benny Huang - Sales microservice Lead         
Yehsun Kang- Services microservice Lead

## Design

## Service microservice

*Please note that Status instances need to be built on the Django admin in order to be able to create a service appointment.
id 1 = "Scheduled"
id 2 = "Cancel"
id 3 = "Finish"

The Service functionality needs to keep track of service appointments for automobiles and their owners.

    1. TechnicianForm : create a form that allows a person to enter an automotive technician's name and employee number

    2.  SeviceAppointmentForm: create a form that allows a service concierge to enter 
                                    the VIN of the vehicle, 
                                    the name of the person to whom the vehicle belongs, 
                                    the date and time of the appointment, 
                                    the assigned technician,  
                                    a reason for the service appointment (like "oil change" or "routine maintenance")
                            -  When the form is submitted, the service appointment should be saved in the application  
                            -  create a link in the navbar to get to the Enter a service appointment form.

    3.  List of appointments: get the list of service appointment                       
                                    VIN, 
                                    customer name, 
                                    date and time of the appointment, 
                                    the assigned technician's name, 
                                    the reason for the service

                            - cancel/finish button
                            - VIP treatment if the car was in inventory list   

    4. ServiceHistoryForm: create a page that has an input that allows someone to type in the VIN.
                            - on form submission,fetch all of the service appointments for an automobile with the VIN in the input.
                            - show that list of service appointments to include 
                            - create a link in the navbar to get to the page that shows the service history for a specific VIN.
                                

## Sales microservice


