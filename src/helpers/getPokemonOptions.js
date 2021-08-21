import pokemonApi from "../api/pokemonApi"

const getPokeons = () => {
  return [
    Math.floor(Math.random() * 650) + 1,
    Math.floor(Math.random() * 650) + 1,
    Math.floor(Math.random() * 650) + 1,
    Math.floor(Math.random() * 650) + 1,
  ]
}

const getPokemonOptions = async() => {
  const pokemonsName = await getPokemonsName(getPokeons())
  //console.table(pokemonsName)
  return pokemonsName
}

const getPokemonsName = async ([a, b, c, d] = []) => {
  
  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ]

  const [p1, p2, p3, p4] = await Promise.all(promiseArr)

  return [
    {name: p1.data.name, id: p1.data.id},
    {name: p2.data.name, id: p2.data.id},
    {name: p3.data.name, id: p3.data.id},
    {name: p4.data.name, id: p4.data.id},
  ]
  
}

export default getPokemonOptions