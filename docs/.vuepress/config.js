const path = require("path")

module.exports = {
  title: 'Wh@t !s Development?',
  description: '배워가고 있는 현업..? 대학생 개발자',
  markdown: {
    anchor: {
      permalink: false, permalinkBefore: false, permalinkSymbol: ''
    },
    lineNumbers: true
  },
  head: [
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-C7NTCRQ25E",
      },
    ],
    ["script", {}, ["window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-C7NTCRQ25E');"]],
  ],
  plugins: [
    'latex',
    ["sitemap", { hostname: "https://blog.kimwash.xyz/" }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@image': path.resolve(__dirname, "../images")
      }
    }
  }
}
