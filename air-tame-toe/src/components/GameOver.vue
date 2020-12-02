<template>
  <fragment>
    <div class="game-over" v-if="winState">
      {{ winState === 'draw' ? 'DRAW' : `${winState} WINS` }}
      <div @click="resetBoard" class="reset"> Reset </div>
    </div>
  </fragment>
</template>

<script>
import { Fragment } from "vue-fragment";

export default {
  name: "Home",
  components: {
    Fragment,
  },

  computed: {
    winState() {
      return this.$store.state.winState;
    },
  },

  methods: {
    resetBoard() {
      this.$store.commit("resetState");
    }
  },
};
</script>

<style scoped lang="scss">
.game-over {
  @include overlay();
  grid-template-rows: 1fr auto;
  color: $accent-color;
  font-size: 26vw;
  background-color: rgba($primary-color, 0.8);

  .reset {
    @include button();
  }
}
</style>