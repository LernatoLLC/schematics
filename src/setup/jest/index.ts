import {
  apply,
  chain,
  forEach,
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
import { getPackageVersion, paths, safeFileDelete } from '../../utils';

export default function(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rules = [
      deleteFiles(),
      updatePackageJson(),
      addJestDependenciesToPackageJson(),
      updateTsConfig(),
      updateAngularJson(),
      addJestConf(),
    ];

    return chain(rules)(tree, context);
  };
}

function deleteFiles(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    safeFileDelete(tree, paths.karmaConf);
    safeFileDelete(tree, paths.testTs);
    return tree;
  };
}

function updatePackageJson(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const fileContents = tree.read(paths.packageJson);
    let text = fileContents != null ? fileContents.toString() : '';
    text = text.replace(/~/g, '').replace(/\^/g, '');
    const json = JSON.parse(text);

    const removeDevDeps = Object.keys(json.devDependencies).filter((d) =>
      d.includes('karma')
    );

    removeDevDeps.forEach((d) => {
      delete json.devDependencies[d];
    });

    json.scripts['test:cov'] = 'ng test --coverage';

    const packageJson = JSON.stringify(json, null, 2);
    tree.overwrite(paths.packageJson, packageJson);
    return tree;
  };
}

function addJestDependenciesToPackageJson(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const dependencies = [
      'jest',
      'jest-cli',
      'ts-jest',
      '@types/jest',
      '@angular-builders/jest',
    ];

    dependencies.forEach((name) => {
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

function updateTsConfig(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    updateTsConfigAppJson(tree);
    updateTsConfigSpecJson(tree);
    return tree;
  };
}

function updateTsConfigAppJson(tree: Tree) {
  const fileContents = tree.read(paths.tsconfigAppJson);
  const text = fileContents != null ? fileContents.toString() : '';
  const json = JSON.parse(text);
  const tsconfigAppJson = JSON.stringify(json, null, 2);
  tree.overwrite(paths.tsconfigAppJson, tsconfigAppJson);
}

function updateTsConfigSpecJson(tree: Tree) {
  const fileContents = tree.read(paths.tsconfigSpecJson);
  const text = fileContents != null ? fileContents.toString() : '';
  const json = JSON.parse(text);
  json.compilerOptions.allowJs = true;
  json.compilerOptions.module = 'commonjs';
  json.compilerOptions.types = ['jest'];
  json.files = json.files.filter((d) => d !== 'src/test.ts');
  const tsconfigSpecJson = JSON.stringify(json, null, 2);
  tree.overwrite(paths.tsconfigSpecJson, tsconfigSpecJson);
}

function updateAngularJson(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const fileContents = tree.read(paths.angularJson);
    const text = fileContents != null ? fileContents.toString() : '';
    const json = JSON.parse(text);
    const projectName = json.defaultProject;

    json.projects[projectName].architect.test = {
      builder: '@angular-builders/jest:run',
      options: {},
    };

    // these are my personal preference - feel free to comment them out
    json.projects[projectName].architect.lint.options.format = 'stylish';
    json.projects[projectName].architect.lint.options.force = true;
    json.projects[projectName].architect.e2e.options.port = 4299;

    const angularJson = JSON.stringify(json, null, 2);
    tree.overwrite(paths.angularJson, angularJson);
    return tree;
  };
}

function addJestConf(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const source = url('./files');
    const rules = [template({ dot: '.' })];
    return mergeWith(
      apply(source, [
        ...rules,
        forEach((fileEntry) => {
          const path = `${fileEntry.path}`;
          if (tree.exists(path)) {
            tree.overwrite(path, fileEntry.content);
          } else {
            tree.create(path, fileEntry.content);
          }
          return null;
        }),
      ])
    )(tree, _context);
  };
}
