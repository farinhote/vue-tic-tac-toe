<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: Moon;
  src: url("./assets/moon.ttf") format("truetype");
}

#app {
  font: 100% $font;
  color: $primary-color;
  background-color: $secondary-color;
  min-height: 100vh;
}

// Minimal CSS reset
html {
  box-sizing: border-box;
  font-size: 16px;
}

html, body {
  min-height: 100vh;
  user-select: none;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
