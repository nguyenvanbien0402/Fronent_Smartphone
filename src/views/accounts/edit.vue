<template>


<NavBar/>
     <div id="layoutSidenav" >
   <SideBar/>

         <!-- <router-view/>   -->
         <div id="layoutSidenav_content" style="margin-top: 30px">
     <main>
       <div class="container-fluid px-4">
         <div class="container">
           <h4 class="bg-primary text-white p-2 ">Tài Khoản</h4>
           <ul class="nav nav-tabs" id="myTab" role="tablist">
             <li class="nav-item">
               <a
                 class="nav-link"
                 id="profile-tab"
                 data-toggle="tab"
                 href="#profile"
                 role="tab"
                 aria-controls="profile"
                 aria-selected="false"
                 > <RouterLink style="text-decoration: none; color: inherit;" to="/account/list">Danh sách</RouterLink></a
               >
             </li>
             <li class="nav-item">
               <a
                 class="nav-link active"
                 id="home-tab"
                 data-toggle="tab"
                 href="#home"
                 role="tab"
                 aria-controls="home"
                 aria-selected="true"
                 >Thêm mới</a
               >
             </li>
           </ul>
           <div class="tab-content" id="myTabContent">
             <div
               class="tab-pane fade show active col-md-10"
               id="home"
               role="tabpanel"
               aria-labelledby="home-tab"
             >
               <div class="row d-flex justify-content-between">
                 <form @submit.prevent="save()">
                   <div class="d-flex justify-content-between">
                     <div class="col-md-6">
                       <div class="form-group">
                         <label for="">Họ và tên</label>
                         <input type="text" class="form-control"
                         v-model="account.fullname" 
                         @keydown ="validated()"/>
                         <div class="text-danger"  v-if="errors.fullname">{{ errors.fullname }}</div>
                       </div>
                       <div class="form-group">
                         <label for="">Email</label>
                         <input type="text" class="form-control" 
                         v-model="account.email"
                         @keydown ="validated()"/>
                         <div class="text-danger"  v-if="errors.email">{{ errors.email }}</div>
                       </div>

                       <div class="form-group">
                         <label for="">Số điện thoại</label>
                         <input type="text" class="form-control" 
                         v-model="account.phone" 
                         @keydown ="validated()"/>
                         <div class="text-danger"  v-if="errors.phone">{{ errors.phone }}</div>
                       </div>


                     </div>
                     <div class="col-md-6">
                       <div class="form-group">
                         <label for="">Mật khẩu</label>
                         <input type="text" class="form-control"
                         v-model="account.password" 
                         @keydown ="validated()" />
                         <div class="text-danger"  v-if="errors.password">{{ errors.password }}</div>
                       </div>
                       <div class="form-group">
                         <label for=""> Nhập lại mật khẩu</label>
                         <input type="password" class="form-control"
                         v-model="account.password" 
                         @keydown ="validated()"/>
                         <div class="text-danger"  v-if="errors.password">{{ errors.password }}</div>
                       </div>

                       <div class="form-group">
                         <p>Quyền</p>
                         <div class="d-flex justify-content-between">
                           <div class="form-check col-lg-6">
                             <input
                               class="form-check-input"
                               type="radio"
                               name="flexRadioDefault"
                               id="flexRadioDefault1"
                               value="true" v-model="account.admin"
                             />
                             <label
                               class="form-check-label"
                               for="flexRadioDefault1"
                             >
                               Admin
                             </label>
                           </div>
                           <div class="form-check col-lg-6">
                             <input
                               class="form-check-input"
                               type="radio"
                               name="flexRadioDefault"
                               id="flexRadioDefault2"
                               checked
                               value="false" v-model="account.admin"
                             />
                             <label
                               class="form-check-label"
                               for="flexRadioDefault2"
                             >
                               User
                             </label>
                           </div>
                         </div>
                       </div>
                       <div class="form-group">
                         <p>kích hoạt</p>
                         <div class="d-flex justify-content-between">
                           <div class="form-check col-lg-6">
                             <input
                               class="form-check-input"
                               type="radio"
                               name="flexRadioDefault1"
                               id="flexRadioDefault3"
                               value="true" v-model="account.activated"
                             />
                             <label
                               class="form-check-label"
                               for="flexRadioDefault1"
                             >
                               có
                             </label>
                           </div>
                           <div class="form-check col-lg-6">
                             <input
                               class="form-check-input"
                               type="radio"
                               name="flexRadioDefault1"
                               id="flexRadioDefault4"
                               checked
                               value="false" v-model="account.activated"
                             />
                             <label
                               class="form-check-label"
                               for="flexRadioDefault2"
                             >
                               Không
                             </label>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>

                   <div class="form-group">
                     <button class="btn btn-primary" type="submit">Thêm mới</button>
                     <button class="btn btn-danger">Hủy bỏ</button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </div>
       </div>
     </main>
  <Footer/>
   </div>      
     </div>
  
</template>

<script>
import NavBar from '../layouts/NavBar.vue'
import Footer from '../layouts/Footer.vue'
import SideBar from '../layouts/SideBar.vue'
export default {
 components:{ Footer, NavBar, SideBar },
 name: 'accountEdit',
 data() {
     return {
         
         errors: {
         fullname: '',
         email: '',
         password:'',
 
         },
        account : {
         fullname: '',
         email: '',
         password:'',
         phone:'',
         admin:'',
         activated:''
        },
 
     }
 }, 
 created() {
 let accountId = this.$route.params.id
  this.getAcount(accountId)
 },
 methods: {
     validated() {
        
         let isValid = true
         this.errors =  {
         fullname: '',
         email: '',
         password:'',
         phone:''
         }

        if(! this.account.fullname) {
         this.errors.fullname = "Chưa nhập họ và tên"
         isValid = false
        }

        if(! this.account.email) {
         this.errors.email = "Chưa nhập email"
         isValid=false
        }
        if(! this.account.password) {
         this.errors.password = "Chưa nhập mật khẩu"
         isValid=false
        }
        if(! this.account.phone) {
         this.errors.phone = "Chưa nhập số điện thoại"
         isValid=false
        }

        return isValid
     },
     
     reload() {
       location.reload()  
     },
     save() {
         if(this.validated()) {
          this.$request.put('http://localhost:8082/api/update-account/' + this.$route.params.id,
          this.account).then(res=> {
            console.log(this.$route.params.id)
             if(res.data.success) {
                 this.$router.push({name: 'accountList'})
             } else {
                 alert('không thể thêm mới')
             }
           })
         }
     },
     getAcount(accountId) {
          this.$request.get('http://localhost:8082/api/account/' + accountId).then(res=>{
                    this.account = res.data.data;
                    this.account.password=''
               })
        }
 }
}
</script>
