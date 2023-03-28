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
                        <h5>Cập nhật thông tin</h5>
      
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example11">Họ và tên</label>
                          <input type="text" id="form2Example11" v-model="user.fullname" class="form-control"
                          @keydown ="validated()"
                            />
                            <div class="text-danger"  v-if="errors.fullname">{{ errors.fullname }}</div>
                         
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example11">Email</label>
                            <input type="email" id="form2Example11" v-model="user.email" class="form-control"
                            @keydown ="validated()"
                           />
                           <div class="text-danger"  v-if="errors.email">{{ errors.email }}</div>
                          </div>
                          <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example11">Số điện thoại</label>
                            <input type="text" id="form2Example11" v-model="user.phone" class="form-control"
                            @keydown ="validated()"
                           />
                           <div class="text-danger"  v-if="errors.phone">{{ errors.phone }}</div>
                          </div>
                          <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example11">Ảnh đại diện</label>
                            <input type="file" id="form2Example11"  class="form-control"
                            @keydown ="validated()"
                            @change="uploadFile($event)" 
                           />
                      
                           <img class="card_image" v-if="photo && !fileSrc"   :src="getImgUrl(photo)" style="width: 100px; height: auto;" />
                           <img :src="fileSrc" style="width: 100px; height: auto;" alt=""/>
                          </div>
                        <div class="text-center pt-1  ">
                          <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Cập nhật </button>
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
        name: 'UpdateInfo',
        data() {
            return {
              fileSrc:'',
               photo:'',
                file:'',
                user: {
                  fullname:'',
                  email: '',
                  phone:'',
               
                },
                errors: {
                  fullname:'',
                  email: '',
                 phone:'',
                 photo:'',
                 file:''

                }
            }
        },
        created(){
        this.getInfo()
        localStorage.removeItem('name')
        },

        methods: {
          validated() {
            
            let isValid = true
                this.errors =  {
                 fullname:'',
                 email:'',
                 phone:'',
                 photo:''
                }
    
                if(! this.user.fullname) {
                this.errors.fullname = "Chưa nhập họ và tên"
                isValid = false
               }
               if(! this.user.email) {
                this.errors.email = "Chưa nhập email"
                isValid = false
               }
               if(! this.user.phone) {
                this.errors.phone = "Chưa nhập số điện thoại"
                isValid = false
               }
          
               return isValid
          }, 
          save() {  
              let userId = JSON.parse(localStorage.getItem('userId'))
            if(this.validated()) {
           
              const data = new FormData();
              data.append('fullname',this.user.fullname)
              data.append('phone',this.user.phone)
              data.append('email',this.user.email)
              data.append('photo',this.file)
                this.$request.put('http://localhost:8082/api/update-info-user/' + userId,data ).then(res=> {
                  if(res.data.success ) {
                    this.$swal.fire('Cập nhật thông tin thành công', '', 'success')
                    localStorage.setItem('name',JSON.stringify(this.user.fullname) )
                    this.$router.push({name: 'userHome'})
                  } 
                })
            }
    
          },
          getImgUrl(photo) {
            return require('@/assets/images/'+photo)
        },
          uploadFile(e) {
        this.file = e.target.files[0];
        this.fileSrc = window.URL.createObjectURL(this.file)
      },
          getInfo() {
             let userId = JSON.parse(localStorage.getItem('userId'))
                this.$request.get('http://localhost:8082/api/account/' + userId).then(res=> {
                     this.user = res.data.data
                     this.photo = res.data.data.photo
                    
                })
            
    
          }
        }
    }
    </script>