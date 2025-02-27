import { statements } from "./types";
import { Parser } from './parser';
import { Interpreter } from './Interpreter/interpreter';

export =  {
    statements,
    execParser: Parser,
    execInterpreter: Interpreter
}