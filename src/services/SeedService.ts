import prismaFactory from '../factories/PrismaClientFactory';
import productServiceFactory from '../factories/ProductFactory';
import productCategoryService from '../factories/ProductCategoryFactory';
import sizesServiceFactory from '../factories/SizesFactory';
import productSizesServiceFactory from '../factories/ProductSizesFactory';
import customerCategoryServiceFactory from '../factories/CustomerCategoryFactory';

import ISize from '../interfaces/ISize';
import ICustomerCategory from '../interfaces/ICustomerCategory';
import IProductCategory from '../interfaces/IProductCategory';
import IProduct from '../interfaces/IProduct';
import IProductImage from '../interfaces/IProductImage';
import IProductSize from '../interfaces/IProductSize';
import prisma from '../factories/PrismaClientFactory';
import { Prisma, PrismaClient } from '@prisma/client';

class SeedService {

  async todasAsSeeds() {

    await prisma.$transaction(async (transactionPrisma) => {
      // 1. Customer Categories
      await this.seedCustomerCategories(transactionPrisma);
  
      // 2. Product Categories
      await this.seedProductCategories(transactionPrisma);
  
      // 3. Products
      await this.seedProducts(transactionPrisma);
  
      // 4. Product Images
      await this.seedProductImages(transactionPrisma);
  
      // 5. Sizes
      await this.seedSizes(transactionPrisma);
  
      // 6. Product Sizes
      await this.seedProductSizes(transactionPrisma);
    });

  }

  async seedCustomerCategories(prismaTransaction: Prisma.TransactionClient) { // categorias do tipo, masculino etc...
    const seedCustomerCategories: Omit<ICustomerCategory,'id'>[] = [
      { name: 'Man' },
      { name: 'Woman' },
      { name: 'Kids' },
      { name: 'Sales'},
    ];

    const allCustomerCategories = await customerCategoryServiceFactory.getAllCustomerCategory();

    let newCustomerCategories = [];
    let existingCustomerCategories = [];
    for (const category of seedCustomerCategories) {
      const exists = allCustomerCategories.some(
        category =>
          category.name === category.name
      );

      if (!exists) {
        newCustomerCategories.push(category);
      } else {
        existingCustomerCategories.push(category);
      }
    }
  
    let duplicatedCustomerCategoriesMessage
    if(existingCustomerCategories.length){
      duplicatedCustomerCategoriesMessage = `Categorias de clientes duplicadas foram encontradas e ignoradas.`
    }

    const created = await prismaTransaction.customerCategory.createMany({
      data: newCustomerCategories,
    });

    if(created.count > 0){
      return {
        message: `Categorias de clientes inseridas com sucesso.`,
        duplicatedCustomerCategoriesMessage,
        created
      };
    } else {
      return { 
        duplicatedCustomerCategoriesMessage 
      }
    }
  }

  async seedProductCategories(prismaTransaction: Prisma.TransactionClient) {
      // Recuperando todas as categorias de cliente
      const customerCategories = await prismaFactory.customerCategory.findMany();
  
      // Criando as categorias de produtos com base nas categorias de cliente
      const seedProductCategories: Omit<IProductCategory, 'id'>[] = customerCategories.flatMap(category => [
        { customer_category_id: category.id, name: 't-shirts' },
        { customer_category_id: category.id, name: 'pants' },
        { customer_category_id: category.id, name: 'shoes' },
        { customer_category_id: category.id, name: 'coat' },
        { customer_category_id: category.id, name: 'sweater' },
        { customer_category_id: category.id, name: 'jacket' },
      ]);
  
      const allProductCategories = await prismaFactory.productCategory.findMany();
  
      let newProductCategory = [];
      let existingProductCategory = [];
      for (const seedProductCategory of seedProductCategories) {
        const exists = allProductCategories.some(
          productCategory =>
            productCategory.name === seedProductCategory.name &&
            productCategory.customer_category_id === seedProductCategory.customer_category_id
        );
  
        if (!exists) {
          newProductCategory.push(seedProductCategory);
        } else {
          existingProductCategory.push(seedProductCategory);
        }
      }
  
      let duplicatedProductCategoriesMessage;
      if (existingProductCategory.length) {
        duplicatedProductCategoriesMessage = `Categorias de produtos já existentes foram ignoradas`;
      }
  
      const created = await prismaTransaction.productCategory.createMany({
        data: newProductCategory,
      });
  
      if (created.count > 0) {
        return {
          message: `Categorias de produto inseridas com sucesso.`,
          duplicatedProductCategoriesMessage,
          created,
        };
      } else {
        return { duplicatedProductCategoriesMessage };
      }
    ;
  }
  
  async seedProducts(prismaTransaction: Prisma.TransactionClient) { // o produto em si, onde vai juntar as outras tabelas

    const allProductCategories = await productCategoryService.getAllProductCategories();
  
    const seedProducts: Omit<IProduct, 'id'>[] = allProductCategories.flatMap(category => [
      { product_category_id: category.id, home: false, larger_home_image_url: null, small_home_image_url: null },
      { product_category_id: category.id, home: false, larger_home_image_url: null, small_home_image_url: null },
      { product_category_id: category.id, home: false, larger_home_image_url: null, small_home_image_url: null },
      { product_category_id: category.id, home: false, larger_home_image_url: null, small_home_image_url: null },
      { product_category_id: category.id, home: false, larger_home_image_url: null, small_home_image_url: null },
      { product_category_id: category.id, home: false, larger_home_image_url: null, small_home_image_url: null },
      { product_category_id: category.id, home: false, larger_home_image_url: null, small_home_image_url: null },
      { product_category_id: category.id, home: false, larger_home_image_url: null, small_home_image_url: null },
      { product_category_id: category.id, home: false, larger_home_image_url: null, small_home_image_url: null },
    ]);
  
    const allProducts = await productServiceFactory.getAllProducts();
  
    let newProducts = [];
    let existingProducts = [];
    for (const seedProduct of seedProducts) {
      const exists = allProducts.some(
        product =>
          product.product_category_id === seedProduct.product_category_id &&
          product.home === seedProduct.home &&
          product.larger_home_image_url === seedProduct.larger_home_image_url &&
          product.small_home_image_url === seedProduct.small_home_image_url
      );
  
      if (!exists) {
        newProducts.push(seedProduct);
      } else {
        existingProducts.push(seedProduct);
      }
    }
  
    let duplicatedProductsMessage;
    if (existingProducts.length) {
      duplicatedProductsMessage = `Produtos já existentes foram ignorados`;
    }
  
    const created = await prismaTransaction.products.createMany({
      data: newProducts,
    });
  
    if (created.count > 0) {
      return {
        message: `Produtos inseridos com sucesso.`,
        duplicatedProductsMessage,
        created,
      };
    } else {
      return { duplicatedProductsMessage };
    }
  }

  async seedProductImages(prismaTransaction:Prisma.TransactionClient) {  // dados das imagens que estão salvas na nuvem, url
    const seedProductImages:IProductImage[] = [
      {id: "1", product_id: "1", url: 'https://via.placeholder.com/300'},
      {id: "2", product_id: "2", url: 'https://via.placeholder.com/300'},
      {id: "3", product_id: "3", url: 'https://via.placeholder.com/300'},
      {id: "4", product_id: "4", url: 'https://via.placeholder.com/300'},
      {id: "5", product_id: "5", url: 'https://via.placeholder.com/300'},
    ]
  }

  async seedSizes(prismaTransaction: Prisma.TransactionClient) {

    const allSizes = await sizesServiceFactory.getAllSizes();
    const sizes: Omit<ISize, 'id'>[] = [
      { name: 'XS' },
      { name: 'S' },
      { name: 'M' },
      { name: 'L' },
      { name: 'XL' },
      { name: 'XXL' },
    ];

    let newSizes = [];
    let existingsizes = [];
    for (const size of sizes) {
      const exists = allSizes.some(
        size =>
          size.name === size.name
      );

      if (!exists) {
        newSizes.push(size);
      } else {
        existingsizes.push(size);
      }
    }

    let duplicatedSizesMessage
    if(existingsizes.length){
      duplicatedSizesMessage = `Tamanhos de produto já existentes foram ignorados.`
    }

    const created = await prismaTransaction.sizes.createMany({
      data: newSizes,
    });

    if(created.count > 0){
      return {
        message: `Tamanhos inseridos com sucesso.`,
        duplicatedSizesMessage,
        created
      };
    } else {
      return { 
        duplicatedSizesMessage 
      }
    }
    
  }

  async seedProductSizes(prismaTransaction: Prisma.TransactionClient) {

    const allProducts = await productServiceFactory.getAllProducts();
    const sizes = await sizesServiceFactory.getAllSizes();

    const seedProductSizes: Omit<IProductSize, 'id'>[] = allProducts.flatMap(product =>
        sizes.map(size => ({
            product_id: product.id,
            size_id: size.id,
            description: `Produto da categoria ${product.product_category.name} - Tamanho ${size.name}`,
            width: Math.random() * 50 + 30, 
            height: Math.random() * 20 + 10,
            weight: Math.random() * 2 + 0.5,
            length: Math.random() * 100 + 50, 
            price: Math.random() * 300 + 100, 
            height_of_model_description: `${Math.random() * 50 + 150}`,
            quantity: Math.floor(Math.random() * 100 + 1),
        }))
    );

    // Recuperando os registros já existentes na tabela ProductSizes
    const allProductSizes = await prismaFactory.productSizes.findMany();

    let newProductSizes = [];
    let existingProductSizes = [];
    for (const seedProductSize of seedProductSizes) {
        const exists = allProductSizes.some(
            productSize =>
                productSize.product_id === seedProductSize.product_id &&
                productSize.size_id === seedProductSize.size_id
        );

        if (!exists) {
            newProductSizes.push(seedProductSize);
        } else {
            existingProductSizes.push(seedProductSize);
        }
    }

    let duplicatedProductSizesMessage;
    if (existingProductSizes.length) {
        duplicatedProductSizesMessage = `Tamanhos de produto já existentes foram ignorados.`;
    }

    const created = await prismaTransaction.productSizes.createMany({
        data: newProductSizes,
    });

    if (created.count > 0) {
        return {
            message: `Tamanhos de produto inseridos com sucesso.`,
            duplicatedProductSizesMessage,
            created,
        };
    } else {
        return { duplicatedProductSizesMessage };
    }
}
  
  async getAll(){
    return await prismaFactory.sizes.findMany()
  }

}

const seedService = new SeedService();

seedService.todasAsSeeds().catch(e => {
  console.error(e);
  process.exit(1);
});

export default SeedService;