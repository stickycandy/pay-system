<template>
    <div class="websiteInformation">
        <div class="basicTitle">
            <span class="block"></span>
            网站信息配置
        </div>
        <div class="websiteInformationForm">
            <el-form :inline="true" :model="websiteInformationForm">
                <el-form-item label="机器人token:">
                    <el-input v-model="websiteInformationForm.bot_token" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="机器人账号:">
                    <el-input v-model="websiteInformationForm.bot_number" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="网站名称:">
                    <el-input v-model="websiteInformationForm.sitename" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="关键字:">
                    <el-input v-model="websiteInformationForm.keywords" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="网站描述:">
                    <el-input v-model="websiteInformationForm.description" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="公司/组织名称:">
                    <el-input v-model="websiteInformationForm.orgname" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="回调专用网址:">
                    <el-input v-model="websiteInformationForm.localurl" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="用户对接网址:">
                    <el-input v-model="websiteInformationForm.apiurl" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱:">
                    <el-input v-model="websiteInformationForm.email" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="客服ＱＱ:">
                    <el-input v-model="websiteInformationForm.kfqq" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="加群链接:">
                    <el-input v-model="websiteInformationForm.qqqun" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="APP下载链接:">
                    <el-input v-model="websiteInformationForm.appurl" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="用户验证方式:">
                    <el-select v-model="websiteInformationForm.verifytype" placeholder="请选择">
                        <el-option
                            v-for="item in verifytypeOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开放注册:">
                    <el-select v-model="websiteInformationForm.reg_open" placeholder="请选择">
                        <el-option
                            v-for="item in reg_openOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开启注册审核:" v-show="websiteInformationForm.reg_open != 0">
                    <el-select v-model="websiteInformationForm.user_review" placeholder="请选择">
                        <el-option
                            v-for="item in user_reviewOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注册付费:" v-show="websiteInformationForm.reg_open != 0">
                    <el-select v-model="websiteInformationForm.reg_pay" placeholder="请选择">
                        <el-option
                            v-for="item in reg_payOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户编辑自定义接口信息:">
                    <el-select v-model="websiteInformationForm.user_settings_edit" placeholder="请选择">
                        <el-option
                            v-for="item in user_settings_editOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="测试支付:">
                    <el-select v-model="websiteInformationForm.test_open" placeholder="请选择">
                        <el-option
                            v-for="item in test_openOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="测试支付收款商户ID:" v-show="websiteInformationForm.test_open != 0">
                    <el-input v-model="websiteInformationForm.test_pay_uid" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="测试支付开启验证码:" v-show="websiteInformationForm.test_open != 0">
                    <el-select v-model="websiteInformationForm.captcha_open_test" placeholder="请选择">
                        <el-option
                            v-for="item in captcha_open_testOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="极限验证码ID:">
                    <el-input v-model="websiteInformationForm.captcha_id" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="极限验证码密钥:">
                    <el-input v-model="websiteInformationForm.captcha_key" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="登录开启验证码:">
                    <el-select v-model="websiteInformationForm.captcha_open_login" placeholder="请选择">
                        <el-option
                            v-for="item in captcha_open_loginOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密钥登录:">
                    <el-select v-model="websiteInformationForm.close_keylogin" placeholder="请选择">
                        <el-option
                            v-for="item in close_keyloginOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户中心风格:">
                    <el-select v-model="websiteInformationForm.user_style" placeholder="请选择">
                        <el-option
                            v-for="item in user_styleOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公共静态资源CDN:">
                    <el-select v-model="websiteInformationForm.cdnpublic" placeholder="请选择">
                        <el-option
                            v-for="item in cdnpublicOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首页显示模式:">
                    <el-select v-model="websiteInformationForm.homepage" placeholder="请选择">
                        <el-option
                            v-for="item in homepageOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="显示网址URL:" v-show="websiteInformationForm.homepage == 2">
                    <el-input v-model="websiteInformationForm.homepage_url" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit" >确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            websiteInformationForm: {
                bot_token: "",
                bot_number: "",
                sitename: "",
                keywords: "",
                description: "",
                orgname: "",
                localurl: "",
                apiurl: "",
                email: "",
                kfqq: "",
                qqqun: "",
                appurl: "",
                verifytype: 0,
                reg_open: 2,
                user_review: 0,
                reg_pay: 0,
                reg_pay_price: 5,
                user_settings_edit: 0,
                test_open: 0,
                test_pay_uid: 1000,
                captcha_open_test: 0,
                captcha_id: "",
                captcha_key: "",
                captcha_open_login: 0,
                close_keylogin: 1,
                user_style: 0,
                cdnpublic: 2,
                homepage: 2,
                homepage_url: "",
            },
            verifytypeOption: [
                {
                    value: 0,
                    label:'邮箱验证'
                },
                {
                    value: 1,
                    label:'手机验证'
                }
            ],
            reg_openOption: [
                {
                    value: 0,
                    label:'关闭'
                },
                {
                    value: 1,
                    label:'开启'
                },
                {
                    value: 2,
                    label:'仅邀请注册'
                }
            ],
            user_reviewOption: [
                {
                    value: 0,
                    label:'关闭'
                },
                {
                    value: 1,
                    label:'开启'
                }
            ],
            reg_payOption: [
                {
                    value: 0,
                    label:'关闭'
                },
                {
                    value: 1,
                    label:'开启'
                }
            ],
            user_settings_editOption: [
                {
                    value: 0,
                    label:'关闭'
                },
                {
                    value: 1,
                    label:'开启'
                }
            ],
            captcha_open_testOption: [
                {
                    value: 0,
                    label:'关闭'
                },
                {
                    value: 1,
                    label:'开启'
                }
            ],
            test_openOption: [
                {
                    value: 0,
                    label:'关闭'
                },
                {
                    value: 1,
                    label:'开启'
                }
            ],
            captcha_open_loginOption: [
                {
                    value: 0,
                    label:'关闭'
                },
                {
                    value: 1,
                    label:'开启'
                }
            ],
            close_keyloginOption: [
                {
                    value: 0,
                    label:'关闭'
                },
                {
                    value: 1,
                    label:'开启'
                }
            ],
            homepageOption: [
                {
                    value: 0,
                    label:'默认显示首页'
                },
                {
                    value: 1,
                    label:'直接跳转登录页面'
                },
                {
                    value: 2,
                    label:'显示其它指定网址'
                },
            ],
            cdnpublicOption: [
                {
                    value: 0,
                    label:'七牛云CDN'
                },
                {
                    value: 1,
                    label:'360CDN'
                },
                {
                    value: 2,
                    label:'BootCDN'
                },
                {
                    value: 3,
                    label:'今日头条CDN'
                },
            ],
            user_styleOption: [
                {
                    value: 0,
                    label:'黑色（1）'
                },
                {
                    value: 1,
                    label:'黑色（2）'
                },
                {
                    value: 2,
                    label:'棕色（1）'
                },
                {
                    value: 3,
                    label:'棕色（2）'
                },
                {
                    value: 4,
                    label:'蓝色（1）'
                },
                {
                    value: 5,
                    label:'蓝色（2）'
                },
                {
                    value: 6,
                    label:'紫色（1）'
                },
                {
                    value: 7,
                    label:'紫色（2）'
                }
            ],
        }
    },
    methods: {
        /**
         * 确认修改
         */
        submit() {
            // 发送请求传递参数 this.websiteInformationForm
        }
    }
}
</script>

<style>

</style>