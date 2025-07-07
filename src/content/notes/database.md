---
title: "Database"
date: 2024-01-08
categories: ["database"]
---

## Contents

## Id

[Dev.to article](https://dev.to/harshhhdev/uuidguid-cuid-nanoid-whats-the-difference-5dj1)

### Sequence

Short and sweet, integer.

### UUID

Universally unique identifier, is a 128 bit label. The probability that an ID will be replicated *ANYWHERE* else is near zero.

123e4567-e89b-12d3-a456-426614174000.

They take up a lot of space in a URL: api.planetscale.com/v1/deploy-requests/7cb776c5-8c12-4b1a-84aa-9941b815d873

### CUID

It found no collisions on 100 million iterations!

Prisma ORM, the Prisma schema (in relational databases) can generate both either a CUID or UUID.

### NanoID

tiny (only 130 bytes minified and gzipped), fast (x2 faster than UUID), safe, short, and portable.

With an ID length of 15 characters (pretty short and sweet), and a generation of 1,000 IDs every hour, it'll take a mind boggling 569 thousand years for it to have a 1% probability of a single collision. Now if we switch that to 1000 IDs being generated every single second, it'd still take around 158 for it to have a 1% probability of at least a single collision.

 > For most cases, I believe the best option is NanoID due to the fact that it's insanely customisable whilst being performant. It's slowly but surely taking over uuidv4, if we look at this npm trends comparison between the three. In the context of Prisma, the built-in CUID is perhaps the best choice.

## Hosting Providers

- [Supabase](https://supabase.com)
  - $0, Limit of 2 free organizations, pause after 1 week.

### Postgres instance

- [Railway](https://railway.app/)
  - $5,
- [Heroku](https://www.heroku.com/postgres)
- [Digital Ocean](https://www.digitalocean.com/products/managed-databases)
- [AWS](https://aws.amazon.com/rds/postgresql/)

## Databases

### postgress

#### psql

 To run psql:

 ```console
 psql -U <postgres user>
 ```

After logging in to psql, you'll see the postgres-# prompt, indicating that you're connected to the PostgreSQL server without being connected to any specific database.

With the server prompt, create a database with SQL:

```bash
CREATE DATABASE database_name
```

To specify a database at this prompt, use the \c or \connect command followed by the name of the database you want to connect to. For example, to connect to a database named my_database, you would run:

```bash
\c my_database
```

You can specify other arguments in the initial connection statement

 ```bash
 psql -U username -d database_name -h hostname -p port
 ```

hostname and port are probably set to defaults, so:

 ```bash
 psql -U username -d database_name
 ```

The "-U" sets the cli to ask for the postgres user, otherwise it assumes the system user.

In local development the postgres user has been set to "postgres"

Then the cli asks for the password for user "postgres"

In local development the password has been set to "postgres"

##### Commands

- ```\dt``` to list tables

- ```\q``` to quit
