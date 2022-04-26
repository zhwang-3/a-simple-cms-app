<template>
    <div class="article">
        <!--面包屑分类导航-->
        <div class="type">
            <i-Breadcrumb>
                <i-BreadcrumbItem to="/">
                    <i-Icon type="ios-home-outline"></i-Icon>
                    主页
                </i-BreadcrumbItem>
                <i-BreadcrumbItem to="/articles">
                    <i-Icon type="logo-buffer"></i-Icon>
                    全部文章
                </i-BreadcrumbItem>
                <i-BreadcrumbItem :to="{path: '/articleType', query: {type: article.type}}">
                    <i-Icon type="ios-cafe"></i-Icon>
                    {{article.typename}}
                </i-BreadcrumbItem>
                <i-BreadcrumbItem :to="'/article/'+article.a_id">
                    <i-Icon type="ios-body"></i-Icon>
                    {{article.title}}
                </i-BreadcrumbItem>
            </i-Breadcrumb>
        </div>
        <!--显示小标签-->
        <div>
            <i-Tag v-for="item in article.tag" :key="item">
                <router-link :to="{ path: '/articleType', query: { tag:item }}">
                    {{item}}
                </router-link>
            </i-Tag>
        </div>
        <!--文章详情-->
        <div>
            <h2> {{article.title}} </h2>
            <p class="article-p"> {{Date(article.time)}} </p>
            <p class="article-p"> 作者：{{article.writer}} 浏览量：{{article.view}} 收藏：{{article.like}} </p>
            <!--显示 HTML 内容-->
            <div v-html="article.text" class="article-text"></div>
        </div>
        <!--增加用户相关的功能-->
        <!--收藏和点赞-->
        <div>
            <i-Button @click="aLike(article.a_id, 1)" type="info" ghost>
                <i-Icon type="ios-arrow-up" />赞
            </i-Button>
            <i-Button @click="aLike(article.a_id, 0)" type="info" ghost>
                <i-Icon type="ios-arrow-down" />踩
            </i-Button>
        </div>
        <!--收藏-->
        <span>
            <i-Button @click="collection(article.a_id)" type="text">
                <i-Icon type="ios-heart" />收藏
            </i-Button>
        </span>
        <!--评论详情-->
        <div class="type">
            <i-Divider />
                <i-List item-layout="vertical">
                    <i-ListItem v-for="talk in articleTalk" :key="talk.talk">
                        <i-ListItemMeta :title="talk.username" :description="Date(talk.date)" />
                        {{talk.talk}}
                    </i-ListItem>
                </i-List>
        </div>
        <div>
            <!--评论-->
            <Talk :a_id="article.a_id"></Talk>
        </div>
    </div>
</template>
<style>
    .type {
        text-align: left;
    }

    .article {
        padding: 40px 10vw 40px 10vw;
    }

    .article-p {
        color: #aaa;
    }

    .article h2 {
        padding: 20px;
    }

    .article-text {
        padding: 20px 10vw 20px 10vw;   
    }
</style>
<script>
    import Talk from '../components/TalkCompo.vue'
    export default {
        name: 'ArticleView',
        components: {
            Talk
        },
        data() {
            return {
                article: {},
                articleTalk: []
            }
        },
        created: function() {
            if('id' in this.$route.params) {
                let id = this.$route.params.id
                console.log(this.$route.params.id)
                // 获取文章
                this.$api.get('getArticle/' + id).then((res) => {
                    if(res.code === 0) {
                        this.article = res.data
                        console.log(this.article)
                    } else {
                        this.info(res.message)
                    }
                    // 编写为方法，供子组件调用
                    this.getArticleTalk(id)
                })

                // 判断用户是否看过这篇文章，如果是第一次看，则调用浏览量 +1 的 API
                let view = localStorage.getItem('article_' + id)
                console.log(view)
                if(view) {
                    // 如果有数据则数据 +1
                    localStorage.setItem('article_' + id, parseInt(view) + 1)
                } else {
                    // 增加次数
                    this.$api.get('viewArticle_' + id).then((res) => {
                        console.log(res)
                    })
                    localStorage.setItem('article_' + id, 1)
                }
            }
        },
        methods: {
            info(text) {
                this.$Notice.info({
                    title: '提示',
                    desc: text
                })
            },
            // 获取所有评论
            getArticleTalk(id) {
                this.$api.get('getArticleTalk/' + id).then((res) => {
                    this.articleTalk = res.data
                    console.log(this.articleTalk)
                })
            },
            // 收藏该文章
            collection(id) {
                this.$api.get('users/user/save/' + id).then((res) => {
                    this.info(res.message)
                })
            },
            // 通过传递参数的不同进行"赞"和"踩"的判断
            aLike(id, like) {
                if(localStorage.getItem('article_' + id + '_like')) {
                    this.info('您已经进行过了选择')
                } else {
                    this.$api.get('users/user/like/' + id + '/' + like).then((res) => {
                        this.info(res.message)
                        localStorage.setItem('article_' + id + '_like', 1)
                    })
                }
            }
        }
    }
</script>