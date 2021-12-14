import express = require('express');
import { PrismaClient } from '@prisma/client';


// Middleware configuration
const app = express();
const cors = require('cors');
const prisma = new PrismaClient();

app.use(cors())
app.use(express.json());


const port = process.env.PORT || 8080;

// routes
app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});


//CREATE ROUTES
//add new product
app.post('/api/product',async (req:express.Request,  res:express.Response) => {
  const newProduct = await prisma.product_table.create({data: req.body});
  res.json(newProduct);
})
//add new brand
app.post('/api/brand',async (req:express.Request,  res:express.Response)=>{
  console.log(req.body);
  const newBrand = await prisma.brand_table.create(
    {
      data: {...req.body}
    });
  res.json(newBrand);
})
//add new order
app.post('/api/order',async (req:express.Request,  res:express.Response)=>{
  const newOrder = await prisma.order_table.create({data: req.body});
  res.json(newOrder);
})
//add new price
// app.post('/api/price',async (req:express.Request,  res:express.Response)=>{
//   const newPrice = await prisma.price_table.create({data: req.body});
//   res.json(newPrice);
// })
//add new inventory
app.post('/api/inventory',async (req:express.Request,  res:express.Response)=>{
  const newInventory = await prisma.inventory_table.create({data: req.body});
  res.json(newInventory);
})

//UPDATE ROUTES
//update product 
app.put('/api/product/:id',async (req:express.Request,  res:express.Response)=>{
  const updateProduct = await prisma.product_table.update({
    where: {product_id: parseInt(req.params.id)},
    data: req.body
  });
  res.json(updateProduct);
})
//update brand 
app.put('/api/brand/:id',async (req:express.Request,  res:express.Response)=>{
  const updateBrand = await prisma.brand_table.update({
    where: {brand_id: parseInt(req.params.id)},
    data: req.body
  });
  res.json(updateBrand);
})
//update order 
app.put('/api/order/:id',async (req:express.Request,  res:express.Response)=>{
  const updateOrder = await prisma.order_table.update({
    where: {order_id: parseInt(req.params.id)},
    data: req.body
  });
  res.json(updateOrder);
})
//update price 
// app.put('/api/price/:id',async (req:express.Request,  res:express.Response)=>{
//   const updatePrice = await prisma.price_table.update({
//     where: {price_id: parseInt(req.params.id)},
//     data: req.body
//   });
//   res.json(updatePrice);
// })
//update inventory 
app.put('/api/inventory/:id',async (req:express.Request,  res:express.Response)=>{
  const updateInventory = await prisma.inventory_table.update({
    where: {inventory_id: parseInt(req.params.id)},
    data: req.body
  });
  res.json(updateInventory);
})

//GET ROUTES
//get all products 
app.get('/api/product', async (req:express.Request,  res:express.Response) => {
  const products = await prisma.product_table.findMany();
  res.json(products);
});

//get all brand 
app.get('/api/brand', async (req:express.Request,  res:express.Response) => {
  const brands = await prisma.brand_table.findMany();
  res.json(brands);
});

//get all orders 
app.get('/api/order', async (req:express.Request,  res:express.Response) => {
  const orders = await prisma.order_table.findMany();
  res.json(orders);
});

//get all inventories 
app.get('/api/inventory', async (req:express.Request,  res:express.Response) => {
  const inventories = await prisma.inventory_table.findMany();
  res.json(inventories);
});

//get one product 
app.get('/api/product/:id', async (req:express.Request,  res:express.Response) => {
  const product = await prisma.product_table.findMany({
    where: {product_ref: req.params.id}
  });
  res.json(product);
});

//get one order 
app.get('/api/order/:id', async (req:express.Request,  res:express.Response) => {
  const order = await prisma.order_table.findMany({
    where: {order_id: parseInt(req.params.id)}
  });
  res.json(order);
});

//get one inventory 
app.get('/api/inventory/:id', async (req:express.Request,  res:express.Response) => {
  const inventory = await prisma.inventory_table.findMany({
    where: {inventory_id: parseInt(req.params.id)}
  });
  res.json(inventory);
});

//get one brand 
app.get('/api/brand/:id', async (req:express.Request,  res:express.Response) => {
  const brand = await prisma.brand_table.findMany({
    select:{
      brand_name: true
    },
    where: {brand_id: parseInt(req.params.id)}
  });
  res.json(brand);
});
//get one price
// app.get('/api/price/:id', async (req:express.Request,  res:express.Response) => {
//   const price = await prisma.price_table.findMany({
//     where: {price_id: parseInt(req.params.id)}
//   });
//   res.json(price);
// });

//DELETE ROUTES 
//delete product
app.delete('/api/product', async (req:express.Request,  res:express.Response) => {
  const product = await prisma.product_table.delete({
    where: {product_ref: req.body},
  })
});

//delete brand
app.delete('/api/brand/:id', async (req:express.Request,  res:express.Response) => {
  const brand = await prisma.brand_table.delete({
    where: {brand_id: parseInt(req.params.id)}
  })
});

//delete order 
app.delete('/api/order/:id', async (req:express.Request,  res:express.Response) => {
  const order = await prisma.order_table.delete({
    where: {order_id: parseInt(req.params.id)}
  })
});

//delete price 
// app.delete('/api/price/:id', async (req:express.Request,  res:express.Response) => {
//   const price = await prisma.price_table.delete({
//     where: {price_id : parseInt(req.params.id)}
//   })
// });

//delete inventory
app.delete('/api/inventory/:id', async (req:express.Request,  res:express.Response) => {
  const inventory = await prisma.inventory_table.delete({
    where: {inventory_id: parseInt(req.params.id)}
  })
});