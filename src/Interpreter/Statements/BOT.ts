import fs from 'fs';
import path from 'path';
import { Client } from 'seyfert';

export function BOT (ast: any) {
    if (!fs.existsSync(path.join(__dirname, '../../botdata'))) fs.mkdirSync(path.join(__dirname, '../../botdata'));
    if (!fs.existsSync(path.join(__dirname, '../../botdata/src/'))) fs.mkdirSync(path.join(__dirname, '../../botdata/src/'));
    if (!fs.existsSync(path.join(__dirname, '../../botdata/src/commands/'))) fs.mkdirSync(path.join(__dirname, '../../botdata/src/commands/'));
    if (!fs.existsSync(path.join(__dirname, '../../botdata/src/events/'))) fs.mkdirSync(path.join(__dirname, '../../botdata/src/events/'));

    const packageName = require(path.join(process.cwd(), './package.json')).name || __dirname.split('enviroment')[0].split(path.sep).pop();
    const baseDir = path.join('enviroment/dependencies', packageName);

    console.log('onbotfile', ast)

    const client = new Client({
        getRC(): any {
            return {
                token: ast.value,
                locations: {
                    base: path.join(baseDir, 'botdata/src'),
                    commands: 'commands',
                    events: 'events'
                }
            }
        }
    });

    client.start();
}