const socket = io()

function asd(){
    console.log("Entramos a socket")
}
asd()

socket.on('getproducts', prod => {
    renderProds(prod)
})

function renderProds(prods) {
    
    const productsContainer = document?.getElementById('productos-lista')
    if (prods === null) {
        if (productsContainer === null) {
            return
        }
        productsContainer.innerHTML = '<h1>No hay productos</h1>'
        return
    }
    if (productsContainer === null) {
        return
    }
    productsContainer.innerHTML = ''

    prods.forEach(producto => {
        const productDiv = document.createElement('div')
        productDiv.innerHTML += `
        <h2>${producto.title}</h2>
        <p>${producto.description}</p>
        <p>Código: ${producto.code}</p>
        <p>Precio: ${producto.price}</p>
        <img src='${producto.thumbnail}' alt='${producto.title}' height="auto" width="100"/>
        <p>Stock: ${producto.stock}</p>
        <p style="color: red; font-size: 20px; background: black; font: bold; padding: 4px;">ID: ${producto.id}</p>
      `
        productsContainer.appendChild(productDiv).className = 'prodContainer'
    })
}