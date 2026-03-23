const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const dbUrl = "postgresql://neondb_owner:npg_rzRSI5jBwY4e@ep-wandering-rain-a4qmy5ie-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
    const pool = new Pool({ connectionString: dbUrl });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        console.log("Checking tables...");
        const imageCount = await prisma.image.count();
        console.log("Image count:", imageCount);
        const images = await prisma.image.findMany();
        console.log("Images:", JSON.stringify(images, null, 2));

        const configCount = await prisma.siteConfig.count();
        console.log("Config count:", configCount);
        const config = await prisma.siteConfig.findUnique({ where: { id: 1 } });
        console.log("Config 1:", config ? "Exists" : "Not Found");
    } catch (err) {
        console.error("Database check failed:", err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
