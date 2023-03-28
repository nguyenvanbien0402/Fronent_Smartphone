<template>
       <NavBar/>
        <div id="layoutSidenav" >
            
          <SideBar/>
            <!-- <router-view/>   -->
            <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <div class="container">
            <h4 class="bg-primary text-white p-2 mt-4">Danh Mục Sản Phẩm</h4>
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
                  class="nav-link"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  <RouterLink
                    style="text-decoration: none; color: inherit"
                    to="/typeproduct/edit"
                    >Thêm mới</RouterLink
                  ></a
                >
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active col-md-8"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <table class="table">
                  <thead>
                    <tr>
                      <th>Số thứ tự</th>
                      <th>Danh mục sản phẩm</th>
                      <th>Tên hãng sản phẩm</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  v-for="(pro,index) in products.data">
                      <td>{{ index  + 1}}</td>
                      <td>{{ pro.name }}</td>
                      <td>{{ pro.nameVn }}</td>
                      <td>
                        <RouterLink :to="{name:'typeProductDoEdit',params: {id:pro.id}}">
                        <button class="btn btn-warning">Cập nhật</button>
                    </RouterLink> &puncsp;
                        <button class="btn btn-danger" @click="onDelete(pro.id)">Xóa</button>
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
import Footer from '../layouts/Footer.vue'
import NavBar from '../layouts/NavBar.vue';
import SideBar from '../layouts/SideBar.vue';

 export default {
  components:{
    Footer,
    NavBar,
    SideBar
  },
    name: "typeproductlist",
    data() {
        return {
            products: []
        };
    },
    created() {
        this.getAll();
    },
    methods: {
        getAll() {
            this.$request.get("http://localhost:8082/api/category").then(res => {
                console.log(localStorage.getItem("token"));
                this.products = res.data;
            });
        },
        onDelete(productId) {
            this.$swal.fire({
                title: "Xác nhận xóa ?",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "có",
                cancelButtonText: "không",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$request.delete("http://localhost:8082/api/delete-category/" + productId).then(res => {
                        if (res.data.success) {
                            this.$swal.fire("đã xóa", "", "success");
                            this.getAll();
                        }
                    });
                }
            });
        }
    },
    components: { Footer, NavBar, SideBar }
}
</script>