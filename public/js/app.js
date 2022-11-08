const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#ms1')
const messageTwo = document.querySelector('#ms2')
const messageThree = document.querySelector('#ms3')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''
    messageThree.textContent=''
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            console.log(response)
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.cityName
                messageTwo.textContent = data.temperature
                messageThree.textContent = data.description
            }
        })
    })



})
