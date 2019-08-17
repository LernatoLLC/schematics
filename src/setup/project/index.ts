import { chain, Rule, schematic, SchematicContext } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";

export default function (options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rules = [
      // hello(options),
      setupJest(options),
      setupNgrx(options),
    ];

    return chain(rules)(tree, context);
  };
}


function hello(options: any): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    console.log('hello');
    console.log('options: ', options);
    return tree;
  };
}

function setupJest(options: any): Rule {
  // console.log('setupJest');
  return schematic('setup-jest', options);
}

function setupNgrx(options: any): Rule {
  // console.log('setupNgrx');
  return schematic('setup-ngrx', options);
}
