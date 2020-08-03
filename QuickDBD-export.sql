-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "daily_data" (
    "id" INT   NOT NULL,
    "date" DATE   NOT NULL,
    "production(kWh)" FLOAT   NOT NULL,
    "specific_prod(kWh/kWp)" FLOAT   NOT NULL,
    "uvIndex" FLOAT   NOT NULL,
    "sunHour" FLOAT   NOT NULL,
    "cloudcover" FLOAT   NOT NULL,
    "maxtempC" FLOAT   NOT NULL,
    "mintempC" FLOAT   NOT NULL,
    "precipitation" FLOAT   NOT NULL,
    "sunrise" VARCHAR   NOT NULL,
    "sunset" VARCHAR   NOT NULL,
    CONSTRAINT "pk_daily_data" PRIMARY KEY (
        "id","date"
     )
);

CREATE TABLE "sites" (
    "id" INT   NOT NULL,
    "azimuth" INT   NOT NULL,
    "tilt" INT   NOT NULL,
    "capacity(kWp)" FLOAT   NOT NULL,
    "lat" FLOAT   NOT NULL,
    "lon" FLOAT   NOT NULL,
    CONSTRAINT "pk_sites" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "daily_data" ADD CONSTRAINT "fk_daily_data_id" FOREIGN KEY("id")
REFERENCES "sites" ("id");

