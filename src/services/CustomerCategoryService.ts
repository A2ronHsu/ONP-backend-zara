import prisma from '../factories/PrismaClientFactory';
class CustomerCategoriesService {

    async getAll() {
        return await prisma.customerCategory.findMany({
            // include: {
            //     product_categories: true
            // }
        });
    };

    async count(){
        return await prisma.customerCategory.count()
    }
    

}

export default CustomerCategoriesService;