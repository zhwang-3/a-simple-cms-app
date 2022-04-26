<template>
    <div>
        <!--文章列表-->
        <div class="list-manager">
            <i-Row type="flex" justify="space-around" class="code-row-bg">
                <i-Col span="15">
                    <i-List>
                        <i-ListItem v-for="item in list" :key="item.id" class="item">
                            <i-ListItemMeta :title="item.username" :description="'ip地址：'+ item.ip" />
                            <template slot="action">
                                <li>
                                    <i-Button @click="online(item.username)">
                                        {{ item.login == 0 ? '封停' : '解封' }}
                                    </i-Button>
                                </li>
                            </template>
                        </i-ListItem>
                    </i-List>
                </i-Col>
            </i-Row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AdminUsers',
        components: {},
        data() {
            return {
                list: []
            }
        },
        created: function() {
            this.getUsers()
        },
        methods: {
            online(username) {
                this.$api.get('admin/stopLogin/' + username).then((res) => {
                    this.$Notice.info({
                        title: '提示',
                        desc: res.message
                    })
                    this.getUsers()
                })
            },
            getUsers() {
                // 获取所有用户
                this.$api.get('admin/getAllUser').then((res) => {
                    console.log(res.data)
                    this.list = res.data
                })
            }
        }
    }
</script>
