import prisma from '../factories/PrismaClientFactory';
class ProductSizesService {

    async getAll() {
        return await prisma.productSizes.findMany({
        });
    }

}

export default ProductSizesService;