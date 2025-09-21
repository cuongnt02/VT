CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" varchar(200) NOT NULL,
	"password_salt" varchar(20) NOT NULL,
	CONSTRAINT "username_min_length_check" CHECK (length("users"."username") > 2)
);
