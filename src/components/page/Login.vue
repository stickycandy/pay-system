<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username" style="height: 50px">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="code-content">
                    <el-form-item prop="code">
                    <el-input
                        placeholder="code"
                        v-model="param.code"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-message"></el-button>
                    </el-input>
                </el-form-item>
                <img @click="refreshCode" class="code-img" width="130"                      height="50px":src="codeUrl" alt="" />
                </div>
                
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 请填写正确的用户名和密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/login';
export default {
    data: function() {
        return {
            param: {
                username: 'admin',
                password: '', // jiutian
                code: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
            },
            codeUrl: '/admin/code.php?r='+ Math.random(),
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    login(this.param).then(res => {
                        if (res.code !== 0) {
                            this.$alert(res.msg, '信息', {
                                type: 'error',
                            })
                            return;
                        }
                        this.$message.success('登录成功');
                        localStorage.setItem('ms_username', this.param.username);
                        this.$router.push('/');
                    })
                    .catch(error => {
                        console.error(error);
                    })
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        refreshCode() {
            this.codeUrl = '/admin/code.php?r=' + Math.random();
        },
    },
};
</script>

<style lang="less">
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    margin: -190px 0 0 -250px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.el-form-item__content {
    height: 50px;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.el-input {
    height: 50px;
}
.el-input .el-input__inner {
    height: 50px !important;
    line-height: 50px;
}
.code-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .el-form-item {
        flex: 1;
        .el-input__inner {
            border-right: none;
            border-radius: 0;
        }
    }
    .code-img {
        cursor: pointer;
        border: 1px solid #DCDFE6;
        border-radius: 0 4px 4px 0;
        border-left: none;
    }
}
</style>