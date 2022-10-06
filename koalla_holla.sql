DROP TABLE IF EXISTS "koalla";

CREATE TABLE "koalla" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(25),
	"age" INT, 
	"gender" VARCHAR(1),
	"notes" VARCHAR(100),
	"transfer" BOOLEAN DEFAULT FALSE);
	
	
INSERT INTO "koalla" ("name", "age", "gender", "notes", "transfer")
VALUES ('Scotty', 4, 'M', 'Born in Guatemala', FALSE);

	