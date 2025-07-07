---
date: 2025-02-26
title: "ASP.NET"
categories: [".net"]
---

## Contents

## API

### Version 9 sdk

Use **ASP.NET Core Web API** template.

Install **Scalar** package for in browser api tools (Swagger is deprecated, OpenApi  is used, Scalar maps to it).

https://localhost:7287/scalar/v1 will show the Scalar view (substitute the correct port).

## Entity Framework

Used to manage database.

### Tools

Install:

    dotnet tool install --global dotnet-ef

 Update:

    dotnet tool update --global dotnet-ef

### Migrations

Make sure your project has the EF Core Design package, which is needed for migrations. Run this command in your project directory:

    dotnet add package Microsoft.EntityFrameworkCore.Design

Add:

    dotnet ef migrations add InitialCreate

Run the migration:

    dotnet ef database update
