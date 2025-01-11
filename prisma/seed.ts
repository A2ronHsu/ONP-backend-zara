import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const fetchAndValidades = async (tableName: string , tableProperty: string, record: string ): Promise<boolean> => {
   let result : any = (await prisma.$queryRawUnsafe(`SELECT * FROM ${tableName} t WHERE t.${tableProperty} = '${record}'`));
   return result.length ? true : false ;
};



const seedCustomerCategory = async ()=>{
   const json = [
      { name: 'Men' },
      { name: 'Women' },
      { name: 'Kids' },
      { name: 'test'},
      { name: 'newRecord1'},
      { name: 'newRecord2'},
      { name: 'newRecord3'},
      { name: 'newRecord4'}
   ]
   
   for (const element of json) {
      const isDuplicated = await fetchAndValidades('customer_category', 'name', element.name);
      if (isDuplicated) {
         console.log(`${element.name} é duplicado`)
      }else {
         const user = await prisma.customerCategory.create({
            data: {
               name: element.name
            }
         });
         console.log(`${element.name} criado`)
      
      }
}

};

{

   const ProductCategory = async ()=>{};
   const Products = async ()=>{};
   const ProductImages = async ()=>{};
   const Sizes = async ()=>{};
   const ProductSizes = async ()=>{};
}

async function main(){
   await seedCustomerCategory();
   // console.log(await fetchAndValidades('customer_category', 'name', '---'));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
