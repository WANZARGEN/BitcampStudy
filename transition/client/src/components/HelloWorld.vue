<template>
  <div class="hello">
    
    <div class="text-center">
      <img class="logo" src="../assets/logo.png">
      <img class="logo" src="../assets/logo.png">
      <img class="logo" src="../assets/logo.png">
    </div>

    <div class="separator"></div>

    <div class="text-center">
      <div class="img-container"><img class="logo" src="../assets/logo.png"></div>
      <div class="img-container"><img class="logo" src="../assets/logo.png"></div>
      <div class="img-container"><img class="logo" src="../assets/logo.png"></div>
    </div>


    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
  }
}
</script>

<style scoped lang="scss">
.text-center {
  text-align: center;
}
img {
  width: 100px;
  margin: 20px;
}
.separator {
  border-bottom: 1px solid gray;
}
.img-container {
  img {
    filter: sepia();
  }
}

</style>
