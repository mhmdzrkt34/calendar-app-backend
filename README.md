# Sequelize Migrations

## Create a New Migration

Generate a new migration file:

```bash
npx sequelize-cli migration:generate --name create-users-table
```

Example:

```bash
npx sequelize-cli migration:generate --name add-status-to-tasks
```

This will create a file inside:

```text
src/migrations/
```

Example:

```text
20260606120000-create-users-table.js
```

---

## Migration Structure

Example migration:

```javascript
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Users");
  },
};
```

* `up()` is executed when applying the migration.
* `down()` is executed when rolling back the migration.

---

## Execute All Pending Migrations

```bash
npx sequelize-cli db:migrate
```

This command executes all migrations that have not yet been applied.

---

## Roll Back Last Migration

```bash
npx sequelize-cli db:migrate:undo
```

---

## Roll Back All Migrations

```bash
npx sequelize-cli db:migrate:undo:all
```

---

## Check Migration Status

Sequelize stores executed migrations in the table:

```text
SequelizeMeta
```

Each executed migration is recorded in this table to prevent duplicate execution.

---

## Common Workflow

1. Create migration

```bash
npx sequelize-cli migration:generate --name add-priority-to-tasks
```

2. Implement migration logic in the generated file.

3. Execute migration

```bash
npx sequelize-cli db:migrate
```

4. Verify database changes.

5. Commit migration file to source control.

---

## Notes

* Migration files should always be committed to Git.
* Never modify an already executed migration in production.
* Create a new migration for every database change.
* The execution order is determined by the migration file timestamp.
