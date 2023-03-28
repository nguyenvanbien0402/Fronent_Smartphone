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
                  class="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  <RouterLink
                    style="text-decoration: none; color: inherit"
                    to="/typeproduct/list"
                    >Danh sách</RouterLink
                  ></a
                >
              </li>
              <li class="nav-item" v-if="!productId">
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
              <li class="nav-item" v-if="productId">
                <a
                  class="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                  >Cập nhật</a
                >
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active col-md-6"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <form @submit.prevent="save()"  >
                  <div class="form-group">
                    <label for="">Danh mục sản phẩm</label>
                    <input class="form-control" type="text" 
                    v-model="typeproduct.name" 
                    @blur="validated"
                    />
                    <div class="text-danger"  v-if="errors.name">{{ errors.name }}</div>
                  </div>
                  <div class="form-group">
                    <label for="">Tên hãng sản phẩm</label>
                    <input class="form-control" type="text" 
                     v-model="typeproduct.nameVn"
                     @blur="validated"
                      />
                     <div class="text-danger"  v-if="errors.nameVn">{{ errors.nameVn }}</div>
                  </div>
                  <div class="form-group">
                    <button v-if="productId" type="submit" class="btn btn-primary">
                      Cập nhật
                    </button>
                    <button v-if="!productId" type="submit" class="btn btn-primary">
                      Thêm mới
                    </button> &nbsp;
                    <button  @click="resetForm" class="btn btn-danger">Hủy bỏ</button>
                  </div>
                </form>
               
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
import NavBar from '../layouts/NavBar.vue';
import Footer from '../layouts/Footer.vue'
import SearchBar from '../users/SearchBar.vue';
import SideBar from '../layouts/SideBar.vue';
export default {
  components:{
    Footer,NavBar,SearchBar
  },
    name: "typeproductEdit",
    data() {
        return {
          productId:'',
            errors: {
                name: "",
                nameVn: ""
            },
            typeproduct: {
                name: "",
                nameVn: ""
            },
        };
    },
    created() {
        this.productId = this.$route.params.id;
        if (this.productId) {
            this.getProduct(this.productId);
        }
    },
    methods: {
        validated() {
            let isValid = true;
            this.errors = {
                name: "",
                nameVn: ""
            };
            if (!this.typeproduct.name) {
                this.errors.name = "Chưa nhập danh mục sản phẩm";
                isValid = false;
            }
            if (!this.typeproduct.nameVn) {
                this.errors.nameVn = "Chưa nhập tên hãng sản phẩm";
                isValid = false;
            }
            return isValid;
        },
        resetForm() {
      this.typeproduct.name = '',
      this.typeproduct.nameVn = ''
    },
        save() {
            console.log(this.validated());
            if (this.validated()) {
                if (this.typeproduct.id) {
                    this.$request.put("http://localhost:8082/api/update-category/" + this.typeproduct.id, this.typeproduct).then(res => {
                        if (res.data.success) {
                            this.$router.push({ name: "typeProductList" });
                        }
                        else {
                            alert("sửa không thành công");
                        }
                    });
                }
                this.$request.post("http://localhost:8082/api/create-category", this.typeproduct).then(res => {
                    if (res.data.success) {
                        this.$router.push({ name: "typeProductList" });
                    }
                    else {
                        alert("không thể thêm mới");
                    }
                });
            }
        },
        getProduct(productId) {
            this.$request.get("http://localhost:8082/api/category/" + this.productId).then(res => {
                this.typeproduct = res.data.data;
            });
        }
    },
    components: { Footer, NavBar, SideBar }
}
</script>