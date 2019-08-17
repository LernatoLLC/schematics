import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { Tree } from '@angular-devkit/schematics';

export const warningMessage = '// WARNING: This file is auto-generated and gets overwritten.\n' +
  '// It will keep anything that adheres to the established patterns, but everything else will be lost.\n\n';

export function getExports(fileContents: string): string[] {
  let lines = fileContents.trim().split('\n');

  let exports = lines
    .filter(l => l.includes('export') && l.includes('from'))
    .map(l => l
      .replace(/[\s\S]*['"]\.\//, '')
      .replace(/['"];?[\s]*$/, ''));

  return exports;
}

export function addToExports(fileContents: string, name: string): string {
  let names = getExports(fileContents);

  if (names.indexOf(name) === -1) {
    names.push(name);
  }

  names.sort((a, b) => a.localeCompare(b));

  let contents = '';
  for (let n of names) {
    contents += `export * from './${n}';\n`;
  }

  return contents;
}

export function exportFromFile(filePath: string, tree: Tree, options: any): void {
  const fileContents = tree.read(filePath);
  const name = dasherize(options.name);

  if (fileContents == null) {
    const contents = `${warningMessage}export * from './${name}';\n`;
    tree.create(filePath, contents);
  } else {
    const theExports = `${warningMessage}${addToExports(fileContents.toString(), name)}`;
    tree.overwrite(filePath, theExports);
  }
}
