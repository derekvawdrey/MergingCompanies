# MergingCompanies

This repository is an implementation of the given scenario below.

## Take-home assignment
The scenario is you have two companies in a database (one is a duplicate of the other, entered erroneously by an employee). Provide an HTTP interface to merge these two companies together. Include in your solution a way for users to resolve conflicts when datapoints differ between the two companies. Ensure your solution also handles the updating of Users and Brances so that they are associated with the correct, resulting company from the merge.

- How would you do it?
- How would you architect the HTTP interface for that?
- How many endpoints?
- Message Structures?

## Running the project
Running the project can be done in two ways, either through Docker, or manually setting up the project. Docker is the easiest of the two and should ensure that the project works in any environment.

### Docker
We will be running this project in development mode for the sake of ease and brevity. **You must have Docker installed** on your local environment to run this!

1. Run `npm run docker:dev:up` to start all necessary services

### Manually
If you do not wish to use the Docker that I have created, you may run this project manually following the steps below:
1. Run `npm install` to install all necessary dependencies to the root project



## Questions I came across as I was working on this project
- Are there any situations where a company might have multiple different addresses? 
I decided not to support multiple addresses per company, but I imagine that this may be something you would want to do if you had a company with multiple different branches. Perhaps you'd need to instead attach the address onto the branch instead? I could imagine in that situation you'd probably want a seperate address table that is attached to a company/branch.