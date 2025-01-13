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

   console.log(allData, allData.length);

   if (!allData.length) {
      await prismaTransaction.customerCategory.createMany({
         data: seedData
      }
      )
   }else{
      throw new Error('Tabela customerCategory não está vazio')
   }
};

const seedProductCategory = async (prismaTransaction:Prisma.TransactionClient)=>{
   const customerCategory = await customerCategoryFactory.getAll();
   const productCategory = await productCategoryFactory.getAll();

   if (!productCategory.length){
      await prismaTransaction.productCategory.createMany({
         data: [
            { name: 'T-Shirt', customer_category_id: customerCategory.find(c => c.name == 'Men')?.id},
            { name: 'Dress', customer_category_id: customerCategory.find(c => c.name == 'Men')?.id},
            { name: 'Blazer', customer_category_id: customerCategory.find(c => c.name == 'Men')?.id },
            // { name: 'Shirts/Sweaters'},
            // { name: 'Jackets/Coats'},
            // { name: 'Coat/Jacket'},
            // { name: 'Jeans/Trouser'},
            // { name: 'Waistcoat'},
            // { name: 'Footwear'},
            // { name: 'teste'}
         ]
         
      })
   }else{
      throw new Error('Tabela ProductCategory não está vazia')
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
