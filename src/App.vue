<template>
  <router-view />
</template>

<style lang="scss">
@import "./style/reset";

@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

html {
  height: 100%;
  box-sizing: border-box;
  font-size: 16px;
}

h1 {
  font-size: 3rem;
}
h2 {
  font-size: 2.5rem;
}
h3 {
  font-size: 2rem;
}

body {
  height: 100%;
  width: 100%;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #525252;
  line-height: 1.4;
  font-weight: 400;
}

a {
  color: #1d1d1d;
  font-weight: 700;
}

small {
  font-size: 0.875rem;
}
</style>
