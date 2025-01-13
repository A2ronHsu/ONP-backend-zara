import prisma from '../factories/PrismaClientFactory';
class ProductService {

    async getAll() {
        return await prisma.products.findMany({
        });
    }

    async count(){
        return await prisma.products.count();
    }

}

export default ProductService;