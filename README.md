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