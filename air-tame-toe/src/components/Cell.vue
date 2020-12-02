<template>
  <div class="cell" @click="$emit('cell-click')">
    <span class="value" v-if="value !== ''">{{ value }}</span>
    <span class="placeholder" v-if="!value">{{currentPlayer}}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },

  computed: {
    currentPlayer() {
      return this.$store.state.currentPlayer;
    },
  },
};
</script>

<style scoped lang="scss">
.cell {
  @include super-center();
  width:  $square-size;
  height: $square-size;

  background-color: $secondary-color;
}

.value {
  animation-duration:0.2s;
  animation-name: zoom-in;

  font-size: $font-size;
}

.placeholder {
  font-size: 0rem;
}

.cell:hover {
  .placeholder {
    color: rgba($accent-color, 0.8);
    font-size: $font-size;
    animation: wiggle 0.2s infinite;
  }
}

@keyframes zoom-in {
  from {
    font-size: 0rem;
  }

  to {
    font-size: $font-size;
  }
}

@keyframes wiggle {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-2deg); }
  100% { transform: rotate(0deg); }
}

</style>