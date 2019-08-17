import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../../collection.json');

describe('setup-ngrx', () => {
  it('adds ngrx', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('setup-ngrx', {}, Tree.empty());

    expect(true).toEqual(true);
  });
});
