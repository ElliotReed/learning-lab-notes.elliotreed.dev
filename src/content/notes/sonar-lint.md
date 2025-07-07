---
date: 2024-01-18
title: "Sonar Lint"
categories: ["linter"]
---

## Contents

[Taken from "baeldung.com/sonar-exclude-violations"](https://www.baeldung.com/sonar-exclude-violations)

## Disable In Line

Using //NOSONAR

We can disable a single line of code by putting a //NOSONAR at the end:

```c
System.out.println(
  LocalDateTime.now()
    .toString() + " " + str); //NOSONAR lightweight logging
```

## Disable Using @SuppressWarnings

@SuppressWarnings

```java
@SuppressWarnings("java:S106")
public void printStringToConsoleWithDate(String str) {
    System.out.println(LocalDateTime.now().toString() + " " + str);
}
```

## Disable In Project

Create a file *sonar-project.properties*.

```shell
sonar.issue.ignore.multicriteria=e1,e2

# Console usage - ignore a single class
sonar.issue.ignore.multicriteria.e1.ruleKey=java:S106
sonar.issue.ignore.multicriteria.e1.resourceKey=**/SonarExclude.java
# Too many parameters - ignore the whole package
sonar.issue.ignore.multicriteria.e2.ruleKey=java:S107
sonar.issue.ignore.multicriteria.e2.resourceKey=com/baeldung/sonar/*.java
```
