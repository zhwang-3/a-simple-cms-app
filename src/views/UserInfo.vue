<template>
    <div class="plane">
        <h2>用户资料</h2>
        <br><br>
        <div v-if="userInfo.phone">
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    输入用户昵称：
                </i-Col>
                <i-Col span="1"></i-Col>
                <i-Col span="12" class="left">
                    <i-Input v-model="userInfo.nickname" :value="userInfo.nickname" placeholder="输入昵称" style="width: auto" />
               </i-Col>
             </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    输入电话：
                </i-Col>
                <i-Col span="1"></i-Col>
                <i-Col span="12" class="left">
                    <i-Input v-model="userInfo.phone" :value="userInfo.phone" placeholder="输入电话" style="width: auto" />
                </i-Col>
            </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    输入年龄：
                </i-Col>
                <i-Col span="1"></i-Col>
                <i-Col span="12" class="left">
                    <i-Input v-model="userInfo.age" :value="userInfo.age" placeholder="输入年龄" type="number" style="width: auto" />
                </i-Col>
            </i-Row>
            <div v-show="!changePsd">
            <br>
                <i-Button @click="changeUserInfo">修改资料</i-Button>
                &nbsp; &nbsp; &nbsp;
                <i-Button @click="showCPsd">修改密码</i-Button>
            </div>
            <div v-show="changePsd">
                <i-Row class="text-item">
                    <i-Col span="11" class="right">
                        输入密码：
                    </i-Col>
                    <i-Col span="1"></i-Col>
                    <i-Col span="12" class="left">
                        <i-Input v-model="password" type="password" placeholder="输入密码" style="width: auto" />
                    </i-Col>
                </i-Row>
                <i-Row class="text-item">
                    <i-Col span="11" class="right">
                        再次输入密码：
                    </i-Col>
                    <i-Col span="1"></i-Col>
                    <i-Col span="12" class="left">
                        <i-Input v-model="repassword" type="password" placeholder="重新输入密码" style="width: auto" />
                    </i-Col>
                </i-Row>
                <br>
                <i-Button @click="changeUserInfo">修改资料</i-Button>
            </div>
        </div>
        <div v-else>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    用户名：
                </i-Col>
                <i-Col span="1"></i-Col>
                <i-Col span="12" class="left">
                    {{ userInfo.username }}
               </i-Col>
            </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    昵称：
                </i-Col>
                <i-Col span="1"></i-Col>
                <i-Col span="12" class="left">
                    {{ userInfo.nickname }}
               </i-Col>
            </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    年龄：
                </i-Col>
                <i-Col span="1"></i-Col>
                <i-Col span="12" class="left">
                    {{ userInfo.age }}
               </i-Col>
            </i-Row>
            <i-Row class="text-item">
                <i-Col span="11" class="right">
                    性别：
                </i-Col>
                <i-Col span="1"></i-Col>
                <i-Col span="12" class="left">
                    {{ userInfo.sex }}
               </i-Col>
            </i-Row>
        </div>
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
    export default {
        name: 'UserInfo',
        components: {},
        data() {
            return {
                userInfo: {},
                // 是否显示修改密码框
                changePsd: false,
                password: '',
                repassword: ''
            }
        },
        created: function() {
            if('username' in this.$route.params) {
                this.$api.get('users/user/info/' + this.$route.params.username).then((res) => {
                    if(res.code === 0) {
                        this.userInfo = res.data
                    } else {
                        this.$Notice.open({
                            title: '错误',
                            desc: '用户信息错误',
                            duration: 5
                        })
                        if(res.code === 403) {
                            this.$router.push({path: '/login'})
                        }
                    }
                })
            }
        },
        methods: {
            showCPsd() {
                this.changePsd = true
            },
            // 修改资料
            changeUserInfo() {
                // 构造修改字符串
                let data = {
                    nickname: this.userInfo.nickname,
                    age: this.userInfo.age,
                    phone: this.userInfo.phone
                }
                if(this.password == "") { 
                    this.changeInfo(data)
                } else {
                    // 修改密码
                    if(this.repassword === this.password) {
                        let data = { password: this.password}
                        this.changeInfo(data)
                    } else {
                        this.$Notice.info({
                            title: '提示',
                            desc: '两次输入不一致'
                        })
                    }
                }
            },
            // 统一的提交方法
            changeInfo(data) {
                this.$api.post('users/user/changeInfo', data).then((res) => {
                    this.$Notice.info({
                        title: '提示',
                        desc: res.message
                    })
                })
            }
        }
    }
</script>