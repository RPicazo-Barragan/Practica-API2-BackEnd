const fs = require('fs')
const express = require('express')
const { request } = require('http')
const { response } = require('express')


const app = express()
app.use(express.json())

//Get 
app.get('/Products',(req,res) => {
  const P = JSON.parse(fs.readFileSync('./Products.json')) // es igual a {koders}.koders
  const Products = P.Products

  res.json({
      success: true,
      data:{
          Products 
      }
  })
})

app.post('/Products',(request ,response) => {
    console.log('Request body', request.body)
    const stock = JSON.parse(fs.readFileSync('./Products.json'))
    stock.Products.push(request.body)
    const jsonAsString = JSON.stringify(stock,'\n',2)
    fs.writeFileSync('./Products.json',jsonAsString)
    response.json({
    success: true,
    data: stock.Products
})
})

//url params

app.delete('/Products/:name',(request,response)=>{
    const name = request.params.name
    console.log(name)
    const stock = JSON.parse(fs.readFileSync('./Products.json'))
    console.log(stock)

    const filteredProducts = stock.Products.filter((product)=>{
        return product.name !== name
    })
    console.log(filteredProducts)

    stock.Products = filteredProducts

    const jsonAsString = JSON.stringify(stock,'\n',2)
    fs.writeFileSync('./Products.json',jsonAsString)
    
    response.json({
        success: true,
        data:{
            filteredProducts
        }
    })
})

//PATCH

app.patch('/Products/:name',(request,response)=>{
    const name = request.params.name
    const valuesToChange = request.body
    const stock = JSON.parse(fs.readFileSync('./Products.json'))

    const productUpdated = stock.Products.filter((product)=>{
        return product.name !== name
    })

    productUpdated.push(valuesToChange)
    stock.Products = productUpdated
    const jsonAsString = JSON.stringify(stock,'\n',2)
    console.log(jsonAsString)
    fs.writeFileSync('./Products.json',jsonAsString)
    response.json({
        success: true,
        data: {
            productUpdated
        }
    })
})

app.listen(8080,() => {
    console.log('El servidor esta escuchando...')
})
