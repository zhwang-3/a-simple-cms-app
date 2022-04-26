<template>
    <div class="footer">
        <div v-for="item in footer" :key="item.name" class="footer-div">
            {{item.name}}：
            <router-link :to="item.src">
                {{item.text}}
            </router-link>
        </div>
        <div class="icp">
            {{icp}}
        </div>
    </div>
</template>
<style scoped>
    .footer {
        background: #444;
        color: azure;
        min-height: 200px;
        position: relative;
    }
    .footer a {
        color: aliceblue;
    }
    .footer-div {
        padding-top: 20px;
    }
    .icp {
        position: absolute;
        bottom: 10px;
        color: darkgrey;
        width: 100vw;
    }
</style>
<script>
    export default {
        name: "PageFooter",
        data() {
            return {
                footer: [],
                icp:"CopyRight © 2020 | 京 ICP 备 0000"
            }
        },
        created() {
            // 获取 footer 菜单
            this.$api.get('getFooter').then((res) => {
                this.footer = res.data
            })
        }
    }
</script>