// import { PrismaClient } from '@prisma/client';
import logger from '../pino';

//  const prisma = new PrismaClient();

// export default prisma

import { PrismaClient } from '../../../generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

async function ping() {
    try {
      await prisma.$queryRaw`SELECT 1`
      logger.error('Ping realizado com sucesso!')
    } catch (err) {
        logger.error('Erro ao pingar o banco:')
    } finally {
      await prisma.$disconnect()
    }
  }

setInterval(() => {
    ping()
}, 8.64e+7)