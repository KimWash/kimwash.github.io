const path = require("path")

module.exports = {
  base: "/kimwash.github.io/",
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
