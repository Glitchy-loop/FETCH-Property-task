const displayProperties = items => {
  const propertyBlock = document.querySelector('.properties')

  items.forEach(item => {
    const block = document.createElement('div')
    const image = document.createElement('img')
    const price = document.createElement('div')
    const location = document.createElement('div')
    const description = document.createElement('div')

    image.className = 'image'
    block.className = 'property'
    image.src = item.image

    price.className = 'price'
    price.innerHTML = item.price

    location.className = 'location'
    location.textContent = item.city

    description.className = 'description'
    description.textContent = item.description

    propertyBlock.appendChild(block)
    block.prepend(image, price, location, description)

    let allPrices = document.querySelectorAll('.price')

    allPrices.forEach(price => {
      function separator (numb) {
        var str = numb.toString().split('.')
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return str.join('.')
      }
      price.innerHTML = separator(price.innerHTML)
    })
  })
}

const getData = async () => {
  const res = await fetch('https://radial-reinvented-shoe.glitch.me/')
  const data = await res.json()

  displayProperties(data)
  //   console.log(data)
}
getData()
