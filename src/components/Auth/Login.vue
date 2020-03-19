<template>
    <div>
        <div style="width:100%; height:100%">
            <img class="bgimg-1" src="../img/login-bg-new.png" 
                style="
                opacity: 1.0;
                background-position: center;
                background-repeat: no-repeat;
                object-fit: cover;
            ">
      
            <div class="quote">
                "MANAGEMENT IS DOING THINGS RIGHT,<br>
                BUT LEADERSHIP IS DOING RIGHT THINGS"
            </div>
        </div>

        <div class="login-form" style="margin-left:60%; width:320px;">
            <span class="image1"><img src="../img/eboard.png" style="width:40%; height:20%; margin-left:5%;"></span>
            <span class="image2"><img src="../img/stl.png" style="width:40%; height: 20%; margin-left:10%"></span>

        <h4>Login to your account: </h4>
        <hr>
        <form class = "login" @submit.prevent="login">
        <p style="text-align:center; color:red; font-weight:bold;">{{error}}</p>
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-paper-plane"></i></span>
                    <input type="email" class="form-control" name="email" id="email" placeholder="Email" v-model="input.email" />
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    <input type="password" class="form-control" name="password" id="password" placeholder="Password" v-model="input.password" />
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    <input class="form-control" name="companyCode" id="companyCode" placeholder="Company Code" />
                </div>
            </div>    

            <div class="form-group">
                <button type="submit" class="btn btn-danger" style="color:#fff; margin-bottom:15px;">Log In</button>
           </div>    
           
            <div class="forgot">
                <!-- <p>Forgot Password?</p> -->
            </div>
        </form>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import UserData from '../repository/UserData';

  export default {
    name: 'Login',

    data(){
      return {
        ip: "",
        input:{
        //   companyCode: "",
          email : "",
          password : "",
        },
        error: "",        
        // stl: {},
      }
    },

    mounted(){
       axios({ method: "GET", "url": "https://httpbin.org/ip" }).then(result => {
                this.ip = result.data.origin;
            }, error => {
                console.error(error);
            });
      },

    methods: {
        login: function () {
            let email = this.input.email;
            let password = this.input.password;
            this.$store.dispatch("login", {email, password})
                .then(() => {
                    this.$router.push("/dashboard");
                })
                .catch(error => {
                    console.log(error);
                })
        },

        sendData() {
          const formData = new FormData();
          formData.append('companyCode', this.input.companyCode);
          formData.append('model', "requestUserLogin");
          formData.append('mobileVersion', "11.4.1");
          formData.append('deviceName', "ipad air 2");
          formData.append('deviceToken', "b41dfaf1ba018196d5068a0ecc3bde33f83c94131ecf71d053260b944da14612");
          formData.append('userName', this.input.userName);
          formData.append('userPassword', this.input.userPassword);
          formData.append('eboardVersion', "2.5.7"); 
          
          let userName = this.input.userName;
          UserData.setUserName(userName);

          let userPassword = this.input.userPassword;
          UserData.setUserPassword(userPassword);

          let companyCode = this.input.companyCode;
          UserData.setCompanyCode(companyCode);

          axios.post(UserData.getBaseUrl(), formData)
            .then(result => {
              this.response = result.data;
                if(this.response.success == 1){
                  this.$store.commit("setAuthentication", true);
                    let token = this.response.accessToken;
                    UserData.setAccessToken(token); 
                      let userId = this.response.userId;
                      UserData.setUserId(userId);
                        let companyId = this.response.companyDetail.companyId;
                        UserData.setCompanyId(companyId);
                          this.$router.replace({ name: "dashboard" });
                          this.$router.push("/dashboard");  
              }
                else{
                  this.error = this.response.message;
                }
          }, error => {
              console.error(error);
          });    
        },

        reloadPage(){
          window.location.reload();
        }, 
      },             
    }
</script>

<style scoped>
 .success-message {
    color: green;
  }

  body, html {
    height: 100%;
    margin: 0;
    font: 400 15px/1.8 "Lato", sans-serif;
    color: #777;
    position: relative;
}

  .caption {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    color: #000;
  }

  .quote {
    position: absolute;
    left: 0;
    top: 34%;
    width: 50%;
    color: #fff;
    margin-left: 11%;
    margin-right:2%;
    font-size:28px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .footer-text{
    position: absolute;
    left:63%;
    top: 75%;
    width: auto;
    color: #fff;
    margin-left: 3%;
    font-size:15px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 2px;
  }
  
  .caption span.border {
    background-color: #111;
    color: #fff;
    padding: 18px;
    font-size: 25px;
    letter-spacing: 10px;
  }
  
  h3 {
    letter-spacing: 5px;
    text-transform: uppercase;
    font: 20px "Lato", sans-serif;
    color: #111;
  }

 .login-form{
    position: absolute;
    height:auto;
    background: #fff;
    border-radius: 5px;
    top:29%;
  }

  .login-form h4{
    text-align: center;
  }

  .login-form .form-group{
    width:80%;
    margin-left:10%;
    margin-top:7%;
  }

   .login-form .form-group .btn{
    float: right;
    width: 100%;
  }

  .login-form .fa-paper-plane {
    width:18px;
  }

  .login-form .fa-lock{
    width: 18px;
  }

 .login-form .forgot{
    float: right;
    color: red;
    margin-right:10%;
    margin-top: 4%;
    margin-bottom:4%;
}

 .input-group-addon {
    background: #CACFD2;
    width: 25px;
    padding-top: 4px;
    text-align: center;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
 
</style>