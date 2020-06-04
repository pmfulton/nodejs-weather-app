const dataCardGenerate = (divID) => {
    const dataCard = document.getElementById(divID)
    dataCard.className = dataCard.className = "card border-success mb-3 main-content"
    dataCard.style = "max-width: 30rem;"
    dataCard.innerHTML = `
                        <div class="card-header"><strong id="message-1"></strong></div>
                        <div class="card-body">
                            <ul>
                                <li>
                                    <p id="message-2"></p>
                                </li>
                                <li>
                                    <p id="message-3"></p>
                                </li>
                            </ul>
                        </div>
                    `
}

const progressBar = (divID) => {



}

const navToggle = document.getElementById("toggle")
const navToggleClick = navToggle.addEventListener('click', (e) => {
    if (navToggle.getAttribute("aria-expanded")) {
        navToggle.setAttribute("aria-expanded", true)
        const list = document.getElementById('navbarColor01')
        const targ = document.getElementById('drop').innerHTML(list)

    }
    
})