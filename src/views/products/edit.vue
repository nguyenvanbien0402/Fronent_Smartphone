<template>
        <NavBar/>
        <div id="layoutSidenav" >
            <SideBar/>

            <!-- <router-view/>   -->
            <div id="layoutSidenav_content" style="margin-top: 30px">
              <main>
                <div class="container-fluid px-4">
                  <div class="container">
                    <h4 class="bg-primary text-white p-2 ">Sản Phẩm</h4>
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
                          > <RouterLink to="/product/list">Danh sách</RouterLink></a
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
                          >Cập nhật</a
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
                                  <label for="">Tên sản phẩm</label>
                                  <input type="text" class="form-control"
                                  v-model="namePro"  />
                                </div>
                                <div class="form-group">
                                  <label for="">Số lượng</label>
                                  <input type="number" class="form-control" 
                                  v-model="quantity"/>
                                </div>
                                <div class="form-group">
                                  <p>Đặc biệt</p>
                                  <div class="d-flex justify-content-between">
                                    <div class="form-check col-lg-6">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault1"
                                        id="flexRadioDefault1"
                                        value="true" v-model="special"
                                      />
                                      <label
                                        class="form-check-label"
                                        for="flexRadioDefault1"
                                      >
                                        Hiện
                                      </label>
                                    </div>
                                    <div class="form-check col-lg-6">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault1"
                                        id="flexRadioDefault2"
                                        checked
                                        value="false" v-model="special"
                                      />
                                      <label
                                        class="form-check-label"
                                        for="flexRadioDefault2"
                                      >
                                        Không hiện
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div class="form-group">
                                  <p>Tình trạng hàng tồn</p>
                                  <div class="d-flex justify-content-between">
                                    <div class="form-check col-lg-6">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault1"
                                        value="true" v-model="available"
                                      />
                                      <label
                                        class="form-check-label"
                                        for="flexRadioDefault1"
                                      >
                                        còn hàng
                                      </label>
                                    </div>
                                    <div class="form-check col-lg-6">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                        checked
                                        value="false" v-model="available"
                                      />
                                      <label
                                        class="form-check-label"
                                        for="flexRadioDefault2"
                                      >
                                        hết hàng
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label for="">Giảm giá</label>
                                  <input type="number" class="form-control" 
                                  v-model="discount" />
                                </div>
                                <div class="form-group">
                                  <label for="">Đơn giá</label>
                                  <input type="number" class="form-control" 
                                  v-model="price"/>
                                </div>
                                
                                <div class="form-group d-flex  ">
                                  <div class="col-md-6">
                                    <label for=""> danh mục sản phẩm</label>
                                    <select
                                      class="form-select form-select-md"
                                      aria-label=".form-select-md example"
                                      v-model="categoriId" 
                                    >
                                      <option v-for="option in typeproduct" :value="option.id">
                                      {{ option.name }} - {{ option.nameVn }} 
                                      </option>
                                    </select>
                                  </div >
                                      <div class="col-md-6">
                                    <label for="">Lượt xem</label>
                                    <input type="number" class="form-control" 
                                    v-model="viewCount"/>
                                    </div>  
                                </div>
                                   
                                <div>
                                  <label for="">Ngày thêm</label>
                                  <p >{{ createDate }}</p>
                                </div>
                           
                              </div>
                            </div>

                            <div class="form-group">
                              <label for="">Hình ảnh sản phẩm</label>: <span>{{ hinhanh }}</span>
                              <input type="file" class="form-control"
                              @change="uploadFile($event)"
                              />
                              <p>chọn hình ảnh khác</p>
                              <img class="card_image" v-if="hinhanh && !fileSrc" :src="getImgUrl(hinhanh)" style="width: 300px; height: auto;"   alt=""/>
                              <img  class="card_image" :src="fileSrc" style="width: 300px; height: auto;"   alt=""/>
                            </div>
                            <div class="form-group">
                              <label for="">Mô tả sản phẩm</label>
                              <!-- <textarea class="p-3"
                              v-model="description"
                                style="width: 100%; height: 200px"
                              ></textarea> -->
                              <ckeditor   :editor="editor" v-model="description" :config="editorConfig"></ckeditor>

                            </div>

                            <div class="form-group">
                              <button class="btn btn-primary" type="submit">Cập nhật</button> &nbsp;
                             
                              <RouterLink to="/product/list">   <button type="reset" class="btn btn-secondary">Quay lại</button></RouterLink>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import DOMPurify from 'dompurify'
export default {
  
  name: 'productEdit',
  components:{
    Footer,NavBar,SideBar
  },
  data() {
      return {
        editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                },
          errors: {
            photo:'',
           namePro:'',
           price:'',
           available:'',
           quantity:'',
           description:'',
           viewCount:'',
           discount:'',
           special:'',
           categoriId:1
          },
         typeproduct : {
          name: '',
          nameVn: ''
         },
           fileSrc:'',
           hinhanh:'',
           file:'',
           productId:'',
           photo:'',
           namePro:'',
           price:'',
           available:'',
           quantity:'',
           description:'',
           viewCount:'',
           discount:'',
           special:'',
           categoriId:1,
           urlPhoto:'',
           createDate:''
      }
  }, 
  created() {
    let productId = this.$route.params.id
     if(productId) {
      this.getProductById(productId)
     }
     this.getTypeProduct()
 
  },
  methods: {
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
    formatDate(dt) {
        let d = new Date(dt).toLocaleDateString("vi-VN");
        return d
      },

    validated() {
         
         let isValid = true
         this.errors =  {
          namePro:'',
          price:'',
          createDate:'',
          quantity:'',
          description:'',
          viewCount:'',
          discount:'',
         }

        if(! this.namePro) {
         this.errors.namePro= "Chưa nhập tên sản phẩm"
         isValid = false
         
        }

        if(! this.price) {
         this.errors.price = "Chưa nhập giá sản phẩm"
         isValid=false
        }
        if(! this.discount) {
         this.errors.discount = "Chưa nhập giảm giá"
         isValid=false
        }
        if(this.discount===0) {
            this.errors.discount = ''
            isValid=true
          }
        if(! this.description) {
         this.errors.description = "Chưa nhập mô tả"
         isValid=false
        }
        if(! this.quantity) {
         this.errors.quantity = "Chưa nhập số lượng"
         isValid=false
        }
        if(! this.viewCount) {
         this.errors.viewCount = "Chưa nhập lượt xem"
         isValid=false
        }
    
        return isValid
     },
      
      
      reload() {
        location.reload()  
      },
      uploadFile(e) {
        this.file = e.target.files[0];
        this.fileSrc = window.URL.createObjectURL(this.file)
      },   
         getImgUrl(hinhanh) {
            return require('@/assets/images/'+hinhanh)
        },
   
      save() {
        if(this.file) {
          let x = DOMPurify.sanitize(this.description)
          if(this.validated()) {
            const formData = new FormData();
              formData.append('photo', this.file);
              formData.append('name', this.namePro);
              formData.append('price', this.price);
              formData.append('discount', this.discount);
              formData.append('quantity', this.quantity);
              formData.append('description', this.description);
              formData.append('viewCount', this.viewCount);
              formData.append('categoryId', this.categoriId);
              formData.append('special', this.special);
              formData.append('available', this.available);
            const headers = { 'Content-Type': 'multipart/form-data' };
           this.$request.put('http://localhost:8082/api/update-product/' + this.productId, formData,{headers}
           ).then(res=> {
              if(res.data.success) {
                  this.$router.push({name: 'productList'})
              } 
            }).catch(res => {
              alert('Không thể cập nhập, dữ liệu chưa đầy đủ, hoặc sai, kiểm tra lại')    
                    })   
          }
        } else {
          let x = DOMPurify.sanitize(this.description)
          if(this.validated()) {
            const formData = new FormData();
              formData.append('photo', this.hinhanh);
              formData.append('name', this.namePro);
              formData.append('price', this.price);
              formData.append('discount', this.discount);
              formData.append('quantity', this.quantity);
              formData.append('description', this.description);
              formData.append('viewCount', this.viewCount);
              formData.append('categoryId', this.categoriId);
              formData.append('special', this.special);
              formData.append('available', this.available);
            const headers = { 'Content-Type': 'multipart/form-data' };
           this.$request.put('http://localhost:8082/api/update-pro/' + this.productId, formData,{headers}
           ).then(res=> {
              if(res.data.success) {
                  this.$router.push({name: 'productList'})
              } 
            }).catch(res => {
              alert('Không thể cập nhập, dữ liệu chưa đầy đủ, hoặc sai, kiểm tra lại')    
                    })   
          }
        }
       
      },

      getProductById(id) {
       this.$request.get('http://localhost:8082/api/product/' + id).then(res=>{
        this.productId = id
        this.namePro = res.data.data.name
        this.discount = res.data.data.discout
        this.description = res.data.data.description
        this.price = res.data.data.price
        this.quantity = res.data.data.quantity
        this.viewCount = res.data.data.viewCount
        this.createDate = this.formatDate(res.data.data.createDate)
        this.hinhanh = res.data.data.photo
        this.special =  res.data.data.special
        this.available = res.data.data.available
        this.categoriId = res.data.data.categoryId
        
       })
      },
      getTypeProduct() {
        this.$request.get('http://localhost:8082/api/category/' ).then(res=>{
                  this.typeproduct = res.data.data;
                  
             })
      }
  },
 
}
</script>