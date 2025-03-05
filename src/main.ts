import { statements } from "./types";
import _Parser from './parser';
import { Interpreter } from './Interpreter/interpreter';

function Parser(tokens: any, current: any) {
    return new _Parser(tokens, current).parse();
}

export = {
    statements,
    execParser: Parser,
    execInterpreter: Interpreter
}