# 🦸🏻‍♀️ Superheroes 🦸🏻‍♂️

This project is a web application built using Angular v17 [Angular CLI](https://github.com/angular/angular-cli), Node.js v20, and IndexedDB to manage a database of Marvel superheroes.

## 🚀 Features

List of Marvel Heroes:

- The application displays a paginated table of Marvel superheroes.
- Users can search and sort the table by various attributes (e.g., name, gender, citizenship, skills, occupation, member of, creator).

Create, View, Edit, and Delete Heroes:

- Users can create new superhero entries.
- Users can view the details of a selected superhero.
  the license
- Users can view the details of a selected superhero.
- Users can edit the information of an existing superhero.
- Users can delete a superhero from the database.

Metrics:

- The application displays metrics (e.g., count, average) for each column in the table at the top of the table.
- These metrics are built using D3.js.

## 📦 App Architecture

| Name        | Description                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| **core**    | Core global logic accesible and blocks enables from start, part of the initial bundles size |
| **feature** | Main feauteres in the app include components, injectors, pipes...                           |
| **layout**  | Layouts where we are going to display specific lazy load features                           |
| **pattern** | Reusable features bound to a especific data source                                          |
| **ui**      | UI Components lib                                                                           |

## 🤖 IndexedDB

By default superheroes app get all heroes from **assets/data/wikipedia_marvel_data.json** and after first load the data is stored in indexedDB db. The name is **WYSIWYG mode**. If you want to reload the data, please go to **Application > IndexedDB > marvel-db** and click Delete database.

## 📌 Getting Started

- Node.js v18 or higher
- Angular CLI v17 or higher

Fork `main` branch into your personal repository. Clone it to local computer. Install node modules. Before starting development, you should check if there are any errors.

```sh
$ git clone https://github.com/{your-personal-repo}/tui.editor.git
$ npm install
$ npm run start
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
