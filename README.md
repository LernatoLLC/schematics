# Install

    npm i @lernato/schematics

# Schematics

## setup-jest

    ng generate @lernato/schematics:setup-jest

### Parameters

No parameters.

### Description

Replace Karma with Jest as the unit test framework in a standard Angular project.

Uninstalls Karma and installs Jest.

Deletes `src/karma.conf.js` and `src/test.ts`

Creates `src/jest.config.js`

## setup-prettier

    ng generate @lernato/schematics:setup-prettier

### Parameters

No parameters.

### Description

Add the prettier code formatter to your project.
Also modifies tslint.json.
Totally opinionated - you might not agree with it, so don't use it if you don't like it.

Creates `prettier.config.js`

## setup-styles

    ng generate @lernato/schematics:setup-styles

### Parameters

No parameters.

### Description

Add some default styles to your project.
Also creates an angular material theme file, and imports it into your html via your angular.json file.

Overwrites `src/styles.scss`

Generates the following files

- src/material.scss
- src/styles/
  - material-overrides/
    - gitkeep
  - \_colors.scss
  - \_fonts.scss
  - \_globals.scss
  - \_spacing.scss

## setup-project

    ng generate @lernato/schematics:setup-project

### Parameters

No parameters.

### Description

Calls the other setup schematics

- setup-jest
- setup-prettier
- setup-styles

## component

    ng generate @lernato/schematics:component -n <component-name> -p <html-prefix>

### Parameters

|              |         |                |                                             |
| ------------ | ------- | -------------- | ------------------------------------------- |
| --name, -n   | string  | REQUIRED       | The name of the component.                  |
| --prefix, -p | string  | REQUIRED       | The html element prefix for your component. |
| --module, -m | boolean | default: true  | Create a module for the component.          |
| --route, -r  | boolean | default: false | Create a routable module for the component. |

### Description

Generate an Angular component.
Places files in `src/app/components`.

Generates the following files

- src/app/components/&lt;component-name&gt;
  - index.ts
  - &lt;component-name&gt;.component.html
  - &lt;component-name&gt;.component.scss
  - &lt;component-name&gt;.component.spec.ts
  - &lt;component-name&gt;.component.ts

If `module` or `route` are set, it also generates a module file at:

`src/app/components/<component-name>/<component-name>.module.ts`

## dialog

    ng generate @lernato/schematics:dialog  -n <dialog-name> -p <html-prefix>

### Parameters

|              |        |          |                                          |
| ------------ | ------ | -------- | ---------------------------------------- |
| --name, -n   | string | REQUIRED | The name of the dialog.                  |
| --prefix, -p | string | REQUIRED | The html element prefix for your dialog. |

### Description

Generate an Angular Material dialog component.
Places files in `src/app/components`.

Generates the following files

- src/app/components/&lt;dialog-name&gt;-dialog
  - index.ts
  - &lt;dialog-name&gt;-dialog-body.component.html
  - &lt;dialog-name&gt;-dialog-body.component.scss
  - &lt;dialog-name&gt;-dialog-body.component.spec.ts
  - &lt;dialog-name&gt;-dialog-body.component.ts
  - &lt;dialog-name&gt;-dialog.component.html
  - &lt;dialog-name&gt;-dialog.component.scss
  - &lt;dialog-name&gt;-dialog.component.spec.ts
  - &lt;dialog-name&gt;-dialog.component.ts
  - &lt;dialog-name&gt;-dialog.module.ts

## model

    ng generate @lernato/schematics:model -n <model-name>

### Parameters

|            |        |          |                         |
| ---------- | ------ | -------- | ----------------------- |
| --name, -n | string | REQUIRED | The name of the dialog. |

### Description

Generate a model, with unit tests, and automatically add it to the exports from `src/app/models/index.ts`

Creates `src/app/models/index.ts` if it does not already exist.

Places files in `src/app/models`.

Generates the following files

- src/app/models/&lt;model-name&gt;
  - index.ts
  - &lt;model-name&gt;.model.spec.ts
  - &lt;model-name&gt;.model.ts

## service

    ng generate @lernato/schematics:service -n <service-name>

### Parameters

|            |        |          |                         |
| ---------- | ------ | -------- | ----------------------- |
| --name, -n | string | REQUIRED | The name of the dialog. |

### Description

Generate an Angular service, with unit tests, and automatically add it to the exports from `src/app/services/index.ts`

Creates `src/app/services/index.ts` if it does not already exist.

Places files in `src/app/services`.

Generates the following files

- src/app/services/&lt;service-name&gt;
  - index.ts
  - &lt;service-name&gt;.service.spec.ts
  - &lt;service-name&gt;.service.ts
