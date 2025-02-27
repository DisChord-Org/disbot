import { statements } from "./types";

let tokens: any;
let current: any;

export function Parser (t: any, c: number): any {
    tokens = t;
    current = c;

    while (current < tokens.length) {
        switch (peek().type) {
            case statements.BOT:
                consume(statements.BOT);
                const botToken = consume(tokens[current].type).value;

                return {
                    consumeCount: 2,
                    ast: {
                        type: statements.BOT,
                        value: botToken
                    }
                }
        }
    }
}

function peek() {
    if (current >= tokens.length) throw new Error("Se acabaron los tokens");
    return tokens[current];
}

function consume(expectedTypes: any) {
    const token = tokens[current];
    const expected = Array.isArray(expectedTypes) ? expectedTypes : [ expectedTypes ];

    if (!expected.includes(token.type)) throw new Error(`Se esperaba uno de ${expected.join(', ')} pero se encontró ${token.type}`);

    return tokens[current++];
}