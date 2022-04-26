<template>
    <div>
        <!--文章列表-->
        <div class="article-list">
            <i-Row type="flex" justify="space-around" class="code-row-bg">
                <i-Col span="24">
                    <ArticleList :list="list" :title="listTitle">
                    </ArticleList>
                </i-Col>
            </i-Row>
        </div>
    </div>
</template>

<script>
    import ArticleList from '../components/ArticleList'
  
    export default {
        name: 'ArticleType',
        components: {
            ArticleList
        },
        data() {
            return {
                list: [],
                listTitle: '所有文章',
            }
        },
        created: function() {
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
        },
        methods: {
            getArticleTalk(id) {
                // 获取评论
                this.$api.get('getArticleTalk/' + id).then((res) => {
                    this.articleTalk = res.data
                    console.log(this.articleTalk)
                })
            }
        }
    }
</script>