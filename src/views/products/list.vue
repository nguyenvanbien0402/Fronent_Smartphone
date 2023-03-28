<template>
     <NavBar/>
        <div id="layoutSidenav" >
         <SideBar/>

            <!-- <router-view/>   -->
            <div id="layoutSidenav_content" style="margin-top: 30px">
        <main>
          <div class="container-fluid px-4">
            <div class="container">
              <h4 class="bg-primary text-white p-2">Sản Phẩm</h4>
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
                    > <RouterLink  style="text-decoration: none; color: inherit;" to="/product/edit">Thêm mới</RouterLink></a
                  >
                </li>
             
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane show active fade col-md-12"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <table class="table">
                    <thead>
                      <tr >
                        <th>Số thứ tự</th>
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Danh mục sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Giảm giá</th>
                        <th>Số lượng</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr  v-for=" ( pro ,index) in products">
                        <td>{{ index +1}}</td>
                        <td>{{ pro.name }}</td>
                        <td>
                          <img class="card_image"  :src="getImgUrl(pro.photo)" style="width: 70px; height: auto;"   alt=""/>
                        </td>
                        <td>{{ pro.type }}</td>
                        <td>{{format( pro.price )}}</td>
                        <td>{{ pro.discout }}%</td>
                        <td>{{ pro.quantity }}</td>
                        <td>
                          <RouterLink :to="{name:'productDoEdit',params: {id:pro.id}}">
                        <button class="btn btn-warning">Cập nhật</button>
                        </RouterLink> &puncsp;
                        <button  class="btn btn-danger" @click="onDelete(pro.id)">Xóa</button>
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
  components:{
    Footer,NavBar,SideBar
  },
    name:'productList',
    data() {
         return {
               products:[],
               hinhanh:''
         }
    },
    created() {
      this.getAll()
    },
    methods:{
      format(price) {
                    if (typeof price !== "number") {
                  return price;
              }
              var formatter = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'VND'
              });
              return formatter.format(price);
         },
         getAll() {
            this.$request.get('http://localhost:8082/api/all-product').then(res=>{
                        this.products = res.data;
            })
         },
         getImgUrl(hinhanh) {
            return require('@/assets/images/'+hinhanh)
        },
         onDelete(productId) {

            this.$swal.fire({
            title: 'Xác nhận xóa ?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'có',
            cancelButtonText: 'không',
            }).then((result) => {
            if (result.isConfirmed) {
             this.$request.delete('http://localhost:8082/api/delete-product/' + productId ).then(res=> {
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