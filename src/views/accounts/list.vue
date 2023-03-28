<template>
       <NavBar/>
        <div id="layoutSidenav" >
            <SideBar/>

            <!-- <router-view/>   -->
            <div id="layoutSidenav_content" style="margin-top: 30px">
        <main>
          <div class="container-fluid px-4 ">
            <div class="container">
              <h4 class="bg-primary text-white p-2">Tài Khoản</h4>
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                    >Danh sách</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link "
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                    >  <RouterLink style="text-decoration: none; color: inherit;" to="/account/insert">Thêm mới</RouterLink></a
                  >
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active col-md-12"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Số thứ tự</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Quyền</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ac,index) in accounts">
                        <td>{{ index+1 }}</td>
                        <td> {{ ac.fullname }}</td>
                        <td>0{{ ac.phone }}</td>
                        <td>{{ ac.email }}</td>
                        <td v-if="ac.admin==true">quản trị viên</td>
                        <td v-if="ac.admin==false">người dùng</td>
                        <td v-if="ac.activated==true">kích hoạt</td>
                        <td v-if="ac.activated==false">chưa kích hoạt</td>
                        
                        <td>
             
                        <button class="btn btn-danger" @click="onDelete(ac.id)">Xóa</button>
                        </td>
                      </tr>
                 
                    </tbody>
                  </table>
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
    name:'accountList',
    data() {
         return {
               accounts:[],
         }
    },
    created() {
      this.getAll()
    },
    methods:{
         getAll() {
            this.$request.get('http://localhost:8082/api/all-account').then(res=>{
                        
                        this.accounts = res.data.data
            })
         },
         onDelete(accountId) {

            this.$swal.fire({
            title: 'Xác nhận xóa ?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'có',
            cancelButtonText: 'không',
            }).then((result) => {
            if (result.isConfirmed) {
             this.$request.delete('http://localhost:8082/api/delete-account/' + accountId
             ).then(res=> {
                if(res.data.success) {
                    this.$swal.fire('đã xóa', '', 'success')
                    this.getAll()
                }
             })
            
            } 
           })
         }
    }
 }
</script>
