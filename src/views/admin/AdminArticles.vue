<template>
    <div>
        <!--文章列表-->
        <div class="list-manager">
            <i-Row type="flex" justify="space-around" class="code-row-bg">
                <i-Col span="15">
                    <i-List>
                        <i-ListItem v-for="item in list" :key="item.id" class="item">
                            <i-ListItemMeta :title="item.title" :description="Date(item.date)" />
                            <template slot="action">
                                <li>
                                    <i-Button @click="online(item.id)">
                                        {{item.show == 0 ? '上线' : '下线'}}
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
<style>
    .list-manager {
        text-align: left;
    }
</style>
<script>
    export default {
        name: 'AdminArticles',
        components: {},
        data() {
            return {
                list: [],
                listTitle: ''
            }
        },
        created: function() {
            this.getArticles()
        },
        methods: {
            online(id) {
                let data = {a_id: id}
                this.$api.post('admin/showArticle', data).then((res) => {
                    this.$Notice.info({
                        title: '提示',
                        desc: res.message
                    })
                    this.getArticles()
                })
            },
            getArticles() {
                // 获取所有文章
                this.$api.get('getNewArticle').then((res) => {
                    let tData = []
                    res.data.map((item) => {
                        if(item.id !== 0) {
                            tData.push(item)
                        }
                    })
                    this.list = tData
                })
            }
        }
    }
</script>