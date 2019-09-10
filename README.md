# image_uploader
The purpose of this webapp is to learn and demonstrate my aility to both upload and get images from firebase storage.

To accomplish this I have built a public image wall. Anyone can upload images using the image upload component. All images in the storage bucket are then shown in the image masonry list component.

In order to prevent overload or abuse of the webapp a cloud function will delete the oldest image once the image count excedes the maximum numbe rof images allowed. The maximum numbr of images allowed at this time is 10.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
