import * as escodegen from "escodegen";
import * as espree from "espree"; 
import * as estraverse from "estraverse"; //Recorredor de arboles
import * as fs from "fs/promises";

export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8')
  let output = addLogging(input);
  if(outputFile === undefined) {
    console.log(output);
    return;
  }
  await fs.writeFile(outputFile, output);
}

export function addLogging(code) {
  debugger;;
  var ast = espree.parse(code, {ecmaVersion: 12, loc: true}); //parsea el codigo
  debugger;;
    //Detecta las funciones pudiendo acceder a ellas para modificarla o añadirles lineas, comentarios ...
    estraverse.traverse(ast, {      //primer argumento el arbol ast, segundo elemento lo que vas a hacer con el nodo
        enter: function(node, parent) { //nodo que está siendo visitado, el padre del nodo que está siendo visitado
            if (node.type === 'FunctionDeclaration' ||
                node.type === 'ArrowFunctionExpression' ||
                node.type === 'FunctionExpression') {
                addBeforeCode(node);
            }
        }
    });
    debugger;
    return escodegen.generate(ast);
}

function addBeforeCode(node) {
  const name = node.id ? node.id.name : '<anonymous function>'; // si no tiene nombre la llamaremos anonymous
  let paramNames = "";
  if (node.params.length) { //concatenacion de los parametros de la funcion
    paramNames = "${ " + node.params.map(param => param.name).join(" }, $ { ") + " }";
  }
  const lineN = node.loc.start.line; //coje la linea de la llamada
  const beforeCode = "console.log('Entering " + name + "(" + paramNames +") at line "+ lineN +"');";
  const beforeNodes = espree.parse(beforeCode, {ecmaVersion: 12}).body; //me quedo con el array del body
  node.body.body = beforeNodes.concat(node.body.body);
}
