<template>

    <section class="  container-fluid  slider" >
             
             <div class="container">
                 <div class="row d-flex justify-content-center " >
                       <div class="col-md-7 ">
                            
                        <div class="card-body  mx-md-4 ">
              
                          <div class="text-center mb-5 mt-2">
                            <img src="../images/logo-text.png"
                              style="width: 300px;" alt="logo">
                          </div>
          
                          <form @submit.prevent="save()" class="card p-5">
                            <h5>Nhập thông tin</h5>
                            <div class="form-outline mb-4">
                              <label class="form-label" for="form2Example11">Email</label>
                              <input type="email" id="form2Example11" class="form-control"
                              v-model="user.email" 
                            
                                 /> 
                                 
                              
                            </div>
          
                            <div class="form-outline mb-4">
                              <label class="form-label" for="form2Example22">Mật khẩu</label>
                              <input type="password" id="form2Example22" class="form-control" 
                              v-model="user.password" 
                              
                              />
                           
                           
                            </div>
          
                            <div class="text-center pt-1 mb-5 pb-1">
                              <button @click="save()" class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">
                                Đăng nhập
                                </button>
                            <RouterLink to="/email/form"> <a class="text-muted" href="#!">Quên mật khẩu?</a></RouterLink> 
                            </div>
          
                            <div class="d-flex align-items-center justify-content-center pb-4">
                              <p class="mb-0 me-2">bạn không có tài khoản?</p> &nbsp;
                              <RouterLink to="/user/signup" style="text-decoration: none; color: inherit;"><button type="button" class="btn btn-outline-danger">Tạo tài khoản</button></RouterLink>
                         
                            </div>
          
                          </form>
          
                        </div>
                       </div>
                 </div>
             </div>
              </section>
              <div class="slider " style="height: 140px;">

              </div>
        
        
    </template>
    
    <script>

    export default {
        name: 'userLogin',
        data() {
            return {
                user: {
                  email: '',
                  password: ''
                }
          
            }
        },
        methods: {
          validated() {
            
            let isValid = true
          
               if(! this.user.email) {
              
                isValid = false
               }
    
               if(! this.user.password) {
           
                isValid=false
               }
               
               return isValid
          }, 
          save() {
      
            if(this.validated()) {
                this.$request.post('http://localhost:8082/api/signin', this.user ).then(res=> {
                  if(res.data.success && res.data.data.admin===false) {
                    localStorage.setItem( 'token', JSON.stringify(res.data.data.token) );
                    localStorage.setItem( 'name', JSON.stringify(res.data.data.name) );
                    localStorage.setItem( 'userId', JSON.stringify(res.data.data.id) );
                    localStorage.setItem('photo',JSON.stringify(res.data.data.photo))
                    this.$router.push({name: 'userHome'})
                 
                  } else  if(res.data.success && res.data.data.admin===true){
                    this.$request.post('http://localhost:8082/api/signin', this.user ).then(res=> {
                      localStorage.setItem( 'token', JSON.stringify(res.data.data.token) )
                      this.$router.push({name: 'indexView'})
                     
                 })
                  }
                }).catch(res => {
                          this.$swal.fire('Sai tài khoản hoặc mật khẩu')
                    })   
            } else {
              alert("Nhập thông tin đăng nhập")
            }
    
          }
        }
    }
    </script>
    

 