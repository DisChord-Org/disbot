export function Parser (code: any) {
    console.log(code);

    return {
        consumeCount: 1,
        ast: {
            type: 'BOT',
            value: 'mibottoken'
        }
    }
}