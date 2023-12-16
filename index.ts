import minimist from 'minimist';

const args = minimist(Bun.argv.slice(2), { string: ['year', 'day'] });

const PATH = `./${args['year']}/day-${args['day']}`;
const loadModule = async () => {
    try {
        console.log('loading module', PATH);
        return await import(PATH);
    } catch (e) {
        console.error('Cannot load module.');
        throw e;
    }
};

const { main } = await loadModule();
console.log(`\nRun #${new Date().toISOString()} ...\n`);
await main(args['year'], args['day']);
console.log(`\n###########################\n`);
