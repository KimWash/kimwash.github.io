const path = require("path")

module.exports = {
  title: 'kimwash.github.io',
  description: 'Awesome description',
  markdown: {
    anchor:{
     permalink: false, permalinkBefore: false, permalinkSymbol: ''
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@image': path.resolve(__dirname, "../images")
      }
    }
  }
}
