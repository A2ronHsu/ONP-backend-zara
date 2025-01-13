import prisma from '../factories/PrismaClientFactory';
class ProductCategoriesService {

    async getAll() {
        return await prisma.productCategory.findMany({
        });
    }

    async count() {
        return await prisma.productCategory.count();
    }

}

export default ProductCategoriesService;