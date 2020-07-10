# telegram-analyzer-web

Live example: https://phucky.github.io/telegram-analyzer-web/

I have extracted the messages from the telegram channels listed below and put them into a format that is easy to handle. This data is fed into a search engine on the client side (on your computer).
The search engine now returns all messages of the selected channels chronologically and generates a bar chart to have an overview.
But this could led to slow performance on low computers and also to performance holes when big data sizes are computed.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

Extended Search
This form of advanced searching allows you to fine-tune results.

White space acts as an AND operator, while a single pipe (|) character acts as an OR operator.

Token	Match type	Description
jscript	fuzzy-match	Items that match jscript
'python	exact-match	Items that include python
!ruby	inverse-exact-match	Items that do not include ruby
^java	prefix-exact-match	Items that start with java
!^earlang	inverse-prefix-exact-match	Items that do not start with earlang
.js$	suffix-exact-match	Items that end with .js
!.go$	inverse-suffix-exact-match	Items that do not end with .go

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
