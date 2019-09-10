<template>
  <v-container>
    <div :style="style">
      <div class="card" v-for="(image, index) in images" :key="index">
          <img :src="image.src.i">
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  props: ['images', 'columns'],
  name: 'ImageMasonryList',
  computed: {
    style () {
      return 'column-count: ' + this.columns
    }
  }
}
</script>
<style>
img {
  padding: 10px 5px;
  width: 100%;
  display: inline-block;
  width: 100%;
}
</style>
