import { statements } from "../types";
import { BOT } from "./Statements/BOT";

export function Interpreter (ast: any): any {
    console.log('AST', ast);

    let current = 0;
    while (current < ast.length) {
        let peek = ast[current];

        if (peek.type === statements.BOT) {
            BOT(peek);

            return {
                requireReturn: false
            }
        }
    }
}