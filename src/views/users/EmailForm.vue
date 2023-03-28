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
                        <h5>Nhập tài khoản email</h5>
      
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example11">Email</label>
                          <input type="text" id="form2Example11" v-model="email" class="form-control"
                 
                            />
                            <div class="text-danger"  v-if="errors.email">{{ errors.email }}</div>
                         
                        </div>
                       
  
                        <div class="text-center pt-1  ">
                          <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Gửi </button>
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
        name: 'EmailForm',
        data() {
            return {
           
                 email:'',
          
                errors: {
                  email:'',
                }
            }
        },
        methods: {
          validated() {
            
            let isValid = true
                this.errors =  {
                 email:'',
             
                }
    
                if(! this.email) {
                isValid = false
               }

               return isValid
          }, 
          save() {
            if(this.validated()) {
              const email =  new FormData();
              email.append('email', this.email)
                this.$request.post('http://localhost:8082/api/update-reset-token-user', email ).then(res=> {
                  if(res.data ) {
                        alert('Chúng tôi đã gửi link thay đổi mật khẩu tới Email của bạn, Vui lòng kiểm tra !')
                  } else {
                        alert('Email sai hoặc không tồn tại, Vui lòng kiểm tra lại !')
                  }
                })
            } else {
              alert('Nhập tài khoản email')
            }
    
          }


        }
    }
    </script>