import prisma from "../src/factories/PrismaClientFactory";

import customerCategoryFactory from "../src/factories/CustomerCategoryFactory";
import productCategoryFactory from "../src/factories/ProductCategoryFactory";
import productFactory from "../src/factories/ProductFactory";
import productSizesFactory from "../src/factories/ProductSizesFactory";
import sizesFactory from "../src/factories/SizesFactory";
import { Prisma } from "@prisma/client";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";



const seedCustomerCategory = async (prismaTransaction:Prisma.TransactionClient)=>{
   const allData = (await customerCategoryFactory.getAll());

   //dados de teste
   const seedData = [
      { name: 'Men' },
      { name: 'Women' },
      { name: 'Kids' },
      { name: 'test'},
      { name: 'newRecord1'},
      { name: 'newRecord2'},
      { name: 'newRecord3'},
      { name: 'newRecord4'}
   ]


   //loop para criar os registros
   for (const seed of seedData) {
      //testando se seed é um registro duplicado
      const isDuplicated = allData.filter( field => field.name == seed.name).length;
      
      //se o valor for duplicado, log, caso constrario, criar registro e log.
      if (isDuplicated) {
         console.log(`${seed.name} é duplicado`)
      }else {
         const user = await prismaTransaction.customerCategory.create({
            data: {
               name: seed.name
            }
         });
         console.log(`${seed.name} criado`)
      
      }
   }
};

const seedProductCategory = async (prismaTransaction:Prisma.TransactionClient)=>{
   const customerCategory = await customerCategoryFactory.getAll();
   const productCategory = await productCategoryFactory.getAll();

   const productCategoryData = [
      { name: 'T-Shirt', customerCategory: 'Men'},
      { name: 'Dress',customerCategory: 'Women'},
      { name: 'Blazer', customerCategory: 'Women'},
      { name: 'Shirts/Sweaters',customerCategory: 'Women'},
      { name: 'Jackets/Coats',customerCategory: 'Women'},
      { name: 'Coat/Jacket',customerCategory: 'Women'},
      { name: 'Jeans/Trouser',customerCategory: 'Women'},
      { name: 'Waistcoat',customerCategory: 'Women'},
      { name: 'Footwear',customerCategory: 'Women'},
      { name: 'teste',customerCategory: 'Men'}
   ];


   for (let element of productCategoryData){
      const isDuplicated = productCategory.filter(field=> field.name === element.name).length;
      
      const record = await prisma.customerCategory.findMany({
         where: {
            name: element.name
         }
      });
 
      const customerCategoryID : string = record[0].id;
 

      if(!isDuplicated){
         await prismaTransaction.productCategory.create({
            data: {
               name: element.name,
               customer_category_id:  customerCategoryID
            }
         })

      }
   }

};

{

   const Products = async ()=>{};
   const ProductImages = async ()=>{};
   const Sizes = async ()=>{};
   const ProductSizes = async ()=>{};
}

async function main(){
   try {
      await prisma.$transaction(async prismaTransaction=>{
         await seedCustomerCategory(prismaTransaction);
      })

      await prisma.$transaction(async prismaTransaction=>{
         await seedProductCategory(prismaTransaction);
      });
   } catch (error) {
      console.log(error);
   }

   

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
