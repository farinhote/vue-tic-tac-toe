<template>
  <fragment>
    <Board />
    <GameOver />
  </fragment>
</template>

<script>
import Board from "@/components/Board.vue";
import GameOver from "@/components/GameOver.vue";
import { Fragment } from "vue-fragment";

export default {
  name: "Home",
  components: {
    Board,
    GameOver,
    Fragment,
  },
};
</script>