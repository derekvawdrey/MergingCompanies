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

1. Run `npm run docker:up` to start all necessary services. If you do not have npm installed, you can just run `docker compose up --build`. This will spin up the backend server and the PostgreSQL database. This should also migrate and seed the database.

## Manually
If you do not wish to use the Docker that I have created, you may run this project manually following the steps below:
1. Run `npm install` to install all necessary dependencies to the root project
2. Setup a PostgreSQL database and configure it in the .env (Example is in .env.example). **The database created must natively support `gen_random_uuid`, sqlite will not work for the migrations.**
3. Transpile the code by running `npm run build`
4. Run `npm run migrate` to run migrations for the database.
5. Run `npm run seed` to seed the database
6. Start up the server by running `npm run start`


# Endpoints
The project will default to localhost:3000 unless otherwise specified.

The two merging endpoints are:
- `/api/companies/:targetId/preview-merge/:duplicateId` (GET)
- `/api/companies/:targetId/merge/:duplicateId` (POST)

However, I have also written three other endpoints to make the front-end interface easy to use.
- `/api/companies` (GET)
- `/api/companies/:id` (POST)
- `/api/companies/search` (GET)

Merging APIs
---

## GET `/api/companies/:targetId/preview-merge/:duplicateId`

Returns a **preview** of merge conflicts between two companies. Use this before calling the merge endpoint to see which fields differ and to decide which values to keep.

**Path parameters**

| Parameter     | Type   | Description                                                                 |
|---------------|--------|-----------------------------------------------------------------------------|
| `targetId`    | UUID   | ID of the company to **keep** (the one that will remain after the merge).  |
| `duplicateId` | UUID   | ID of the duplicate company that will be merged into the target and then deleted. |

**Success response:** `200 OK`

```json
{
  "conflicts": [
    {
      "field": "name",
      "valueType": "string",
      "targetValue": "Acme Corp",
      "duplicateValue": "Acme Corporation"
    },
    {
      "field": "address_line_1",
      "valueType": "string",
      "targetValue": "123 Main St",
      "duplicateValue": "123 Main Street"
    }
  ]
}
```

- `conflicts`: Array of fields where the two companies differ. If there are no differences, `conflicts` is an empty array.
- Each conflict has: `field` (company attribute name), `valueType` (currently always `"string"`), `targetValue` (value on the target company), `duplicateValue` (value on the duplicate company).

**Error responses**

- `400` – Invalid params (e.g. not a valid UUID, or `targetId` equals `duplicateId`). Body: `{ "message": "Companies must not have the same ID" }` or validation errors.
- `404` – One or both company IDs do not exist. Body: `{ "message": "Companies with provided ids do not both exist" }`.

---

## POST `/api/companies/:targetId/merge/:duplicateId`

Performs the **merge**: reassociates all users and branches from the duplicate company to the target, updates the target company with the provided field values (resolving conflicts), then deletes the duplicate company. The operation runs in a transaction (all-or-nothing).

**Path parameters**

| Parameter     | Type   | Description                                                                 |
|---------------|--------|-----------------------------------------------------------------------------|
| `targetId`    | UUID   | ID of the company to **keep**.                                              |
| `duplicateId` | UUID   | ID of the duplicate company to merge in and then delete.                   |

**Request body (optional)**

All fields are optional. Include only the fields you want to set on the target company after the merge (e.g. to resolve conflicts from the preview). Omitted fields are left unchanged on the target.

| Field            | Type   | Description        |
|------------------|--------|--------------------|
| `name`           | string | Company name       |
| `address_line_1` | string | Address line 1     |
| `address_line_2` | string | Address line 2     |
| `state`          | string | State              |
| `city`           | string | City               |
| `postal_code`    | string | Postal code        |

Example:

```json
{
  "name": "Acme Corporation",
  "address_line_1": "123 Main Street",
  "address_line_2": "Suite 100",
  "city": "San Francisco",
  "state": "CA",
  "postal_code": "94102"
}
```

**Success response:** `200 OK`

Returns the merged business information

```json
{
  "name": "Acme Corporation",
  "address_line_1": "123 Main Street",
  "address_line_2": "Suite 100",
  "city": "San Francisco",
  "state": "CA",
  "postal_code": "94102"
}
```

**Error responses**

- `400` – Invalid path params (e.g. invalid UUID, or `targetId` equals `duplicateId`), or invalid body (e.g. non-string field). For validation: `{ "errors": [ ... ] }`; for same-ID: `{ "message": "Companies must not have the same ID" }`.
- `404` – One or both company IDs do not exist. Body: `{ "message": "Companies with provided ids do not both exist" }`.
- `500` – Server error. Body: `{ "message": "Internal server error" }`.

# Design Decisions and Omissions
## Design Decisions
- I decided to use PostgreSQL for the database as it supports generating UUIDs for the IDs.
- I excluded any `updated_at` or `created_at` fields in the database for migrations for simplicity. But I would create those if this were going to be a production level system.
- The current merging system does not take into account situations where you might have duplicate users and branches.

## Questions I came across as I was working on this project
- Are there any situations where a company might have multiple different addresses?