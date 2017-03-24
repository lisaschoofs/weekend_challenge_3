--create task table to store id, task, and task completion status
CREATE TABLE "tasks" (
	id SERIAL PRIMARY KEY,
	description VARCHAR(300),
	status BOOLEAN
);
