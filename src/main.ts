import { statements } from "./types";
import _Parser from './parser';
import { Interpreter } from './Interpreter/interpreter';

function Parser(tokens: any, current: any) {
    const parsedTokens = new _Parser(tokens, current).parse();

    return Array.isArray(parsedTokens) ? parsedTokens[0] : parsedTokens;
}

export = {
    statements,
    execParser: Parser,
    execInterpreter: Interpreter
}