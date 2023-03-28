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
                            <label for="">Tên sản phẩm</label>
                            <input type="text" class="form-control"
                            v-model="namePro" 
                            @mouseout="validated"
                             />
                            <div class="text-danger"  v-if="errors.namePro">{{ errors.namePro }}</div>
                          </div>
                          <div class="form-group">
                            <label for="">Số lượng</label>
                            <input type="number" class="form-control"
                            @mouseout="validated" 
                            v-model="quantity"/>
                            <div class="text-danger"  v-if="errors.quantity">{{ errors.quantity }}</div>
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
                                  @mouseout="validated"
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
                                  @mouseout="validated"
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
                          <div class="text-danger"  v-if="errors.special">{{ errors.special }}</div>
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
                                  @mouseout="validated"
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
                                  @mouseout="validated"
                                  value= "false"  v-model="available"
                                />
                                <label
                                  class="form-check-label"
                                  for="flexRadioDefault2"
                                >
                                  hết hàng
                                </label>
                              </div>
                            </div>
                            <div class="text-danger"  v-if="errors.available">{{ errors.available }}</div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="">Giảm giá</label>
                            <input type="number" class="form-control" 
                            @mouseout="validated"
                            v-model="discount" />
                            <div class="text-danger"  v-if="errors.discount">{{ errors.discount }}</div>
                          </div>
                          <div class="form-group">
                            <label for="">Đơn giá</label>
                            <input type="number" class="form-control" 
                            @mouseout="validated"
                            v-model="price"/>
                            <div class="text-danger"  v-if="errors.price">{{ errors.price }}</div>
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
                              @mouseout="validated"
                              v-model="viewCount"/>
                              <div class="text-danger"  v-if="errors.viewCount">{{ errors.viewCount }}</div>
                              </div>  
                          </div>

                        
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="">Hình ảnh sản phẩm</label>
                        <input type="file" class="form-control"
                        @change="uploadFile($event)" 
                         /> <br>
                         <div class="text-danger"  v-if="errors.file">{{ errors.file }}</div>
                         <img :src="fileSrc" style="width: 300px; height: auto;" alt="">
                       
                      </div>

                      <div class="form-group">
                        <label for="">Mô tả sản phẩm</label>
                        <!-- <textarea class="p-3 border " id="editor"
                        name="edito"
                        v-model="description"
                          style="width: 100%; height: 200px"
                          @mouseout="validated"
                        ></textarea> -->
                        <ckeditor   :editor="editor" v-model="description" :config="editorConfig"></ckeditor>

                        <div class="text-danger"   v-if="errors.description">{{ errors.description }}</div>
                      </div>

                      <div class="form-group">
                        <button class="btn btn-primary" type="submit">Thêm mới</button> &nbsp;
                        <button type="reset" @click="resetForm" class="btn btn-danger">Hủy bỏ</button>
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



<script >
import Footer from '../layouts/Footer.vue'
import NavBar from '../layouts/NavBar.vue'
import SideBar from '../layouts/SideBar.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import DOMPurify from 'dompurify'
export default {
  mounted() {

  },
  components:{
    Footer,NavBar,SideBar,


  },
  name: 'productEdit',
  data() {
      return {
        editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                },
          errors: {
           namePro:'',
           price:'',
           available:'',
           quantity:'',
           description:'',
           viewCount:'',
           discount:'',
           special:'',
           file:''
          },
         typeproduct : {
          name: '',
          nameVn: ''
         },
     
          file:'', 
          fileSrc:'',
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
      
      
      }
  }, 
  created() {
    this.getTypeProduct()
  },
  methods: {
      validated() {
         
          let isValid = true
          this.errors =  {
           namePro:'',
           price:'',
           available:'',
           quantity:'',
           description:'',
           viewCount:'',
           discount:'',
           special:'',
           file:''
          }

         if(! this.namePro) {
          this.errors.namePro= "Chưa nhập tên sản phẩm"
          isValid = false
         } 

         if(! this.price) {
          this.errors.price = "Chưa nhập giá sản phẩm"
          isValid=false
         }
         if(! this.discount ) {
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
         if(! this.available) {
          this.errors.available = "chưa nhập hiên/không hiện"
          isValid = false
         }
         if(! this.special) {
          this.errors.special = "chưa nhập đặc biệt"
          isValid = false
         }
         if(! this.file) {
          this.errors.file = "chưa chọn ảnh "
          isValid = false
         }
    
         return isValid
      },
      resetForm() {
       this.namePro = '',
       this.price = '',
       this.discount = '',
       this.quantity = '',
       this.viewCount = '',
       this.special = '',
       this.available = '',
       this.description = ''
      },
      
      reload() {
        location.reload()  
      },
      uploadFile(e) {
        this.file = e.target.files[0];
        this.fileSrc = window.URL.createObjectURL(this.file)
      },
      save() {
           let x = DOMPurify.sanitize(this.description)
           console.log(x)
          if(this.validated()) 
          {
            
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
           this.$request.post('http://localhost:8082/api/create-product', formData,{headers}
           ).then(res=> {
              if(res.data.success) {
                  this.$router.push({name: 'productList'})
              } else {
                  alert('không thể thêm mới')
              }
            })
          } else {
            alert('Dữ liệu nhập chưa đầy dủ, không thể thêm mới')
          }
      },
      getTypeProduct() {
        this.$request.get('http://localhost:8082/api/category/' ).then(res=>{
                  this.typeproduct = res.data.data;
                  
             })
      }
  }
}
</script>