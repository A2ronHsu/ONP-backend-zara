import prisma from '../factories/PrismaClientFactory';

class SizeService {
    constructor() {
      
        

    }

    async getAll() {
        return await prisma.sizes.findMany({
        });
    }

}

export default SizeService;