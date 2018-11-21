<template>
  <div class="LogBody">
    <div class="LoginFrom">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" style="width: 100%"
               class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="ruleForm2.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm2.sex" placeholder="性别" style="width: 300px">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm2.age"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="ruleForm2.birth" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 300px"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {setMd5} from "@/lib/util";
  import {userRegister} from "@/api/user.js"

  export default {
    name: "register",
    data() {
      let checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 500);
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          name: 'zsjin',
          pass: '123456',
          checkPass: '123456',
          age: '',
          sex: null,
          birth: ''
        },
        rules2: {
          name: {required: true, message: "请输入姓名", trigger: "blur"},
          pass: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
          age: [
            {required: true, validator: checkAge, trigger: 'blur'}
          ],
          sex: {required: true, message: "请选择性别", trigger: "change"},
          birth: {required: true, message: "请选择出生日期", trigger: "change"}
        }
      };
    },
    methods: {
      submitForm(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              name: this.ruleForm2.name,
              pwd: setMd5(this.ruleForm2.pass),
              sex: parseInt(this.ruleForm2.sex),
              oldYear: parseInt(this.ruleForm2.age),
              birth: this.ruleForm2.birth,
            }
            userRegister(data).then(res => {
              if(res.data.code==this.$global.StatusOk)
              {
                this.$router.push("login");
                self.$Message.info(res.data.Tips+','+res.data.msg)
              } else {
                self.$Message.info(res.data.Tips+','+res.data.msg)
              }

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .LogBody {
    width: 100%;
    height: 938px;
    background: url("../../assets/pig.jpg");
  }

  .LoginFrom {
    position: absolute;
    right: 20px;
    top: 120px;
    width: 400px;
    height: 200px;
    opacity: 0.7;
  }

  .LoginFrom .demo-ruleForm {

  }
</style>
