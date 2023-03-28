<template>
    


        <NavBar/>
        <div id="layoutSidenav" >
          <SideBar/>

            <!-- <router-view/>   -->
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h3 class="mt-4 bg-primary text-white p-2" >THỐNG KÊ</h3>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Thống kê số lượng từng mục </li>
                        </ol>
                        <div class="row">
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-primary text-white mb-4">
                                    <div class="card-body">SỐ LƯỢNG NGƯỜI DÙNG</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <h3>{{ user }}</h3>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-warning text-white mb-4">
                                    <div class="card-body">SỐ LƯỢNG SẢN PHẨM</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <h3>{{ product }}</h3>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-success text-white mb-4">
                                    <div class="card-body">SỐ LƯỢNG ĐƠN HÀNG</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <h3>{{ order }}</h3>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-danger text-white mb-4">
                                    <div class="card-body">SỐ LƯỢNG  MỤC SẢN PHẨM</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <h3>{{ category }}</h3>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
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
import Footer from '../layouts/Footer.vue'
import SideBar from '../layouts/SideBar.vue'
import NavBar from '../layouts/NavBar.vue'
 export default {
    components:{Footer,NavBar,SideBar},
    name:'indexList',
    data() {
         return {
                 order:'',
                 user:'',
                 product:'',
                 category:''
         }
    },
    created() {
      this.getAll()
      localStorage.removeItem('name')
    },
    methods:{
         getAll() {
            this.$request.get('http://localhost:8082/api/amount-user').then(res=>{
                       
                        this.user = res.data.data;  
                   
                                 
            })

            this.$request.get('http://localhost:8082/api/amount-category').then(res=>{
                        
                        this.category = res.data.data;  
                   
                                 
            })
            this.$request.get('http://localhost:8082/api/amount-product').then(res=>{
          
                        this.product = res.data.data;  
                      
                                 
            })
            this.$request.get('http://localhost:8082/api/amount-order').then(res=>{
         
                        this.order = res.data.data;  
            })
         },
    }
 }
</script>