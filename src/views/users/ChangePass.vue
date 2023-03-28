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
                        <h5>Thay đổi mật khẩu</h5>
      
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example11">Mật khẩu mới</label>
                          <input type="password" id="pass" v-model="password" class="form-control"
                          @keydown ="validated()" 
                            />
                            <div class="text-danger"  v-if="errors.password">{{ errors.password }}</div>
                         
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example11">Nhập lại mật khẩu mới</label>
                            <input type="password" id="repass" v-model="repass" class="form-control"
                            @keydown ="validated()" 
                           />
                           <div class="text-danger"  v-if="errors.repass">{{ errors.repass }}</div>
                          </div>
 
                        <div class="text-center pt-1  ">
                          <button  class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Cập nhật </button>
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
        name: 'ChangePass',
        data() {
            return {
                  userId:'',
                  password:'',
                  repass: '',
         
                errors: {
                  password:'',
                  repass: '',
                }
            }
        },
        created() {
         this.userId = JSON.parse(localStorage.getItem('userId'))
        },
        methods: {
          validated() {
            
            let isValid = true
                this.errors =  {
                 password:'',
                 repass:'',
                }
                if(! this.password) {
                this.errors.password = "Chưa nhập mật khẩu"
                isValid = false
               }
               if(! this.repass) {
                this.errors.repass= "Chưa xác nhập xác nhận lại mật khẩu"
                isValid = false
               }
               return isValid
          }, 
          save() {
            if(this.password!=this.repass) {
                  alert('Mật khẩu không khớp , nhập lại ')
                  isValid = false
                }
            if(this.validated()) {
              const data = new FormData();
              data.append('newpass',this.password)
              data.append('userId',this.userId)
                this.$request.post('http://localhost:8082/api/change-password',data ).then(res=> {
                  if(res.data) {
                    this.$swal.fire('Thay đổi mật khẩu thành công', '', 'success')
                    this.$router.push({name: 'userHome'})
                  } 
                })
            }
    
          }
        }
    }
    </script>