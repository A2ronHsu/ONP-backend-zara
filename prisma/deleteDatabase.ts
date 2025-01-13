import prisma from "../src/factories/PrismaClientFactory";


async function main() {
   try {
      await prisma.$transaction([
         prisma.productSizes.deleteMany(),
         prisma.sizes.deleteMany(),
         prisma.productImages.deleteMany(),
         prisma.products.deleteMany(),
         prisma.productCategory.deleteMany(),
         prisma.customerCategory.deleteMany(),
      ]);

      console.log("Todos os registros foram deletados com sucesso.");
   } catch (error) {
      console.error("Erro ao deletar registros:", error);
   } finally {
      await prisma.$disconnect(); // Fecha a conexão com o banco de dados
   }
}

// Executa a função principal
main().catch((error) => {
   console.error("Erro inesperado:", error);
   process.exit(1); // Sai com um código de erro
}).finally(() => {
   process.exit(0); // Sai com sucesso
});