<template>
    <div>
        <!--文章列表-->
        <div class="article-list">
            <i-Row type="flex" justify="space-around" class="code-row-bg">
                <i-Col span="24">
                    <ArticleList :list="list" :title="listTitle"></ArticleList>
                </i-Col>
            </i-Row>
        </div>
    </div>
</template>
<script>
    import ArticleList from '../components/ArticleList'
    
    export default {
        name: 'CollectionsView',
        components: {
            ArticleList
        },
        data() {
            return {
                list: [],
                listTitle: '收藏文章'
            }
        },
        created: function() {
            // 获取所有收藏的文章
            this.$api.get('users/user/saveList').then((res) => {
                let tData = []
                res.data.map((item) => {
                    if(item.a_id != 0) {
                        tData.push({ id: parseInt(item.a_id), title: item.title })
                    }
                })
                this.list = tData
            })
        }
    }
</script>