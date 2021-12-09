<template>
    <div class="page post">
        <div class="columns">
            <div class="column">
                <p class="title is-4">{{$page.frontmatter.title}}</p>
            </div>
            <div class="column is-2">
                <p class="subtitle is-5 date">{{$page.frontmatter.date}}</p>
            </div>
        </div>
        <Content style="paddig:0"/>
        <Disqus class="comment"/>
    </div>
</template>
<script>
import Disqus from "./Disqus.vue"
export default {
    components: {
        Disqus
    },
    created() {
        console.log(this.$page)
    }
}
</script>
<style>
.subtitle.is-5.date {
    text-align: right;
}
@media screen and (min-width:1024px) {
    .post {
        padding: 0 10vw;
    }
}
.post {
    margin-top:5vh
}
.comment {
    margin-top:20vh
}
</style>
<style scoped>
.token.number {
    font-size: 0.8rem !important;
    padding:0 !important;
}
</style>