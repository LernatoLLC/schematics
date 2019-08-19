import {
  camelize,
  capitalize,
  classify,
  dasherize,
} from '@angular-devkit/core/src/utils/strings';
import {
  apply,
  chain,
  filter,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addSymbolToNgModuleMetadata,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import * as ts from 'typescript';
import { getPackageVersion, paths, safeFileDelete } from '../../utils';
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
      deleteFiles(),
      ...createFiles(options),
      addDependenciesToPackageJson(),
      updateAngularJson(),
      addMaterialIconRegistryToAppModule(),
    ];

    return chain(rules)(tree, context);
  };
}

function deleteFiles(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    safeFileDelete(tree, paths.stylesScss);
    return tree;
  };
}

function createFiles(options: any): Rule[] {
  const rules: Rule[] = [];
  const files = url('./files');

  const tpl = template({
    ...fileExtensions,
    ...options,
    ...stringUtils,
  });

  const folders = ['src', 'src/styles', 'src/styles/material-overrides'];
  const fileMap = {
    src: ['styles__SCSS__', 'material__SCSS__'],
    'src/styles': [
      '_click-bounce__SCSS__',
      '_colors__SCSS__',
      '_fonts__SCSS__',
      '_globals__SCSS__',
      '_spacing__SCSS__',
    ],
    'src/styles/material-overrides': ['.gitkeep'],
  };

  folders.forEach(folder => {
    rules.push(
      mergeWith(
        apply(files, [
          filter(path => fileMap[folder].includes(path.replace('/', ''))),
          tpl,
          move(folder),
        ])
      )
    );
  });

  return rules;
}

function addDependenciesToPackageJson(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const dependencies = ['@fortawesome/fontawesome-free'];

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

function updateAngularJson(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const fileContents = tree.read(paths.angularJson);
    const text = fileContents != null ? fileContents.toString() : '';
    const json = JSON.parse(text);
    const projectName = json.defaultProject;
    const styles =
      json.projects[projectName].architect.build.options.styles || [];
    let i = styles.findIndex((s: string) => s === 'src/styles.scss');
    if (i > -1) {
      styles.splice(
        i,
        0,
        './node_modules/@fortawesome/fontawesome-free/css/all.min.css'
      );
      i += 1;
      styles.splice(i, 0, 'src/material.scss');
    }
    json.projects[projectName].architect.build.options.styles = styles;

    const angularJson = JSON.stringify(json, null, 2);
    tree.overwrite(paths.angularJson, angularJson);
    return tree;
  };
}

function addMaterialIconRegistryToAppModule(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    let source = getTsSourceFile(tree, paths.appModule);

    const importModule = 'MatIconModule, MatIconRegistry';
    const importPath = '@angular/material/icon';
    const importText = `MatIconModule`;
    const providersText = `MatIconRegistry`;

    if (!isImported(source, importModule, importPath)) {
      const change = insertImport(
        source,
        paths.appModule,
        importModule,
        importPath
      );
      if (change) {
        const recorder = tree.beginUpdate(paths.appModule);
        recorder.insertLeft(
          (change as InsertChange).pos,
          (change as InsertChange).toAdd
        );
        tree.commitUpdate(recorder);

        source = getTsSourceFile(tree, paths.appModule);
        let metadataChanges = addSymbolToNgModuleMetadata(
          source,
          paths.appModule,
          'imports',
          importText
        );
        if (metadataChanges) {
          const recorder = tree.beginUpdate(paths.appModule);
          metadataChanges.forEach((change: InsertChange) => {
            recorder.insertRight(change.pos, change.toAdd);
          });
          tree.commitUpdate(recorder);
        }

        source = getTsSourceFile(tree, paths.appModule);
        metadataChanges = addSymbolToNgModuleMetadata(
          source,
          paths.appModule,
          'providers',
          providersText
        );
        if (metadataChanges) {
          const recorder = tree.beginUpdate(paths.appModule);
          metadataChanges.forEach((change: InsertChange) => {
            recorder.insertRight(change.pos, change.toAdd);
          });
          tree.commitUpdate(recorder);
        }
      }
    }

    let buffer = tree.read(paths.appModule);
    if (!buffer) {
      throw new SchematicsException(
        `Could not read file (${paths.appModule}).`
      );
    }

    let contents = buffer.toString();
    const constructor = `
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('fas');
  }
`;
    contents = contents.replace(
      'export class AppModule { }',
      `export class AppModule {${constructor}}`
    );
    tree.overwrite(paths.appModule, contents);

    return tree;
  };
}

function getTsSourceFile(tree: Tree, path: string): ts.SourceFile {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not read file (${path}).`);
  }
  const content = buffer.toString();
  const source = ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  return source;
}
