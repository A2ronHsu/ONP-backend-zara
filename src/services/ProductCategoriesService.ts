import prisma from '../factories/PrismaClientFactory';
class ProductCategoriesService {

    async getAll() {
        return await prisma.productCategory.findMany({
        });
    }

}

export default ProductCategoriesService;