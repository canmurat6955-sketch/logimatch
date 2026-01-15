
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
    connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/postgres',
});

async function run() {
    await client.connect();

    const migrationDir = path.join(__dirname, '../supabase/migrations');
    const files = fs.readdirSync(migrationDir).sort();

    for (const file of files) {
        if (file.endsWith('.sql')) {
            console.log(`Running ${file}...`);
            const sql = fs.readFileSync(path.join(migrationDir, file), 'utf8');
            try {
                await client.query(sql);
                console.log(`Success: ${file}`);
            } catch (err) {
                console.error(`Error in ${file}:`, err.message);
                // Continue, as some might be duplicates/already exists
            }
        }
    }

    await client.end();
}

run();
