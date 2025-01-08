"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes = (0, express_1.Router)();
routes.get('/', function (req, res) {
    res.send('hello worl!');
});
// routes.get('/men/:id',(req:Request, res:Response)=>{
//    const id = req.params.id;
//    res.json({
//          id: id,
//          tamanho: 'p',
//          cor: 'preto'
//       });
// });
// console.log('Routed');
exports.default = routes;
