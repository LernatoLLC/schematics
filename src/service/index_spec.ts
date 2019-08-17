import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { paths } from '../utils';



const collectionPath = path.join(__dirname, '../collection.json');

describe('service', () => {
  it('generates the expected service files', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('service', { name: 'test-service' }, Tree.empty());

    expect(tree.files).toEqual([
      `/${paths.servicesDir}/index.ts`,
      `/${paths.servicesDir}/test/test.service.spec.ts`,
      `/${paths.servicesDir}/test/test.service.ts`,
      `/${paths.servicesDir}/test/index.ts`,
    ]);
  });
});
