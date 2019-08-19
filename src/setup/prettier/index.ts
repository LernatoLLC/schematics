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
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getPackageVersion, paths } from '../../utils';
import * as fileExtensions from '../../utils/file-extensions';

const stringUtils = {
  camelize,
  capitalize,
  classify,
  dasherize,
};

export default function(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rules = [
      createFiles(options),
      addDependenciesToPackageJson(),
      updateTsLintJson(),
    ];

    return chain(rules)(tree, context);
  };
}

function createFiles(options: any): Rule {
  const files = url('./files');

  const tpl = template({
    ...fileExtensions,
    ...options,
    ...stringUtils,
  });

  return mergeWith(apply(files, [tpl]));
}

function addDependenciesToPackageJson(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const dependencies = ['tslint-config-airbnb', 'tslint-config-prettier'];

    dependencies.forEach(name => {
      const dep = <NodeDependency>{
        name,
        type: NodeDependencyType.Dev,
        version: getPackageVersion(name),
      };
      addPackageJsonDependency(tree, dep);
    });

    context.addTask(new NodePackageInstallTask());

    return tree;
  };
}

function updateTsLintJson(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const fileContents = tree.read(paths.tslintJson);
    const text = fileContents != null ? fileContents.toString() : '';
    const json = JSON.parse(text);

    json.extends = [
      'tslint:recommended',
      'tslint-config-airbnb',
      'tslint-config-prettier',
    ];

    json.rules['arrow-parens'] = true;
    json.rules['interface-name'] = true;
    json.rules['max-classes-per-file'] = [true, 1, 'exclude-class-expressions'];
    json.rules['member-access'] = false;
    json.rules['no-consecutive-blank-lines'] = true;
    json.rules['no-require-imports'] = true;
    json.rules['object-literal-sort-keys'] = [true, 'ignore-case'];
    json.rules['ordered-imports'] = [
      true,
      {
        'import-sources-order': 'case-insensitive',
        'named-imports-order': 'case-insensitive',
      },
    ];
    json.rules['variable-name'] = { options: ['check-format', 'ban-keywords'] };

    delete json.rules['angular-whitespace'];
    delete json.rules['comment-format'];
    delete json.rules['curly'];
    delete json.rules['eofline'];
    delete json.rules['import-spacing'];
    delete json.rules['indent'];
    delete json.rules['max-line-length'];
    delete json.rules['no-trailing-whitespace'];
    delete json.rules['one-line'];
    delete json.rules['quotemark'];
    delete json.rules['semicolon'];
    delete json.rules['trailing-comma'];
    delete json.rules['typedef-whitespace'];

    const tslintJson = JSON.stringify(json, null, 2);
    tree.overwrite(paths.tslintJson, tslintJson);
    return tree;
  };
}
