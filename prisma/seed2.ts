import { PrismaClient } from '@prisma/client';
import ICustomerCategory from '../src/interfaces/ICustomerCategory';

const prisma = new PrismaClient();

const seedCustomerCategory = async ()=>{
   //dados de teste
   const customerCategories: ICustomerCategory[] = [
      { 
         id: "1",
         name: 'Men' 
      },
      { 
         id: '2',
         name: 'Women' 
      },
      { 
         id:'3',
         name: 'Kids' },
      { 
         id:'4',
         name: 'test'},
      { 
         id:'5',
         name: 'newRecord1'},
      { 
         id:'6',
         name: 'newRecord2'},
      { 
         id:'7',
         name: 'newRecord3'},
      { 
         id:'8',
         name: 'newRecord4'}
   ]
   //loop para criar os registros
   for (const element of customerCategories) {
      //testando se element é um registro duplicado
      const isDuplicated = (await prisma.customerCategory.findMany({
         where: {
            name: element.name
         }
      })).length;
      
      //se o valor for duplicado, log, caso constrario, criar registro e log.
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
   // console.log(await fetchAndValidadegit config pull.rebase falses('customer_category', 'name', '---'));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
