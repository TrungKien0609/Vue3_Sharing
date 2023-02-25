<template>
  <div class="container">
    <div class="donut multi"></div>
  </div>
</template>
<style scoped lang="scss">
.container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .donut {
    width: 2rem;
    height: 2rem;
    margin: 2rem;
    border-radius: 50%;
    border: 0.3rem solid rgba(green, 0.3);
    border-top-color: green;
    animation: 1.5s spin infinite linear;

    &.multi {
      border-bottom-color: green;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
    