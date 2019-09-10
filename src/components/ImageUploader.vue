<template>
  <v-container style="height: 100%;">
      <v-row
        align-content="center"
        justify="center"
      >
        <h1>Image Uploader</h1>
      </v-row>
      <v-row
        align-content="center"
        justify="center"
      >
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple accent-4"
            rounded
            height="6"
            :value="uploadPercentage"
            id="uploader"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row
        align-content="center"
        justify="center"
      >
        <v-col
          class="align-content-center"
          cols="4"
        >
          <v-file-input
            v-model="file"
            accept="image/*"
            label="choose an image"
            outlined
            @change="onFileChange"
            ></v-file-input>
        </v-col>
        <v-col
          class="align-content-center mt-2"
          cols="2"
        >
          <v-btn
            @click="onUpload"
          >
            Upload
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import firebase from '@/firebase/init'

export default {
  data: () => ({
    file: null,
    imageURL: null,
    uploadPercentage: 0
  }),
  methods: {
    onFileChange () {
      if (this.file !== null) {
        let reader = new FileReader()
        reader.onload = () => {
          reader.imagUrl = reader.result
        }
        reader.readAsDataURL(this.file)
      }
    },
    clearFile () {
      this.file = null
      this.imageURL = null
      this.uploadPercentage = 0
    },
    onUpload () {
      let _self = this

      // create a firebase storage ref
      var storageRef = firebase.storage().ref('public_wall/' + this.file.name)

      // upload file
      var task = storageRef.put(this.file)

      // update progress bar
      task.on('state_changed',
        function (snapshot) {
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          _self.uploadPercentage = percentage
        },

        function error (err) {
          console.log(err)
        },

        function completed () {
          _self.$emit('upload-complete')
          _self.clearFile()
        }

      )
    }
  }
}
</script>
