# Task Management

This repository consists of two projects:

## Installation Backend

Install Postgres SQL

1 Create a new Database called task, run this script:

```bash
CREATE TABLE public.task (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	title varchar NOT NULL,
	description varchar NOT NULL,
	completed bool NULL,
	creationdate timestamptz NULL,
	creation_date timestamptz(6) NULL,
	startat timestamptz(6) NULL,
	tags varchar(255) NULL
);
--DATA
INSERT INTO public.task (title, description, completed, creationdate, creation_date, startat, tags)
VALUES
  ('Task 1', 'Description for Task 1', false, '2024-02-29T10:00:00Z', '2024-02-29T10:30:00Z', '2024-03-01T08:00:00Z', 'Tag1,Tag2'),
  ('Task 2', 'Description for Task 2', true, '2024-02-29T11:15:00Z', '2024-02-29T11:45:00Z', '2024-03-01T09:30:00Z', 'Tag3,Tag4'),
  ('Task 3', 'Description for Task 3', false, '2024-02-29T12:30:00Z', '2024-02-29T13:00:00Z', '2024-03-02T10:45:00Z', 'Tag1,Tag5'),
  ('Task 4', 'Description for Task 4', true, '2024-02-29T14:45:00Z', '2024-02-29T15:15:00Z', '2024-03-02T12:00:00Z', 'Tag2,Tag4'),
  ('Task 5', 'Description for Task 5', false, '2024-02-29T16:00:00Z', '2024-02-29T16:30:00Z', '2024-03-03T14:15:00Z', 'Tag3,Tag5'),
  ('Task 6', 'Description for Task 6', true, '2024-02-29T17:15:00Z', '2024-02-29T17:45:00Z', '2024-03-03T16:30:00Z', 'Tag1,Tag4'),
  ('Task 7', 'Description for Task 7', false, '2024-02-29T18:30:00Z', '2024-02-29T19:00:00Z', '2024-03-04T18:45:00Z', 'Tag2,Tag5'),
  ('Task 8', 'Description for Task 8', true, '2024-02-29T20:45:00Z', '2024-02-29T21:15:00Z', '2024-03-04T20:00:00Z', 'Tag3,Tag4'),
  ('Task 9', 'Description for Task 9', false, '2024-02-29T22:00:00Z', '2024-02-29T22:30:00Z', '2024-03-05T10:15:00Z', 'Tag1,Tag2'),
  ('Task 10', 'Description for Task 10', true, '2024-02-29T23:15:00Z', '2024-02-29T23:45:00Z', '2024-03-05T12:30:00Z', 'Tag4,Tag5');
```
2 Please config 2 env var USER_DATABASE and PASSWORD_DATABASE

3 Please run task-backend-api on your favorite IDE

## Installation Front end

1 Load the front-end project on your favorite IDE for front-end

2 Run with command

```
ng serve
```

## Autor

Milton Corvera
