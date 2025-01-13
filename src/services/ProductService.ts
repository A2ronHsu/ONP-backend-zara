import prisma from '../factories/PrismaClientFactory';
class ProductService {

    async getAll() {
        return await prisma.products.findMany({
            include: { product_category: true }, 
        });
    }

}

export default ProductService;