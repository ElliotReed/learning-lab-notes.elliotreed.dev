---
date: 2024-12-17
title: ".NET"
categories: [".net"]
---

## Contents

## .NET Components

###  .NET Runtime (CLR - Common Language Runtime):

Executes .NET programs and manages memory, exception handling, and garbage collection.

### Class Libraries:

A set of pre-built libraries for common functionalities like file I/O, database access, and XML parsing.

### Languages:

Includes compilers and tools for C#, F#, and VB.NET.

### ASP.NET:

A framework for building web applications, REST APIs, and cloud-based services.

### Entity Framework (EF):

An Object-Relational Mapper (ORM) for database interactions.

### Windows Forms and WPF:

Tools for creating desktop applications with graphical user interfaces.

### Xamarin:

Used for building mobile applications for Android and iOS.


## Command Line Interface (CLI)

Access the cli with 

```console
dotnet
```

Usage:

```console
 dotnet [sdk-options] [command] [command-options] [arguments]
```

Example: 

```console
 dotnet new console -o ./CsharpProjects/TestProject 
```

## Testing

- xUnit (modern, popular)
- nUnit
- MSTest

### Install
 
    dotnet add package xunit
    dotnet add package Microsoft.NET.Test.Sdk
    dotnet add package xunit.runner.visualstudio

