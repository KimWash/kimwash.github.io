export default ({
  // Vue, // the version of Vue being used in the VuePress app
  // options, // the options for the root Vue instance
  router, // the router instance for the app
  // siteData // site metadata
}) => {
  // Restore saved scroll position when navigating back/forward,
  // otherwise scroll to the top of the page.
  router.options.scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }

  router.afterEach((to, from) => {
    if (from.path !== to.path) {
      if (typeof window !== 'undefined' && window.DISQUS) {
        setTimeout(() => {
          window.DISQUS.reset({ reload: true })
        }, 0)
      }
    }
  })
}