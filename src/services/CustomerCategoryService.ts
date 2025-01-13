import prisma from '../factories/PrismaClientFactory';
class CustomerCategoriesService {

    async getAll() {
        return await prisma.customerCategory.findMany({
        });
    };

    async findFirst(record: string){
        return await prisma.customerCategory.findFirst({
            where: { 
                name: record
            }
        })
    }
    

}

export default CustomerCategoriesService;