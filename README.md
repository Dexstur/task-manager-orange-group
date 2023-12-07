# task-manager-orange-group

## TASK MANAGER API

### BUILD

1. Run the following commands to set up and start the server:

   - `yarn` to install all packages
   - `yarn build` to create the required scripts in the `dist` folder
   - `yarn start` to run the server (default port is 3000 unless specified otherwise in `.env`)

   (Note: Any other package manager can be used)

### CRUD Documentation

---

#### Operation: Create Task

- **URL:** "/tasks"
- **Method:** POST
- **Example:**
  ```json
  {
    "title": "Title example",
    "description": "Description example"
  }
  ```

---

#### Operation: View Tasks (READ)

- **URL:** "/tasks"
- **Method:** GET
- **Query:** status: optional("completed" for completed tasks, "pending" for pending tasks), all tasks are shown if no query is provided

---

#### Operation: View Task (READ)

- **URL:** "/tasks/{id}"
- **Method:** GET
  Reads a singular task when the id is provided

---

#### Operation: Update Task

- **URL:** "/tasks/{id}"
- **Method:** PUT
- **Example:**
  ```json
  {
    "title": "Example title",
    "description": "Example description"
  }
  ```

updates a task with given id (note: At least one of title or description must be provided)

---

#### Operation: Status Change

- **URL:** "/tasks/{id}"
- **Method:** PATCH
  changes status of task with given id from PENDING to COMPLETED or vice versa

---

#### Opearation: Delete Task

- **URL:** "/tasks/{id}"
- **Method:** DELETE

deletes task with given id

---

#### Operation: Get mock data (READ)

- **URL:** "/mock/{id}"
- **Method:** GET

fetch todo from JSONPlaceholder. ID must be between 1 and 200
