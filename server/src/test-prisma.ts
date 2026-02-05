import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function test() {
    try {
        const users = await prisma.user.findMany();
        console.log('Prisma ESM Success! Found users:', users.length);
    } catch (e) {
        console.error('Prisma ESM Failure:', e);
    } finally {
        await prisma.$disconnect();
    }
}
test();
