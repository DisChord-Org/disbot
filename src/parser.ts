import { statements } from "./types";

export default class Parser {
    public nodes: any = [];

    constructor(private tokens: any, private current: number = 0) {}

    public parse(): any {
        while (this.current < this.tokens.length) {
            switch (this.peek().type) {
                case statements.BOT:
                    this.consume(statements.BOT);
                    const botToken = this.consume(this.tokens[this.current].type).value;
                    let botConfig: any = {};

                    if (this.tokens[this.current].type === 'L_EXPRESSION') {
                        botConfig = this.blocks('L_EXPRESSION', 'R_EXPRESSION');
                    }

                    this.nodes.push({
                        consumeCount: 2,
                        ast: {
                            type: statements.BOT,
                            value: botToken,
                            config: botConfig
                        }
                    });
                    break;

                case 'L_EXPRESSION':
                    const expression: any = this.blocks('L_EXPRESSION', 'R_EXPRESSION');

                    this.nodes.push(expression);
                    break;
                case 'L_BRACE':
                    this.nodes.push(this.parseObject());
                    break;

                case "NUMERO ":
                case "BIGINT":
                case "BOOL":
                case "TEXTO":
                case "LISTA":
                case "NULO":
                case "INDEFINIDO":
                    this.nodes.push(this.consume(this.peek().type));
                    break;

                default:
                    this.nodes.push(this.consume(this.peek().type));
            }
        }

        return this.nodes;
    }

    private peek() {
        if (this.current >= this.tokens.length) throw new Error("Se acabaron los tokens");
        return this.tokens[this.current];
    }

    private consume(expectedTypes: any) {
        const token = this.tokens[this.current];
        const expected = Array.isArray(expectedTypes) ? expectedTypes : [ expectedTypes ];

        if (!expected.includes(token.type)) throw new Error(`Se esperaba uno de ${expected.join(', ')} pero se encontró ${token.type}`);

        return this.tokens[this.current++];
    }

    private blocks(openType: string, closeType: string) {
        let depth = 1; // Inicializar depth en 1 (ya estamos dentro de la expresión)
        let blockTokens = [];
        this.consume(openType); // Consumir el primer L_EXPRESSION

        while (this.current < this.tokens.length && depth > 0) {
            const token = this.tokens[this.current];

            if (token.type === openType) depth++;
            if (token.type === closeType) depth--;

            if (depth === 0) { // Fin del bloque principal
                this.current++; // Saltar el R_EXPRESSION de cierre
                break;
            }

            blockTokens.push(token); // Añadir tokens internos
            this.current++;
        }

        return new Parser(blockTokens).parse();
    }

    private parseObject() {
        const obj: any = { type: "OBJETO", pairs: [] };
        this.consume('L_BRACE');

        while (this.current < this.tokens.length && this.peek().type !== 'R_BRACE') {
            const keyToken = this.consume(this.peek().type);
            const key = keyToken.value;
            this.consume(":");

            let value: any;
            if (this.peek().type === 'L_BRACE') {
                value = this.parseObject();
            } else if (this.peek().type === 'L_EXPRESSION') {
                value = {
                    type: "EXPRESION",
                    children: this.blocks('L_EXPRESSION', 'R_EXPRESSION')
                };
            } else {
                value = this.consume(this.peek().type);
            }

            obj.pairs.push({ key, value });

            if (this.peek().type === ",") {
                this.consume(",");
            }
        }

        this.consume('R_BRACE');
        return obj;
    }
}