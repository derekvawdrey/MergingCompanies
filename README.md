# Take-home assignment
The scenario is you have two companies in a database (one is a duplicate of the other, entered erroneously by an employee). Provide an HTTP interface to merge these two companies together. Include in your solution a way for users to resolve conflicts when datapoints differ between the two companies. Ensure your solution also handles the updating of Users and Branches so that they are associated with the correct, resulting company from the merge.

- How would you do it?
- How would you architect the HTTP interface for that?
- How many endpoints?
- Message Structures?

# Running the project
Running the project can be done in two ways, either through Docker, or manually setting up the project. Docker is the easiest of the two and should ensure that the project works in any environment.

## Docker
**You must have Docker installed** on your local environment to run this!

1. Run `npm run docker:up` to start all necessary services. If you do not have npm installed, you can just run `docker compose up --build`. This will spin up the backend server and the PostgreSQL database.

## Manually
If you do not wish to use the Docker that I have created, you may run this project manually following the steps below:
1. Run `npm install` to install all necessary dependencies to the root project
2. Setup a PostgreSQL database and configure it in the .env (Example is in .env.example). **The database created must natively support `gen_random_uuid`, sqlite will not work for the migrations.**
3. Run `npm run migrate` to run migrations into the database.


# Endpoints

There are two endpoints:
- `/api/company/merge/` (POST)
- `/api/company/merge/conflicts` (GET)

# Design Decisions and Omissions
## Design Decisions
- I decided to use PostgreSQL for the database as it supports generating UUIDs for the IDs.
- I excluded any `updated_at` or `created_at` fields in the database for migrations for simplicity. But I would create those if this were going to be a production level system.

## Questions I came across as I was working on this project
- Are there any situations where a company might have multiple different addresses? 
I decided not to support multiple addresses per company, but I imagine that this may be something you would want to do if you had a company with multiple different locations. Perhaps you'd need to attach the address onto the branch instead? I could imagine in that situation you'd probably want a seperate address table that is attached to a company/branch.