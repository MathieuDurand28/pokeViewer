const button = document.querySelector(".button")
const input = document.querySelector("#search")

button.addEventListener("click", () => {
    if (input.value === "") {
        alert("Votre recherche est vide.")
        return false
    }

    fetch('https://pokebuildapi.fr/api/v1/pokemon/'+input.value+"")
    .then((response) => response.json())
    .then((data) => viewer(data))
    .catch((data) => {alert("Pokémon inconnu")})
})

const viewer = (data) => {
    const view = document.querySelector(".view")
    const container = document.createElement("div")
    const title = document.createElement("h4")
    const heart = document.createElement("p")
    const defense = document.createElement("p")
    const attack = document.createElement("p")

    const pre_evol = document.createElement("p")
    const post_evol = document.createElement("p")

    const div_spec = document.createElement("div")
    const div_evol = document.createElement("div")
    const div_types = document.createElement("div")


    const img = document.createElement("img")
    const alreadyResult = document.querySelector(".container")

    if (alreadyResult) {
        alreadyResult.remove()
    }
    
    if (data) {
        container.className = "container"
        view.appendChild(container)
        img.className = "img_pokemon"
        img.src = data.image
        img.alt = "image du pokemon "+data.name

        title.innerHTML = data.name
        title.className = "pok-title"


        heart.innerHTML = "♥ "+data.stats.HP
        defense.innerHTML = "⛨ "+data.stats.defense
        attack.innerHTML = "⚔ "+data.stats.attack

        div_spec.className = "specs_title"
        div_spec.appendChild(heart)
        div_spec.appendChild(defense)
        div_spec.appendChild(attack)

        if (data.apiTypes.length > 0) {
            div_types.className = "div_types"
            for (let i = 0; i < data.apiTypes.length; i++) {
                const img_type = document.createElement("img")
                img_type.className = "img_type"
                img_type.alt = "Type "+data.apiTypes[i].name
                img_type.src = data.apiTypes[i].image
                div_types.appendChild(img_type)
            }
        }
        


        pre_evol.innerHTML = "Forme précédente: <span class='name'>"+data.apiPreEvolution.name+"</span>"
        post_evol.innerHTML = "Forme suivante: <span class='name'>"+data.apiEvolutions.name+"</span>"

        div_evol.className = "specs_evol"
        if (data.apiPreEvolution.name){
            div_evol.appendChild(pre_evol)
        }
        if (data.apiEvolutions.name){
            div_evol.appendChild(post_evol)
        }



        container.appendChild(img)
        container.appendChild(title)
        container.appendChild(div_types)
        container.appendChild(div_spec)
        container.appendChild(div_evol)
        
        console.log(data.name)
    }
}