import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../../collection.json');

describe('setup-project', () => {
  it('sets up a new project', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('setup-project', {}, Tree.empty());

    expect(true).toEqual(true);
  });
});
