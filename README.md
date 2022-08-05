# CarCar

Team:

* Benny Huang - Auto Sales
* Yehsun Kang - Auto Services

## Design
![Getting Started](./projectdesign-Benny&Yehsun.png)

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
Sales app will keep track of data through each transaction such as sales person, customer, sales history and automobile.


1. Create models of microservice to store intended data
    - AutomobileVO
    - Sales person
    - Customer
    - Sales record
2. Create forms for each sales person, potential customer, sale record
    - sales person form will require a name and employee number
    - customer form will require a name, address, and phone number
    - sales record form is created getting the data from foreign keys:
        - automobile: to get the VIN of each automobile
        - sales_person: to assign each sales person to the sold vehicle
        - customer: to get the name of the customer who purchased the vehicle
        - price is not a foreign key since it does not have it's own table
    - each of the foreign keys in the sales record will have it's own dropdown selection to select from their respective table data
3. Create list of sales, sales person's history
    - implement sales API to handle sales information
4. Create poller to get data from the automobile service
    - polls from automobile to grab the data of automobiles in inventory
5. Add nav bar link for sales person, potential customer, sale record, sales list, sales person's history
    - Front end navigation for ease of access to forms & lists
6. Dropdown selection on sales person's sales history which displays customers, VIN and sales price
    - Search for specific transaction records according to salesperson
