#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import inquirer from "inquirer";
import chalk from "chalk";

import { capitalize, getCurrentDateString } from "./utils/functions.js";
import { NOTES_DIRECTORY } from "./utils/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function help() {
    const helpText = `
Learning Lab Notes CLI:

Options:
  -h, --help  print help
  -n, --note  create a new note, with prompts
`
    return helpText;
}

function noteTemplate(answer) {
    const { title, categories } = answer;

    const noteContent =
        `---
date: ${getCurrentDateString()}
title: "${capitalize(title)}"
categories: ["${categories.toLowerCase()}"]
---

`
    return noteContent;
}

(async function () {
    const args = process.argv.slice(2);

    if (args.includes('-h') || args.includes('--help')) {
        console.log(help());
    }

    if (args.includes('-n') || args.includes('--note')) {
        const answer = await inquirer.prompt([{
            type: 'input',
            message: 'What is the note title?',
            suffix: " (will be auto capitalized)",
            name: 'title',
        }, {
            type: "input",
            message: "What is/are the categories?",
            suffix: " (used in url, use one)",
            name: "categories",
        }])

        const filename = answer.title.toLowerCase().split(' ').join('-') + '.md';
        const filepath = path.join(NOTES_DIRECTORY, filename);

        if (fs.existsSync(filepath)) {
            console.log(chalk.red(`File at ${filepath} already exists.`));
            return
        }

        fs.writeFile(filepath, noteTemplate(answer), 'utf-8', (err) => {
            if (err) {
                console.log('err: ', err);
            }
            console.log(chalk.green(`${filename} was successfully created!`));
        });
    }
})();