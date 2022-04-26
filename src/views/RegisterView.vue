<template>
    <div class="plane">
        <h2>注册</h2>
        <br><br>
        <div>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    输入用户名:
                </i-col>
                <i-Col span="1" />
                <i-Col span="12" class="left">
                    <i-Input v-model="username" placeholder="输入用户名（登录唯一凭证）" style="width: auto" />
                </i-Col>
            </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    输入密码：
                </i-Col>
                <i-Col span="1" />
                <i-Col span="12" class="left">
                    <i-Input v-model="password" type="password" placeholder="输入密码" style="width: auto" />
                </i-Col>
            </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    再次输入密码：
                </i-Col>
                <i-Col span="1" />
                <i-Col span="12" class="left">
                    <i-Input v-model="repassword" type="password" placeholder="重新输入密码" style="width: auto" />
                </i-Col>
            </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    输入用户昵称：
                </i-Col>
                <i-Col span="1" />
                <i-Col span="12" class="left">
                    <i-Input v-model="nickname" placeholder="输入昵称" style="width: auto" />
                </i-Col>
            </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    输入电话：
                </i-Col>
                <i-Col span="1" />
                <i-Col span="12" class="left">
                    <i-Input v-model="phone" placeholder="输入电话" style="width: auto" />
                </i-Col>
            </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    输入年龄：
                </i-Col>
                <i-Col span="1" />
                <i-Col span="12" class="left">
                    <i-Input v-model="age" placeholder="输入年龄" style="width: auto" />
                </i-Col>
            </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    选择性别：
                </i-Col>
                <i-Col span="1" />
                <i-Col span="12" class="left">
                    <i-RadioGroup v-model="sex">
                        <i-Radio value="male">男</i-Radio>
                        <i-Radio value="female">女</i-Radio>
                    </i-RadioGroup>
                </i-Col>
            </i-Row>       
        </div>
        <br>
        <i-Button type="primary" v-on:click="register">用户注册</i-Button>
    </div>
</template>
<style>
    .plane {
        padding: 10vw 20vw;
    }

    .text-item {
        padding-top: 10px;
    }
</style>
<script>
    import { Radio, RadioGroup } from 'view-design'
    export default {
        name: 'RegisterView',
        components: {
            'i-Radio': Radio,
            'i-RadioGroup': RadioGroup
        },
        data() {
            return {
                sex: 'male',
                username: '',
                password: '',
                repassword: '',
                nickname: '',
                age: 0,
                phone: ''
            }
        },
        created: function() {
            
        },
        methods: {
            register() {
                if(this.username && this.password && this.repassword) {
                    if(this.password === this.repassword) {
                        let data = {
                            phone: this.phone ? this.phone : '未知',
                            nickname: this.nickname ? this.nickname : '未知',
                            age: this.age ? this.age : '未知',
                            sex: this.sex ? this.sex : '未知',
                            username: this.username,
                            password: this.password
                        }
                        this.$api.post('users/register', data).then((res) => {
                            this.$Notice.info({
                                title: '提示',
                                desc: res.message
                            })
                            if(res.code === 0) {
                                 sessionStorage.setItem('token', res.data.token)
                                this.$router.push({ path: '/login' })
                            }
                        })
                    } else {
                        this.$Notice.open({
                            title: '错误',
                            desc: '内容输入错误，密码输入错误',
                            duration: 5
                        });
                    }
                } else {
                    this.$Notice.open({
                        title: '错误',
                        desc: '内容输入有误，请输入必要信息',
                        duration: 5
                    });
                }
            }
        }
    }
</script>