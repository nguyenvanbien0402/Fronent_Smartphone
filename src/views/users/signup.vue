<template>

    <section class=" slider" >
             
             <div class="container">
                 <div class="row d-flex justify-content-center " >
                       <div class="col-md-7 ">
                            
                        <div class="card-body  mx-md-4">
              
                            <div class="text-center mb-5 mt-2">
                            <img src="../images/logo-text.png"
                              style="width: 300px;" alt="logo">
                          </div>
          
                          
                      <form class="card p-5 mb-2" @submit.prevent = save()>
                        <h5>Nhập thông tin</h5>
      
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example11">Họ và tên</label>
                          <input type="text" id="form2Example11" v-model="user.name" class="form-control"
                          @keydown ="validated()"
                            />
                            <div class="text-danger"  v-if="errors.name">{{ errors.name }}</div>
                         
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example11">Email</label>
                            <input type="email" id="form2Example11" v-model="user.email" class="form-control"
                            @keydown ="validated()"
                           />
                           <div class="text-danger"  v-if="errors.email">{{ errors.email }}</div>
                          </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example22">Mật khẩu</label>
                          <input type="password" v-model="user.password" id="form2Example22" class="form-control"
                          @keydown ="validated()" />
                          <div class="text-danger"  v-if="errors.password">{{ errors.password }}</div>
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example22">Xác nhận mật khẩu</label>
                            <input type="password" id="form2Example22" v-model="repass" class="form-control"
                            @keydown ="validated()" />
                            <div class="text-danger"  v-if="errors.repass">{{ errors.repass }}</div>
                          </div>
        
      
                        <div class="text-center pt-1  ">
                          <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Đăng ký</button>
                        </div>
                      </form>
                        </div>
                       </div>
                 </div>
             </div>
              </section>
        
        
    </template>
    
    <script>
export default {
        name: 'userRegister',
        data() {
            return {
                user: {
                  name:'',
                  email: '',
                  password: ''
                },
                errors: {
                  name:'',
                  email: '',
                  password: '',
                 repass:''
                }
            }
        },
        methods: {
          validated() {
            
            let isValid = true
                this.errors =  {
                 name:'',
                 email:'',
                 password:'',
                 repass:''
                }
    
                if(! this.user.name) {
                this.errors.name = "Chưa nhập họ và tên"
                isValid = false
               }
               if(! this.user.email) {
                this.errors.email = "Chưa nhập email"
                isValid = false
               }
    
               if(! this.user.password) {
                this.errors.password = "Chưa nhập mật khẩu"
                isValid=false
               }
               if(! this.repass) {
                this.errors.repass = "Chưa xác nhận mật khẩu"
                isValid=false
               }
           
           
               return isValid
          }, 
          save() {
            if(this.validated()) {
                this.$request.post('http://localhost:8082/api/signup', this.user ).then(res=> {
                  console.log(this.validated())
                  if(res.data.success ) {
                    this.$swal.fire('Đăng ký thành công', '', 'success')
                    this.$router.push({name: 'userHome'})
                  } 
                })
            }
    
          }
        }
    }
    </script>