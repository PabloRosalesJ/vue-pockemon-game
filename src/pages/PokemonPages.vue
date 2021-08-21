<template>
  <h1>Quien es este pókemon ?</h1>

  <h2 v-if="!pokemon">Cargando ...</h2>

  <template v-else>
    <!-- img -->
    <PokemonPictre :pokemonId="pokemon.id" :showPokemon="showPokemon" />

    <p style="color: red">Tus vidas: {{ tryes }}</p>

    <!-- options -->
    <PokemonOptions :pokemons="pokemonArr" @pokemon-selected="checkPokemon" />
  </template>

  <template v-if="showPokemon">
    <h3>Felicidadez 🎉 heres un maéstro pókemon !👍✌</h3>
  </template>

  <template v-if="failed">
    <h3>Ups ese no es ... 🤔</h3>
  </template>

  <template v-if="gOver">
    <h3>Fin del juego 👀</h3>
  </template>
</template>

<script>
import PokemonPictre from "@/components/PokemonPictre.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";

import getPokemonOptions from "@/helpers/getPokemonOptions.js";

export default {
  components: { PokemonPictre, PokemonOptions },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      failed: false,
      gOver: false,
      tryes: 3,
    };
  },
  methods: {
    async pokemons() {
      this.pokemonArr = await getPokemonOptions();

      // seleccionar pokemon al azar
      const randomInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[randomInt];
    },
    checkPokemon(pokemon_id) {
      if (pokemon_id !== this.pokemon.id) {
        this.tryes--;
        this.failed = true;

        setTimeout(() => {
          this.failed = false;
        }, 1200);
      } else {
        this.showPokemon = true;
        this.newGame();
      }

      if (this.tryes === 0) {
        this.gameOver();
      }
    },
    gameOver() {
      this.failed = false;
      this.gOver = true;

      this.newGame();
    },
    newGame() {
      setTimeout(() => {
        this.gOver = false;
        this.tryes = 3;
        this.showPokemon = false;
        this.pokemon = null;
        this.pokemons();
      }, 2500);
    },
  },
  mounted() {
    this.pokemons();
  },
};
</script>
