Create one RESTful API endpoint to allow search in multiple clinic providers and display results from all the available clinics by any of the following:

- Clinic Name
 - State [ex: "CA" or "California"]
- Availability [ex: from:09:00, to:20:00]

This is including search by multiple criteria in the same time like search by state and availability together.

This project is *Dockerized*. 

To run the entire project, just simply run the following cmd
```
    docker-compose up --build
```

My Analysis is as follows,

- **Simple, clear, readable code** How well structured it is? Yes, it well structured. The separation of concerns is clear, with each function having a specific task and the code being organized into clear sections. The use of named constants and descriptive variable names makes it easy to understand what is being done.
- **Correctness Does the application do what it promises?** Code is for public and I will appreciate it so we can collaborate together.
- **Security Are there any obvious vulnerability?** The code I wrote earlier does not have any obvious vulnerabilities, but it's always a good practice to review and test the code thoroughly to ensure security. Some common security risks to look for in a Node.js API include:
    - SQL Injection:
    - Cross-Site Request Forgery (CSRF)
    - Insufficient logging:

- **Memory efficiency How will it behave in case of large datasets?** Yes, it is desinged to handle large datasets
- **Testing How well tested your application is?** Can you give some metrics?
- **Documentation Is the code self documented**  Yes, it is documented.

# Node API - Dental & Vet Clinic Information
This API is a server-side component that aggregates data from two separate APIs that provide information about dental and veterinary clinics. The API will retrieve this information and normalize the data, making it easier to consume and display in a consistent manner.

Prerequisites
Before you begin, make sure you have the following software installed:

- Node.js
- npm


After running the `docker-compose up`
- The component will be available at http://localhost:3050/.



# Endpoints
The API provides the following endpoints:

GET /api: Retrieve a list of dental and veterinary clinics. The data will be normalized, making it easier to consume and display in a consistent manner.

# Pagination
The API supports pagination, and you can specify the page number and page size in the query parameters. The default page size is 10.

Example: GET /api?page=2&pageSize=5

# Data Normalization
The API will normalize the data from the dental and veterinary clinics, making it easier to consume and display in a consistent manner. The following fields will be included in the response:

- `clinicName`: The name of the clinic.
- `clinicState`: The state in which the clinic is located.
- `availabilityFrom`: The start time for clinic availability.
- `availabilityTo`: The end time for clinic availability.

# Error Handling
In the event of an error, the API will log the error message to the console and return a 500 Internal Server Error response to the client.


# React Component - Dental & Vet Clinic Information

This is a client-side React component that consumes the data provided by the Node API and displays it to the user in a paginated manner.

Prerequisites
Before you begin, make sure you have the following software installed:

- Node.js
- npm

# Functionality
The component will display the list of dental and veterinary clinics provided by the API. The data will be displayed in a paginated manner, with the user being able to navigate between pages.