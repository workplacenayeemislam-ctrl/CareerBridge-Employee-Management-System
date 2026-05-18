# Database Schema

This project uses Google Sheets as the database. Create one spreadsheet with separate sheets for each module.

## Sheets and Columns

### `Users`

- `userId` — unique user token
- `email` — login email
- `passwordHash` — hashed password value or placeholder
- `role` — `admin`, `hr`, `operations`, `marketing`, `support`, `placement`
- `fullName`
- `department`
- `createdAt`
- `status`

### `Employees`

- `employeeId`
- `firstName`
- `lastName`
- `email`
- `department`
- `role`
- `hireDate`
- `status`
- `phone`
- `location`
- `manager`
- `notes`

### `Attendance`

- `recordId`
- `employeeId`
- `date`
- `status`
- `checkIn`
- `checkOut`
- `notes`

### `Tasks`

- `taskId`
- `title`
- `description`
- `assignedTo`
- `department`
- `priority`
- `status`
- `dueDate`
- `createdAt`

### `Leaves`

- `leaveId`
- `employeeId`
- `startDate`
- `endDate`
- `type`
- `reason`
- `status`
- `approval`

### `Reports`

- `reportId`
- `name`
- `type`
- `createdAt`
- `details`

### `Departments`

- `departmentId`
- `name`
- `manager`
- `description`

## Notes

- Use string IDs for compatibility with Sheets.
- Keep the first row as headings.
- Treat each sheet like a database table.
