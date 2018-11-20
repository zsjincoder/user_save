<template>
  <div class="LogBody">
    <div class="LoginFrom">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" style="width: 100%" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="ruleForm2.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
          <el-button v-if="!areYouReg" type="primary" @click="toRegister()">注册</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {setSessionStore,setMd5} from "@/lib/util";
  import {userLogin} from "@/api/user.js"
  export default {
    name: "login",
    data() {
      return {
        ruleForm2: {
          name:'zsjin',
          pass: '123456',

        },
        areYouReg:true,
        rules2: {
          name:{required:true,message:"请输入姓名",trigger:"blur"},
          pass: [
            {required:true,message:"请输入密码",trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data={
              name:this.ruleForm2.name,
              pwd:this.ruleForm2.pass,
              oldYear:parseInt(this.ruleForm2.age)
            }
            const param=new FormData()
            param.append("userName",this.ruleForm2.name);
            param.append("password",setMd5(this.ruleForm2.pass));
            console.log(setMd5(this.ruleForm2.pass));
            userLogin(param).then(res=>{
              if(res.status==this.$global.StatusOk){
                  setSessionStore("token",res.data.token);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      toRegister(){

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .LogBody{
    width: 100%;
    height: 938px;
    background: url("../../assets/pig.jpg");
  }
  .LoginFrom {
    position: absolute;
    right: 20px;
    top:120px;
    width: 400px;
    height: 200px;
    opacity: 0.7;
  }
  .LoginFrom .demo-ruleForm{

  }
</style>
