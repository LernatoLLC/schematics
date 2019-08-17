import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { paths } from '../utils';



const collectionPath = path.join(__dirname, '../collection.json');

describe('component', () => {
  it('does not create a module file when module === false', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', { name: 'test-component', prefix: 'tst', module: false }, Tree.empty());

    expect(tree.files).toEqual([
      `/${paths.componentsDir}/test/test.component.spec.ts`,
      `/${paths.componentsDir}/test/test.component.html`,
      `/${paths.componentsDir}/test/test.component.scss`,
      `/${paths.componentsDir}/test/test.component.ts`,
      `/${paths.componentsDir}/test/index.ts`,
    ]);
  });

  it('generates the module file by default', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', { name: 'test-component', prefix: 'tst' }, Tree.empty());

    expect(tree.files).toEqual([
      `/${paths.componentsDir}/test/test.component.spec.ts`,
      `/${paths.componentsDir}/test/test.component.html`,
      `/${paths.componentsDir}/test/test.component.scss`,
      `/${paths.componentsDir}/test/test.component.ts`,
      `/${paths.componentsDir}/test/test.module.ts`,
      `/${paths.componentsDir}/test/index.ts`,
    ]);
  });

  it('generates the module file when route is true', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', { name: 'test-component', prefix: 'tst', route: true }, Tree.empty());

    expect(tree.files).toEqual([
      `/${paths.componentsDir}/test/test.component.spec.ts`,
      `/${paths.componentsDir}/test/test.component.html`,
      `/${paths.componentsDir}/test/test.component.scss`,
      `/${paths.componentsDir}/test/test.component.ts`,
      `/${paths.componentsDir}/test/test.module.ts`,
      `/${paths.componentsDir}/test/index.ts`,
    ]);
  });
});
