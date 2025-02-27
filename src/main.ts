import { statements } from "./types";
import { Parser } from './parser';
import { Interpreter } from './interpreter';

export =  {
    statements,
    execParser: Parser,
    execInterpreter: Interpreter
}