<template>
    <div class="type">
        <i-Divider />
        <i-List item-layout="vertical">
            <i-ListItem v-for="mail in mails" :key="mail.m_id">
                <router-link :to="/mailGetter/+mail.m_id">
                    <i-ListItemMeta title="私信" :description="mail.users[1]+'与'+mail.users[0]" />
                </router-link>
            </i-ListItem>
        </i-List>
    </div>
</template>
<script>
    export default {
        name: "MailsView",
        components: {},
        data() {
            return {
                mails: []
            }
        },
        created: function() {
            // 获取私信
            this.$api.get('users/user/mailsget').then((res) => {
                if(res.code === 0) {
                    this.mails = res.data
                } else {
                    this.info(res.message)
                }
                console.log(this.mails)
            })
        },
        methods: {
            info(text) {
                this.$Notice.info({
                    title: '提示',
                    desc: text
                });
            },
            getArticleTalk(id) {
                // 获取所有评论
                this.$api.get('getArticleTalk/' + id).then((res) => {
                    this.articleTalk = res.data
                    console.log(this.articleTalk)
                })
            }
        },
    }
</script>