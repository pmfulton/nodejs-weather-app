const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




const searchLocation = weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading........'
    messageTwo.textContent = ''
        fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data.forecast.temp)
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `Here is the current temperature in ${data.location}:`
                messageTwo.textContent = `${JSON.stringify(data.forecast.temp)} degrees Faranheit.`
            }
        }) 
    })
})



