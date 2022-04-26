<template>
    <div>
        <i-Drawer title="用户管理菜单" placement="left" :closable="false" v-model="value2">
            <p @click="goUrl('article')">文章编写</p>
            <p @click="goUrl('type')">类型管理</p>
            <p @click="goUrl('articles')">文章管理</p>
            <p @click="goUrl('indexChange')">主页管理</p>
            <p @click="goUrl('users')">用户管理</p>
        </i-Drawer>
        <i-Button class="admin-btn" @click="value2 = true" type="primary">导航菜单</i-Button>
        <router-view />
    </div>
</template>
<style>
    .admin-btn {
        position: fixed;
        right: 10vw;
        top: 30vh
    }
</style>
<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {
                value2: true
            }
        },
        methods: {
            goUrl(url) {
                this.$router.push({ path:'/admin/' + url })
            }
        }
    }
</script>