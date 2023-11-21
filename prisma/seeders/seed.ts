import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
    const roles = ['admin', 'customer', 'staff'];

    for (const name of roles) {
      await prisma.role.create({
        data: {
          name,
        },
      });
    }

    console.log('Seeding completed.');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await prisma.$disconnect();
  }
};

main();
