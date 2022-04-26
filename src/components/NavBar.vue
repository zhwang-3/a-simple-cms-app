
<template>
    <div>
        <i-Menu mode="horizontal" :theme="themel" active-name="1">
            <i-MenuItem name="1">
                <div class="main">
                    <i-Icon type="md-book"/>
                    <router-link to="/">
                        {{index}}
                    </router-link>
                </div>
            </i-MenuItem>
            <i-MenuItem v-for="item in menu" :name="item.name" :key="item.name">
                <router-link :to="item.src">
                    {{item.name}}
                </router-link>
            </i-MenuItem>
            <i-MenuItem name="2">
                <i-Dropdown v-if="userBtn">
                    <a href="javascript:void(0)">
                        用户：{{username}}
                        <i-Icon type="arrow-down-b"></i-Icon>
                    </a>
                    <i-DropdownMenu slot="list">
                        <i-DropdownItem>
                            <div v-on:click="goUrl('/userInfo/' + username)">个人信息</div>
                        </i-DropdownItem>
                        <i-DropdownItem>
                            <div v-on:click="goUrl('/mail')">我的私信</div>
                        </i-DropdownItem>
                        <i-DropdownItem>
                            <div v-on:click="goUrl('/collections')">我的收藏</div>
                        </i-DropdownItem>
                        <i-DropdownItem>
                            <div v-on:click="exit">退出</div>
                        </i-DropdownItem>
                    </i-DropdownMenu>
                </i-Dropdown>
                <router-link v-if="!userBtn" :to="{ path: '/login'}">登录</router-link> 
            </i-MenuItem>
        </i-Menu>
    </div>
</template>
<style scoped>
    .main{
        font-weight: 600;
    }
    a {
        color: #333;
    }
</style>
<script>
    import { Menu, MenuItem, Icon, Dropdown, DropdownMenu, DropdownItem } from 'view-design'
    export default {
        name: "NavBar",
        data() {
            return {
                menu: [],
                index: 'MySite',
                themel: 'light',
                userBtn: 'false',
                username: ''
            }
        },
        components: {
            'i-Menu': Menu,
            'i-MenuItem': MenuItem,
            'i-Icon': Icon,
            'i-Dropdown': Dropdown,
            'i-DropdownMenu': DropdownMenu,
            'i-DropdownItem': DropdownItem
        },
        created() {
            // 获取导航菜单
            this.$api.get('getNavmenu').then((res) => {
                // 写数据
                this.menu = res.data
            })
            setInterval(() => {
                console.log("轮询")
                // 获取用户 Token 是否存在
                if(sessionStorage.getItem('token')) {
                    this.userBtn = true
                    this.username = sessionStorage.getItem('username')
                } else {
                    this.userBtn = false
                }
            }, 3000)
        },
        updated() {
        },
        methods: {
            // 用户退出
            exit() {
                console.log(sessionStorage.getItem('token'))
                sessionStorage.removeItem('token')
                console.log(sessionStorage.getItem('token'))
            },
            goUrl(url) {
                this.$router.push({ path: url })
            }
        }
    }
</script>