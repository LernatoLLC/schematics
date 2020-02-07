import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { exportFromFile, paths } from '../utils';
import * as fileExtensions from '../utils/file-extensions';

const stringUtils = {
  classify,
  dasherize,
};

export default function(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    options = setupOptions(options);

    const rules = [exportIndexFile(options), createFiles(options)];

    return chain(rules)(tree, context);
  };
}

function setupOptions(options: any): any {
  try {
    const re = /-?model$/i;
    const name = options.name.replace(re, '').trim();

    if (name === '') {
      throw new Error(
        `Invalid model name: ${options.name}. Name it something other than "Model"`
      );
    } else {
      options.name = name;
    }
  } catch (err) {
    throw new Error(`Invalid model name: ${options.name}`);
  }

  return options;
}

function exportIndexFile(options: any): Rule {
  return (tree: Tree) => {
    const filePath = `${paths.modelsDir}/index.ts`;
    exportFromFile(filePath, tree, options);
  };
}

function createFiles(options: any): Rule {
  return mergeWith(
    apply(url('./files'), [
      template({
        ...fileExtensions,
        ...options,
        ...stringUtils,
      }),
      move(`${paths.modelsDir}/${dasherize(options.name)}`),
    ])
  );
}
