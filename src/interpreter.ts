export function Interpreter (ast: any) {
    console.log(ast.value);

    return {
        requireReturn: false
    }
}