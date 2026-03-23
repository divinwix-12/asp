const { Client } = require('pg');

const dbUrl = "postgresql://neondb_owner:npg_rzRSI5jBwY4e@ep-wandering-rain-a4qmy5ie-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
    const client = new Client({ connectionString: dbUrl });
    try {
        await client.connect();
        console.log("Connected to DB.");
        const res = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public';
        `);
        console.log("Tables in 'public' schema:");
        res.rows.forEach(row => console.log(" - " + row.table_name));
    } catch (err) {
        console.error("Failed to list tables:", err);
    } finally {
        await client.end();
    }
}

main();
