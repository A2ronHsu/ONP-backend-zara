import prisma from "../src/factories/PrismaClientFactory";

import customerCategoryFactory from "../src/factories/CustomerCategoryFactory";
import productCategoryFactory from "../src/factories/ProductCategoryFactory";
import productFactory from "../src/factories/ProductFactory";
import productSizesFactory from "../src/factories/ProductSizesFactory";
import sizesFactory from "../src/factories/SizesFactory";
import { Prisma } from "@prisma/client";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";

import ICustomerCategory from "../src/interfaces/ICustomerCategory";
import IProductImage from "../src/interfaces/IProductImage";


const seedCustomerCategory = async (prismaTransaction:Prisma.TransactionClient)=>{
   // const allDataCount = await customerCategoryFactory.count();
   // if (!allDataCount) throw new Error('Tabela customerCategory não está vazio');

   await prismaTransaction.customerCategory.createMany({
      data: [
         { name: 'Men' },
         { name: 'Women' },
         { name: 'Kids' },
         { name: 'Sales'}
      ]
   });
};

const seedProductCategory = async (prismaTransaction:Prisma.TransactionClient)=>{
   // const productCategoriesCount = productCategoryFactory.count();
   // if (!productCategoriesCount) throw new Error('productCatergory is not empty');

   await prismaTransaction.productCategory.createMany({
      data: [
         { name: 'T_Shirt'},
         { name: 'Dress'},
         { name: 'Blazer' },
         { name: 'Shirts_Sweaters'},
         { name: 'Jackets_Coats'},
         { name: 'Coat_Jacket'},
         { name: 'Jeans_Trouser'},
         { name: 'Waistcoat'},
         { name: 'Footwear'},
         { name: 'teste'}
      ]
      
   })
   
};

const seedProducts = async (prismaTransaction:Prisma.TransactionClient)=>{
   // const productCount = productFactory.count();
   // if (!productCount) throw new Error('Products is not empty');
   
   const productCategories = await productCategoryFactory.getAll();
   const productCategoriesIDs : {[key: string]:string} = {};
   for (const category of productCategories){
      productCategoriesIDs[category.name] = category.id;
   }

   const customerCategories = await customerCategoryFactory.getAll();
   const customerCategoriesIDs : {[key: string]:string} = {};
   for (const category of customerCategories){
      customerCategoriesIDs[category.name] = category.id
   }

   console.log(customerCategoriesIDs.Men);

   await prismaTransaction.products.createMany({
      data:[
         { name: "COLOUR BLOCK FAUX SUEDE T-SHIRT",    product_category_id: productCategoriesIDs.T_Shirt , customer_category_id: customerCategoriesIDs.Women ,  home: true,  larger_home_image_url: null, small_home_image_url: null},
         { name: "BUGS BUNNY WARNER BROS INC T-SHIRT", product_category_id: productCategoriesIDs.T_Shirt , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "T-SHIRT WITH EMBROIDERED TEXT",      product_category_id: productCategoriesIDs.T_Shirt , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "NEON T-SHIRT",                       product_category_id: productCategoriesIDs.T_Shirt , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null  },
         { name: "ESSENCE T-SHIRT WITH POCKET",        product_category_id: productCategoriesIDs.T_Shirt , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "OVERSHIRT WITH POCKET T-SHIRT",      product_category_id: productCategoriesIDs.Blazer , customer_category_id: customerCategoriesIDs.Women ,  home: true,  larger_home_image_url: null, small_home_image_url: null },
         { name: "WHITE SHIRT WITH FEATHER T-SHIRT",   product_category_id: productCategoriesIDs.Blazer , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "SATIN FINISH PLAYSUIT COAT",         product_category_id: productCategoriesIDs.Blazer , customer_category_id: customerCategoriesIDs.Women ,  home: true,  larger_home_image_url: null, small_home_image_url: null },
         { name: "WAISCOAT WITH CONSTRANT PIPING COAT",product_category_id: productCategoriesIDs.Blazer , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "FROCK COAT WITH ZIPS COAT",          product_category_id: productCategoriesIDs.Dress , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "LACE-TRIMMED SATIN JUMPSIOT",        product_category_id: productCategoriesIDs.Blazer , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "KNIT WAISTCOAT WITH VENTS",          product_category_id: productCategoriesIDs.Waistcoat , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "WAISTCOAT WITH VENTS",               product_category_id: productCategoriesIDs.Waistcoat , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "WAISTCOAT WITH POCKETS",             product_category_id: productCategoriesIDs.Footwear , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "TEXTURED WAISTCOAT WITH COLLAR",     product_category_id: productCategoriesIDs.Waistcoat , customer_category_id: customerCategoriesIDs.Women ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "DOUBLE BREASTED LINEN",              product_category_id: productCategoriesIDs.teste , customer_category_id: customerCategoriesIDs.Women ,  home: true,  larger_home_image_url: null, small_home_image_url: null },
         { name: "ANIMAL PRINT OVERSIZED",             product_category_id: productCategoriesIDs.Waistcoat , customer_category_id: customerCategoriesIDs.Men ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "FAUX SUEDE ANIMAL PRINT",            product_category_id: productCategoriesIDs.Dress , customer_category_id: customerCategoriesIDs.Men ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "KNITTED WITH KNOT",                  product_category_id: productCategoriesIDs.Dress , customer_category_id: customerCategoriesIDs.Men ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "TEXTURED SWEATER WITH THREAD",       product_category_id: productCategoriesIDs.Dress , customer_category_id: customerCategoriesIDs.Men ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "JEANS ZW PREMIUM NEW CHINO",         product_category_id: productCategoriesIDs.Dress , customer_category_id: customerCategoriesIDs.Men ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "PRINTED FLOWING TROUSERS",           product_category_id: productCategoriesIDs.Jeans_Trouser , customer_category_id: customerCategoriesIDs.Men ,  home: false, larger_home_image_url: null, small_home_image_url: null },
         { name: "TRACK SOLE ANKLE BOOTS",             product_category_id: productCategoriesIDs.Footwear , customer_category_id: customerCategoriesIDs.Men ,  home: false, larger_home_image_url: null, small_home_image_url: null }
      ]
   })

};
const seedProductImages = async (prismaTransaction:Prisma.TransactionClient)=>{
   const products = await productFactory.getAll();
 

   let productsIDs  = []
   for (let product of products){
      productsIDs.push(product.id)
   }


   prismaTransaction.productImages.createMany({
      data: [
         {}
      ]
   })
   
};

{

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

      await prisma.$transaction(async prismaTransaction=>{
         await seedProducts(prismaTransaction);
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
