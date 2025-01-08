import { Router } from "express";
import { Request, Response } from "express";

const routes = Router();

routes.get('/',(req:Request, res:Response)=>{
   res.send('hello worl!');


});

routes.get('/men/:id',(req:Request, res:Response)=>{
   const id = req.params.id;

   res.json({

         id: id,
         tamanho: 'p',
         cor: 'preto'
      });

});

console.log('Routed');

export default routes;