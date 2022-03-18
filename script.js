const displayProperties = items => {
  const propertyBlock = document.querySelector('.properties')
  propertyBlock.innerHTML = ''

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

    // Add comma to prices
    let allPrices = document.querySelectorAll('.price')

    allPrices.forEach(price => {
      function separator (numb) {
        var str = numb.toString().split('.')
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return str.join('.')
      }
      price.innerHTML = separator(price.innerHTML)
    })
    // Add filter buttons
  })
}
function displayError (message) {
  const content = document.querySelector('.content')
  content.innerHTML = ''

  content.innerHTML = message
}
// Fetch data from the server
let filteredCities = []
let index = 0
const getData = async () => {
  try {
    const res = await fetch(
      `https://radial-reinvented-shoe.glitch.me/${index}/${filteredCities}`
    )
    const data = await res.json()

    if (data.length > 0) {
      return displayProperties(data)
    }
    // if error
  } catch (err) {
    console.log(err.message)
    displayError(err.message || 'Error has occured')
  }
}

getData()

// Filter by city
const filterBtns = document.querySelectorAll('.cityFilterBtn')

filterBtns.forEach(button => {
  button.addEventListener('click', e => {
    if (e.target.classList.contains('primary')) {
      filteredCities = filteredCities.filter(
        city => city !== e.target.textContent
      )
    } else {
      filteredCities.push(e.target.textContent)
    }
    getData()
    e.target.classList.toggle('primary')
  })
})

// Pagination
const pagination = document.querySelectorAll('.pagnition')

pagination.forEach(button => {
  button.addEventListener('click', e => {
    index = Number(e.target.textContent)
    getData()

    pagination.forEach(btn => {
      btn.classList.remove('primary')
    })
    e.target.classList.add('primary')
  })
})
