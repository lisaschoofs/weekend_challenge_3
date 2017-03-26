--create task table to store id, task, and task completion status
CREATE TABLE "tasks" (
	id SERIAL PRIMARY KEY,
	description VARCHAR(300),
	status BOOLEAN
);

--fills table with some dummy info to start with
INSERT INTO "tasks" ("description", "status")
VALUES ('do dishes', TRUE), ('grocery shopping', TRUE),
('check mail', TRUE), ('do taxes', TRUE);
