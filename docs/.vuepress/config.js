const path = require("path")

module.exports = {
  title: 'Wh@t !s Development?',
  description: '배워가고 있는 현업..? 대학생 개발자',
  markdown: {
    anchor:{
      permalink: false, permalinkBefore: false, permalinkSymbol: ''
    },
    lineNumbers:true
  },
  plugins:[
    'latex'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@image': path.resolve(__dirname, "../images")
      }
    }
  }
}
