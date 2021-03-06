import {
  camelize,
  capitalize,
  classify,
  dasherize,
} from '@angular-devkit/core/src/utils/strings';
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
import { paths, titleify } from '../utils';
import * as fileExtensions from '../utils/file-extensions';

const stringUtils = {
  camelize,
  capitalize,
  classify,
  dasherize,
  titleify,
};

export default function(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    options = setupOptions(options);

    const rules = [createFiles(options)];

    return chain(rules)(tree, context);
  };
}

function setupOptions(options: any): any {
  try {
    const componentRE = /-?component$/i;
    let name = options.name.replace(componentRE, '').trim();

    if (name === '') {
      throw new Error(
        `Invalid component name: ${options.name}. Name it something other than "Component"`
      );
    }

    const dialogRE = /-?dialog$/i;
    name = options.name.replace(dialogRE, '').trim();

    if (name === '') {
      throw new Error(
        `Invalid dialog name: ${options.name}. Name it something other than "Dialog"`
      );
    }

    options.name = name;
    options.dialogName = name + '-dialog';
    options.dialogBodyName = options.dialogName + '-body';
  } catch (err) {
    throw new Error(`Invalid component name: ${options.name}`);
  }

  return options;
}

function createFiles(options: any): Rule {
  return mergeWith(
    apply(url('./files'), [
      template({
        ...fileExtensions,
        ...options,
        ...stringUtils,
      }),
      move(`${paths.componentsDir}/${dasherize(options.dialogName)}`),
    ])
  );
}
