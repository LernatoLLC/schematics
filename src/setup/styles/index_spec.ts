import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { paths } from '../../utils';

const collectionPath = path.join(__dirname, '../../collection.json');

describe('setup-jest', () => {
  it('generates the expected jest config file', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('setup-jest', {}, Tree.empty());

    expect(tree.files).toEqual([
      paths.jestConf,
    ]);
  });
});
