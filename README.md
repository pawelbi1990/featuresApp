Reuirements to run the app properly:
1. PostgreSQL database set and running with 2 tables for users and features, DDLs:
 a. 
CREATE TABLE public.users (
	username varchar NULL,
	hash varchar NULL,
	id serial4 NOT NULL,
	client int2 NOT NULL DEFAULT 0,
	"session" varchar NULL,
	"admin" int2 NOT NULL DEFAULT 0,
	image varchar NULL
);
 b. 
CREATE TABLE public.features (
	"name" varchar NULL,
	short_desc varchar NULL,
	long_desc varchar NULL,
	id serial4 NOT NULL,
	image_path varchar NULL,
	client int2 NULL,
	assigned int4 NULL,
	task_id varchar(50) NULL DEFAULT NULL::character varying,
	clientname varchar(50) NULL
);

2. Environment variables:
 a. PGHOST - database host
 b. PGUSER - database user
 c. PGDATABASE - database name
 d. PGPASSWORD - database password
 e. PGPORT - database port
 f. JWT_KEY - key for Json Web Token
 g. API_KEY - Easy Redmine api key
 h. BASE_URL - base url for Easy Redmine instance
 i. STATUS_ID - value of the Easy Redmine status_id field, initial status which created task will have
 j. TRACKER_ID - value of the Easy Redmine tracker_id field, initial tracker which created task will have
 g. ASSIGNED_ID - optional, id of Easy Redmine custom field which will be updated with the assigned_to_id value (for example, "Team" custom field)
