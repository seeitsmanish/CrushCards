import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const cardTypes = ['Simple', 'Elegant', 'Premium'];

    for (const name of cardTypes) {
        await prisma.cardType.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }

    console.log('✅ CardTypes seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
