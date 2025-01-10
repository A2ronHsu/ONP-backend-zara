import { Router } from "express";
import { Request, Response } from "express";

const routes = Router();

routes.get('/',(req:Request, res:Response)=>{
   res.send('hello worl!');


});

//rota para produtos da home
routes.get('/products/featured',(req:Request, res:Response)=>{
   res.json({
      id: 'id',
      nome:'string',
      preço: 'number',
      imagens: ['string'],
      categoria: 'string'
   });
});

//rota para filtrar  roupas por categoria, tamanhos, preço, concomitantemente
routes.get('/products', (req:Request,res:Response)=>{
   res.json({
      id: 'id',
      nome:'string',
      preço: 'number',
      imagens: ['string'],
      categoria: 'string'
   });
})

//rota para as categorias
routes.get('/products/categories', (req:Request,res:Response)=>{
   res.json({

   })
})

routes.get('/products/:id', (req:Request, res:Response)=>{
   const id = req.params.id;
   res.json({
      id: id,
      nome:'string',
      descrição: 'descrição',
      preço: 'number',
      categoria: 'string',
      imagens: ['string'],
      detais: {
         color: 'string',
         modelHeight: 'string',
         sizes: ['string']
      }
   })
})

routes.post('/shipping/calculate', (req:Request, res:Response)=>{
   const {from, to, products, options, services} = req.body;
   const teste = 'teste';
   res.json({from, to, products, options, services })
})




console.log('Routed');

export default routes;