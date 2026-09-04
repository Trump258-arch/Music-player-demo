<template>
    <!-- 外层：铺满整个屏幕，用 flex 把登录框推到正中央 -->
    <div class="login-page">
        <div id="loginBG">
            <!-- 登录表单以后写在这里，#loginBG 里的 flex 会帮你把内容居中 -->
            <div id="loginImg" style="background-image: url(/img/icons/张雪峰老师.webp)"></div>
            <div id="loginForm">
                <p style="font-size: 30px;">登录牢大音乐盒</p>
                <p></p>
                <form>
                    <div class="subForm">
                        <span>账号</span>
                        <input type=text name="text" v-model="text">
                    </div>
                    <div class="subForm">
                        <span>密码</span>
                        <input type="password" name="psd" v-model="psd">
                    </div>
                    <button @click.prevent="clickHandler">登录</button>
                    <p>{{ loginStatus }}</p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// 用 axios 发请求必须先在文件顶部 import，否则 script 里 axios 是"未定义"的

export default {
    name: "Login",
    data() {
        // data 必须是函数且 return 一个对象，模板里的 {{ login }} 和 v-model 才有数据可用
        return {
            loginStatus: '',
            text: null,
            psd: null
        }
    },
    methods: {
        clickHandler() {
            const login = axios.create({
                baseURL: 'http://localhost:3000',
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // get(网址, 配置对象)：第二个参数必须包在大括号里，params 是它的一个属性
            login.get('/api/login', {
                params: {
                    username: this.text,
                    password: this.psd
                }
            }).then((res) => {
                if (res.data.status === 200) {
                    this.$router.push('/home')
                    localStorage.setItem('token', 'login-success-flag')
                } else {
                    this.loginStatus = '输入错误去见牢大'
                }
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }
}
</script>

<style scoped>
/* 铺满全屏：vh 是"视口高度"单位，100vh = 正好一整个屏幕高 */
.login-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    /* 水平居中"盒子" */
    align-items: center;
    /* 垂直居中"盒子" */
}

#loginBG {
    height: 600px;
    width: 800px;
    border-radius: 20px;
    background-color: rgba(180, 180, 180, 0.8);
    display: flex;
}

/* 注意：ID 选择器区分大小写，必须和模板里的 id="loginImg" 完全一致 */
#loginImg {
    height: 600px;
    width: 300px;
    background-size: cover;
    background-position: center;
    border-radius: 20px;
}

#loginForm {

    margin-left: 100px;
}

form input {
    height: 30px;
    width: 200px;
    border-radius: 10px;
}

.subForm {
    font-size: 25px;
    margin: 50px 0;
}

button {
    background-color: rgba(180, 180, 180, 1);
    font-size: 25px;
    height: 60px;
    text-align: center;
    width: 200px;
    border-radius: 15px;
}
</style>
