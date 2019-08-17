import { capitalize, dasherize, underscore } from '@angular-devkit/core/src/utils/strings';

export function allcapsify(str: string): string {
  let caps = underscore(str).toUpperCase();
  return caps;
}

export function titleify(str: string): string {
  str = dasherize(str).toLowerCase();
  let pieces = str.split('-');
  let title = '';
  for (let piece of pieces) {
    if (title !== '') {
      title += ' ';
    }
    title += capitalize(piece);
  }
  return title.trim();
}
