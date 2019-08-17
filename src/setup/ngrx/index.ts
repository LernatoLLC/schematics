import { apply, chain, forEach, mergeWith, Rule, SchematicContext, SchematicsException, template, url } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { addSymbolToNgModuleMetadata, insertImport, isImported } from "@schematics/angular/utility/ast-utils";
import { InsertChange } from "@schematics/angular/utility/change";
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from "@schematics/angular/utility/dependencies";
import * as ts from 'typescript';
import { exportFromFile, getPackageVersion, paths } from "../../utils";
import * as fileExtensions from '../../utils/file-extensions';

export default function (options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rules = [
      addNgrxDependenciesToPackageJson(),
      addLernatoDependenciesToPackageJson(),
      addAngularHttpToAppModule(),
      addLernatoToAppModule(),
      importStoreToAppModule(),
      addNgrxToAppModule(),
      addRouterStore(),
      createStoreIndexFile(),
    ];

    return chain(rules)(tree, context);
  };
}

function addNgrxDependenciesToPackageJson(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const dependencies = [
      '@ngrx/effects',
      '@ngrx/router-store',
      '@ngrx/store',
    ];

    dependencies.forEach(name => {
      const dep = <NodeDependency>{
        name,
        type: NodeDependencyType.Default,
        version: getPackageVersion(name),
      };
      addPackageJsonDependency(tree, dep);
    });

    context.addTask(new NodePackageInstallTask());

    return tree;
  };
}

function addLernatoDependenciesToPackageJson(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const dependencies = [
      '@lernato/common',
      '@lernato/common-angular',
    ];

    dependencies.forEach(name => {
      const dep = <NodeDependency>{
        name,
        type: NodeDependencyType.Default,
        version: getPackageVersion(name),
      };
      addPackageJsonDependency(tree, dep);
    });

    context.addTask(new NodePackageInstallTask());

    return tree;
  };
}

function addAngularHttpToAppModule(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    let source = getTsSourceFile(tree, paths.appModule);
    const importModule = 'HttpClient, HttpClientModule';
    const importPath =  '@angular/common/http';
    const importText = `HttpClientModule`;
    if (!isImported(source, importModule, importPath)) {
      const change = insertImport(source, paths.appModule, importModule, importPath);
      if (change) {
        const recorder = tree.beginUpdate(paths.appModule);
        recorder.insertLeft((change as InsertChange).pos, (change as InsertChange).toAdd);
        tree.commitUpdate(recorder);

        source = getTsSourceFile(tree, paths.appModule);
        const metadataChanges = addSymbolToNgModuleMetadata(source, paths.appModule, 'imports', importText);
        if (metadataChanges) {
          const recorder = tree.beginUpdate(paths.appModule);
          metadataChanges.forEach((change: InsertChange) => {
            recorder.insertRight(change.pos, change.toAdd);
          });
          tree.commitUpdate(recorder);
        }
      }
    }
    return tree;
  }
}

function addLernatoStore(tree: Tree): void {
  let source = getTsSourceFile(tree, paths.appModule);
  const importModule = 'ApiService, metaReducers, StoreModule';
  const importPath = '@lernato/common-angular';
  const importText = `StoreModule`;
  if (!isImported(source, importModule, importPath)) {
    const change = insertImport(source, paths.appModule, importModule, importPath);
    if (change) {
      const recorder = tree.beginUpdate(paths.appModule);
      recorder.insertLeft((change as InsertChange).pos, (change as InsertChange).toAdd);
      tree.commitUpdate(recorder);

      source = getTsSourceFile(tree, paths.appModule);
      const metadataChanges = addSymbolToNgModuleMetadata(source, paths.appModule, 'imports', importText);
      if (metadataChanges) {
        const recorder = tree.beginUpdate(paths.appModule);
        metadataChanges.forEach((change: InsertChange) => {
          recorder.insertRight(change.pos, change.toAdd);
        });
        tree.commitUpdate(recorder);
      }

      addLernatoProviders(tree);
    }
  }
}

function addLernatoProviders(tree: Tree): void {
  const providers = [
    '{ provide: ApiService, useClass: ApiService, deps: [ HttpClient ]}',
  ];
  providers.forEach(provider => {
    const source = getTsSourceFile(tree, paths.appModule);
    const metadataChanges = addSymbolToNgModuleMetadata(source, paths.appModule, 'providers', provider);
    if (metadataChanges) {
      const recorder = tree.beginUpdate(paths.appModule);
      metadataChanges.forEach((change: InsertChange) => {
        recorder.insertRight(change.pos, change.toAdd);
      });
      tree.commitUpdate(recorder);
    }
  });
}

function addNgrxToAppModule(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    addNgrxStore(tree);
    addNgrxRouter(tree);
    addNgrxEffects(tree);
    return tree;
  };
}

function addNgrxStore(tree: Tree): void {
  let source = getTsSourceFile(tree, paths.appModule);
  const importModule = 'StoreModule as NgrxStoreModule';
  const importPath = '@ngrx/store';
  const importText = `NgrxStoreModule.forRoot({} as any, {initialState: {}, metaReducers})`;
  if (!isImported(source, importModule, importPath)) {
    const change = insertImport(source, paths.appModule, importModule, importPath);
    if (change) {
      const recorder = tree.beginUpdate(paths.appModule);
      recorder.insertLeft((change as InsertChange).pos, (change as InsertChange).toAdd);
      tree.commitUpdate(recorder);

      source = getTsSourceFile(tree, paths.appModule);
      const metadataChanges = addSymbolToNgModuleMetadata(source, paths.appModule, 'imports', importText);
      if (metadataChanges) {
        const recorder = tree.beginUpdate(paths.appModule);
        metadataChanges.forEach((change: InsertChange) => {
          recorder.insertRight(change.pos, change.toAdd);
        });
        tree.commitUpdate(recorder);
      }
    }
  }
}

function addNgrxRouter(tree: Tree): void {
  let source = getTsSourceFile(tree, paths.appModule);
  const importModule = 'StoreRouterConnectingModule';
  const importPath = '@ngrx/router-store';
  const importText = `StoreRouterConnectingModule.forRoot()`;
  if (!isImported(source, importModule, importPath)) {
    const change = insertImport(source, paths.appModule, importModule, importPath);
    if (change) {
      const recorder = tree.beginUpdate(paths.appModule);
      recorder.insertLeft((change as InsertChange).pos, (change as InsertChange).toAdd);
      tree.commitUpdate(recorder);

      source = getTsSourceFile(tree, paths.appModule);
      const metadataChanges = addSymbolToNgModuleMetadata(source, paths.appModule, 'imports', importText);
      if (metadataChanges) {
        const recorder = tree.beginUpdate(paths.appModule);
        metadataChanges.forEach((change: InsertChange) => {
          recorder.insertRight(change.pos, change.toAdd);
        });
        tree.commitUpdate(recorder);
      }
    }
  }
}

function addNgrxEffects(tree: Tree): void {
  let source = getTsSourceFile(tree, paths.appModule);
  const importModule = 'EffectsModule';
  const importPath = '@ngrx/effects';
  const importText = `EffectsModule.forRoot([])`;
  if (!isImported(source, importModule, importPath)) {
    const change = insertImport(source, paths.appModule, importModule, importPath);
    if (change) {
      const recorder = tree.beginUpdate(paths.appModule);
      recorder.insertLeft((change as InsertChange).pos, (change as InsertChange).toAdd);
      tree.commitUpdate(recorder);

      source = getTsSourceFile(tree, paths.appModule);
      const metadataChanges = addSymbolToNgModuleMetadata(source, paths.appModule, 'imports', importText);
      if (metadataChanges) {
        const recorder = tree.beginUpdate(paths.appModule);
        metadataChanges.forEach((change: InsertChange) => {
          recorder.insertRight(change.pos, change.toAdd);
        });
        tree.commitUpdate(recorder);
      }
    }
  }
}

function addLernatoToAppModule(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    addLernatoStore(tree);
    return tree;
  };
}

function addRouterStore(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const source = url('./files');
    const rules = [template({
      ...fileExtensions,
      dot: '.',
    })];
    return mergeWith(
      apply(source, [
        ...rules,
        forEach((fileEntry) => {
          const path = `${paths.storeDir}/router${fileEntry.path}`;
          if (tree.exists(path)) {
            tree.overwrite(path, fileEntry.content);
          } else {
            tree.create(path, fileEntry.content);
          }
          return null;
        }),

      ]),
    )(tree, context);
  };
}

function importStoreToAppModule(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let source = getTsSourceFile(tree, paths.appModule);
    const importModule = 'STORE_MODULES';
    const importPath = './store';
    const importText = `...STORE_MODULES`;
    if (!isImported(source, importModule, importPath)) {
      const change = insertImport(source, paths.appModule, importModule, importPath);
      if (change) {
        const recorder = tree.beginUpdate(paths.appModule);
        recorder.insertLeft((change as InsertChange).pos, (change as InsertChange).toAdd);
        tree.commitUpdate(recorder);

        source = getTsSourceFile(tree, paths.appModule);
        const metadataChanges = addSymbolToNgModuleMetadata(source, paths.appModule, 'imports', importText);
        if (metadataChanges) {
          const recorder = tree.beginUpdate(paths.appModule);
          metadataChanges.forEach((change: InsertChange) => {
            recorder.insertRight(change.pos, change.toAdd);
          });
          tree.commitUpdate(recorder);
        }
      }
    }

    return tree;
  };
}

function createStoreIndexFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const file = `${paths.storeDir}/index.ts`;
    const options = { name: 'router' };
    exportFromFile(file, tree, options);
  };
}

function getTsSourceFile(tree: Tree, path: string): ts.SourceFile {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not read file (${path}).`);
  }
  const content = buffer.toString();
  const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);

  return source;
}
