// https://superheroapi.com/api/access-token/character-id
const SUBERHERO_TOKEN = '5662900827142014'
const BASE_URL = `https://superheroapi.com/api.php/${SUBERHERO_TOKEN}`

const newHeroButton = document.getElementById("newHeroBtn") 
const heroImageDiv = document.getElementById('heroImage')

const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')


const getSuberHero = (id, name) => {
    fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
        console.log(json)
        const suberHero = json
        showHeroInfo(suberHero)
    })
}

const statToEmoji = {
    intelligence : "🧠",
    strength : "💪",
    speed : "⚡",
    durability : "🏋️",
    power : "📊",
    combat : "⚔️"
}

const showHeroInfo = (character) => {
    const name = `<h1>${character.name}</h1>`

    const img = `<img src="${character.image.url}" height = 200 wigth=200/>`
    
    const stats = Object.keys(character.powerstats).map(stat => {
        return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
    }).join("")
    heroImageDiv.innerHTML = `${name}${img}${stats}`
}

const getSearchSuberHero = (name) => {
    fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
        const hero = json.results[0]
        showHeroInfo(hero)
    })
}

const randomSuberHeroId = () =>{
    const numberOfHeroes = 731 
    return Math.floor(Math.random() * numberOfHeroes) + 1
}

newHeroButton.onclick = () => getSuberHero(randomSuberHeroId())
searchButton.onclick = () => getSearchSuberHero(searchInput.value)

