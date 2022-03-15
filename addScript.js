document.forms.properties.addEventListener('submit', e => {
  e.preventDefault()

  const image = e.target.elements.image.value.trim()
  const price = Number(e.target.elements.price.value.trim())
  const description = e.target.elements.description.value.trim()
  const city = e.target.elements.cities.value.trim()
  const data = { image, price, description, city }

  return postData(data)
})

function displayError (message) {
  let h3 = document.querySelector('.content > h3')
  h3.innerHTML = ''
  return (h3.innerHTML = JSON.stringify(message))
}

const postData = async properties => {
  try {
    const res = await fetch('https://radial-reinvented-shoe.glitch.me/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(properties)
    })
    const data = await res.json()
    console.log(data)
  } catch (error) {
    displayError(error.message || 'Failed to post data')
  }
}
