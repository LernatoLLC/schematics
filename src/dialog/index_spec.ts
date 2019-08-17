import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { paths } from '../utils';

const collectionPath = path.join(__dirname, '../collection.json');

describe('dialog', () => {

  it('generates the expected files when not given -dialog', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('dialog', { name: 'test', prefix: 'tst' }, Tree.empty());

    expect(tree.files).toEqual([
      `/${paths.componentsDir}/test-dialog/test-dialog-body.component.spec.ts`,
      `/${paths.componentsDir}/test-dialog/test-dialog-body.component.html`,
      `/${paths.componentsDir}/test-dialog/test-dialog-body.component.scss`,
      `/${paths.componentsDir}/test-dialog/test-dialog-body.component.ts`,
      `/${paths.componentsDir}/test-dialog/test-dialog.component.spec.ts`,
      `/${paths.componentsDir}/test-dialog/test-dialog.component.html`,
      `/${paths.componentsDir}/test-dialog/test-dialog.component.scss`,
      `/${paths.componentsDir}/test-dialog/test-dialog.component.ts`,
      `/${paths.componentsDir}/test-dialog/test-dialog.module.ts`,
      `/${paths.componentsDir}/test-dialog/index.ts`,
    ]);
  });

  it('generates the expected files when given -dialog', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('dialog', { name: 'test-dialog', prefix: 'tst' }, Tree.empty());

    expect(tree.files).toEqual([
      `/${paths.componentsDir}/test-dialog/test-dialog-body.component.spec.ts`,
      `/${paths.componentsDir}/test-dialog/test-dialog-body.component.html`,
      `/${paths.componentsDir}/test-dialog/test-dialog-body.component.scss`,
      `/${paths.componentsDir}/test-dialog/test-dialog-body.component.ts`,
      `/${paths.componentsDir}/test-dialog/test-dialog.component.spec.ts`,
      `/${paths.componentsDir}/test-dialog/test-dialog.component.html`,
      `/${paths.componentsDir}/test-dialog/test-dialog.component.scss`,
      `/${paths.componentsDir}/test-dialog/test-dialog.component.ts`,
      `/${paths.componentsDir}/test-dialog/test-dialog.module.ts`,
      `/${paths.componentsDir}/test-dialog/index.ts`,
    ]);
  });
});
