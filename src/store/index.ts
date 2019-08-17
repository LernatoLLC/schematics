import { camelize, capitalize, classify, dasherize, underscore } from '@angular-devkit/core/src/utils/strings';
import { apply, chain, mergeWith, move, Rule, schematic, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { allcapsify, paths, titleify, warningMessage } from '../utils';
import * as fileExtensions from '../utils/file-extensions';

const stringUtils = {
  allcapsify,
  camelize,
  capitalize,
  classify,
  dasherize,
  titleify,
  underscore
};

export default function (options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    options = setupOptions(options);
    const modelOptions = setupModelOptions(options);

    const rules = [
      exportIndexFile(options),
      createFiles(options),
      addModel(modelOptions),
    ];

    return chain(rules)(tree, context);
  };
}

function setupOptions(options: any): any {
  try {
    const re = /-?store$/i;
    const name = options.name.replace(re, '').trim();

    if (name === '') {
      throw new Error(`Invalid store name: ${options.name}. Name it something other than "Store"`);
    } else {
      options.name = name;
    }

  } catch (err) {
    throw new Error(`Invalid store name: ${options.name}`);
  }

  return options;
}

function setupModelOptions(options: any): any {
  const modelOptions = Object.assign({}, options);
  modelOptions.name = `${modelOptions.name}-store-state`
  return modelOptions;
}

function exportIndexFile(options: any): Rule {
  return (tree: Tree) => {
    const filePath = `${paths.storeDir}/index.ts`;
    const fileContents = tree.read(filePath);

    if (fileContents == null) {
      tree.create(filePath, createIndexFile(options));
    } else {
      const updatedFileContents = getUpdatedFileContents(fileContents.toString(), dasherize(options.name));
      tree.overwrite(filePath, updatedFileContents);
    }
  };
}

function createIndexFile(options: any) {
  const text = `${warningMessage}export * from './${dasherize(options.name)}';

import { ${classify(options.name)}StoreModule } from './${dasherize(options.name)}';

export const STORE_MODULES = [
  ${classify(options.name)}StoreModule
];
`;
  return text;
}

function getUpdatedFileContents(fileContents: string, name: string): string {
  const lines = fileContents.split('\n');
  const exports = getExports(lines, name);
  const imports = getImports(lines, name);

  let updatedFileContents = `${warningMessage}`;

  for (const exp of exports) {
    updatedFileContents += `export * from './${exp}';\n`;
  }

  updatedFileContents += '\n';

  for (const imp of imports) {
    updatedFileContents += `import { ${classify(imp)}StoreModule } from './${imp}';\n`;
  }

  updatedFileContents += '\nexport const STORE_MODULES = [\n';

  for (const imp of imports) {
    updatedFileContents += `  ${classify(imp)}StoreModule,\n`;
  }

  updatedFileContents += '];\n';

  return updatedFileContents;
}

function getExports(lines: string[], name: string): string[] {
  let exports = lines
    .filter(l => l.includes('export') && l.includes('from'))
    .map(l => l
      .replace(/[\s\S]*['"]\.\//, '')
      .replace(/['"];?[\s]*$/, ''));

  if (exports.indexOf(name) === -1) {
    exports.push(name);
  }

  exports.sort((a: string, b: string) => a.localeCompare(b));

  return exports;
}

function getImports(lines: string[], name: string): string[] {
  let imports = lines
    .filter(l => l.includes('import') && l.includes('from'))
    .map(l => l
      .replace(/[\s\S]*['"]\.\//, '')
      .replace(/['"];?[\s]*$/, ''));

  if (imports.indexOf(name) === -1) {
    imports.push(name);
  }

  imports.sort((a: string, b: string) => a.localeCompare(b));

  return imports;
}

function addModel(options: any): Rule {
  return schematic('model', options)
}

function createFiles(options: any): Rule {
  return mergeWith(
    apply(
      url('./files'),
      [
        template({
          ...fileExtensions,
          ...options,
          ...stringUtils,
        }),
        move(`${paths.storeDir}/${dasherize(options.name)}`)
      ]
    ));
}
