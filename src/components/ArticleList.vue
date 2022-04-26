<template>
    <i-Card>
        <p slot="title">{{title}}</p>
        <p v-for="item in list" :key="item.id">
            <router-link :to="'article/'+item.id">
                {{item.title}}
            </router-link>
        </p>
    </i-Card>
</template>
<script>
    import { Card } from 'view-design'
    
    export default {
        name: "ArticleList",
        data() {
            return {}
        },
        components: {
            'i-Card' : Card
        },
        created() {},
        props: {
            title: String,
            list: Array
        }
    }
</script>