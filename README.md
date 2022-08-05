# CarCar

Team:

* Benny Huang - Auto Sales
* Yehsun Kang - Auto Services

## Design
![Getting Started](./projectdesign-Benny&Yehsun.png)

## Service microservice

Explain your models and integration with the inventory
microservice, here.

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
