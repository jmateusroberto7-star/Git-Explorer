const button = document.getElementById("search-btn")

button.addEventListener("click", buscarUsuario)

async function buscarUsuario() {

    const username = document.getElementById("username").value
    
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json() 

    console.log(data)
}