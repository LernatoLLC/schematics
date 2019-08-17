import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { paths } from '../utils';



const collectionPath = path.join(__dirname, '../collection.json');

describe('store', () => {
  it('generates the expected store files and the store-state model', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('store', { name: 'test-store' }, Tree.empty());

    expect(tree.files).toEqual([
      `/${paths.storeDir}/index.ts`,
      `/${paths.storeDir}/test/test.store.actions.spec.ts`,
      `/${paths.storeDir}/test/test.store.actions.ts`,
      `/${paths.storeDir}/test/test.store.effects.spec.ts`,
      `/${paths.storeDir}/test/test.store.effects.ts`,
      `/${paths.storeDir}/test/test.store.module.ts`,
      `/${paths.storeDir}/test/test.store.reducers.spec.ts`,
      `/${paths.storeDir}/test/test.store.reducers.ts`,
      `/${paths.storeDir}/test/test.store.service.spec.ts`,
      `/${paths.storeDir}/test/test.store.service.ts`,
      `/${paths.storeDir}/test/index.ts`,
      `/${paths.modelsDir}/index.ts`,
      `/${paths.modelsDir}/test-store-state/test-store-state.model.spec.ts`,
      `/${paths.modelsDir}/test-store-state/test-store-state.model.ts`,
      `/${paths.modelsDir}/test-store-state/index.ts`,
    ]);
  });
});
