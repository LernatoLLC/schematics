import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { paths } from '../utils';

const collectionPath = path.join(__dirname, '../collection.json');

describe('model', () => {
  it('generates the expected model files', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic(
      'model',
      { name: 'test-model' },
      Tree.empty()
    );

    expect(tree.files).toEqual([
      `/${paths.modelsDir}/index.ts`,
      `/${paths.modelsDir}/test/test.model.spec.ts`,
      `/${paths.modelsDir}/test/test.model.ts`,
      `/${paths.modelsDir}/test/index.ts`,
    ]);
  });
});
