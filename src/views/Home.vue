<template>
  <v-container>
    <ImageUploader @upload-complete="loadGallery"/>
    <ImageMasonryList :images="images" :columns="columns"/>
  </v-container>
</template>

<script>
import ImageUploader from '../components/ImageUploader'
import ImageMasonryList from '../components/ImageMasonryList'
import firebase from '@/firebase/init'

export default {
  components: {
    ImageUploader,
    ImageMasonryList
  },
  data: () => ({
    images: [],
    columns: 3
  }),
  created: function () {
    this.loadGallery()
  },
  methods: {
    loadGallery () {
      this.images = []

      // Create a reference under which to list
      var listRef = firebase.storage().ref('public_wall')

      // Find all the prefixes and items.
      listRef.listAll().then((res) => {
        res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        })
        res.items.forEach((itemRef) => {
          var object = { src: itemRef.getDownloadURL() }
          this.images.push(object)
        })
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
