<template>
 
 <SearchBar @eventName="handleEvent"/>
 <HeaderCom/>

    <!-- slider -->
    <div  v-if="!strsearch"  class="container-fluild slider">
      <div class="container">
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="../images/slide1.png"
                alt="Second slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="../images/slide2.png"
                alt="Third slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="../images/slide3.png"
                alt="Third slide"
              />
            </div>
            <div class="carousel-item active">
              <img
                class="d-block w-100 h-50"
                src="../images/slide4.png"
                alt="First slide"
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
    <!-- banner -->
    <div  v-if="!strsearch" class="container-fluild slider " >
      <img class="banner mb-4 mt-4" src="../images/banner2.png" alt="banner2" />
    </div>

    <!-- list product -->
<div class="container-fluid slider">
  <!-- sản phẩm tìm kiếm  -->
  <div v-if="strsearch"  class="container-fluild d-flex justify-content-center slider   ">
            <div class="col-lg-10  pt-4 ">
               <div class="row d-flex justify-content-around  wrap pt-3 ps-2 pe-2">
                <h4 class="all-item" v-if="! searchpro.length==0">SẢN PHẨM TÌM KIẾM</h4>
                <div  v-if="searchpro.length==0" >
                  <h5>Không tìm thấy sản phẩm {{strsearch }} phù hợp</h5>
                </div> 
                <div id="item" class="bg-light " v-for="pro in searchpro">
                  <RouterLink :to="{name:'productDetail',params: {id:pro.id}}">
                    <img
                    class="product-item img-item"
                    :src="getImgUrl(pro.photo)"
                    alt=""
                  />
                  </RouterLink> 
                  <p id="nameItem">{{ pro.name }}</p>
                  <p id="priceItem">{{ format(pro.price)}} <span id="discountItem">&nbsp; -{{ pro.discout }}%</span></p>
                  <p id="discountPrice">Giảm còn: &nbsp;{{ format(pro.price*pro.discout) }}đ</p>             
                  <p id="viewItem">Xem: ({{ pro.viewCount }}) <span> - Trả góp: 0%</span></p>
                </div>
        </div>
       </div> 
      </div> 
        <!-- sản phẩm mới nhất  -->
        <div  class="container-fluild d-flex justify-content-center slider   ">
            <div class="col-lg-10  pt-4 ">    
               <div class="row d-flex justify-content-around bg-pink wrap pt-3 ps-2 pe-2">
                <h4 class="all-item">SẢN PHẨM MỚI NHẤT</h4>     
                <div id="item" class="bg-light " v-for="pro in newProducts">
                  <RouterLink :to="{name:'productDetail',params: {id:pro.id}}">
                    <img
                    class="product-item img-item"
                    :src="getImgUrl(pro.photo)"
                    alt=""
                  />
                  </RouterLink> 
                  <p id="nameItem">{{ pro.name }}</p>
                  <p id="priceItem">{{ format(pro.price)}} <span id="discountItem">&nbsp; -{{ pro.discout }}%</span></p>
                  <p id="discountPrice">Giảm còn: &nbsp;{{ format(pro.price*pro.discout) }}đ</p>             
                  <p id="viewItem">Xem: ({{ pro.viewCount }}) <span> - Trả góp: 0%</span></p>
                </div>
        </div>
       </div> 
      </div> 
        <!-- sản phẩm nhiều view -->
        <div   class="container-fluild d-flex justify-content-center slider   ">
            <div class="col-lg-10  pt-4 ">
               <div class="row d-flex justify-content-around bg-yellow wrap pt-3 ps-2 pe-2">
                <h4 class="all-item">SẢN PHẨM NHIỀU LƯỢT XEM</h4> 
                <div id="item" class="bg-light " v-for="pro in viewProducts">
                  <RouterLink :to="{name:'productDetail',params: {id:pro.id}}">
                    <img
                    class="product-item img-item"
                    :src="getImgUrl(pro.photo)"
                    alt=""
                  />
                  </RouterLink> 
                  <p id="nameItem">{{ pro.name }}</p>
                  <p id="priceItem">{{ format(pro.price)}} <span id="discountItem">&nbsp; -{{ pro.discout }}%</span></p>
                  <p id="discountPrice">Giảm còn: &nbsp;{{ format(pro.price*pro.discout) }}đ</p>             
                  <p id="viewItem">Xem: ({{ pro.viewCount }}) <span> - Trả góp: 0%</span></p>
                </div>
        </div>
       </div> 
      </div> 
        <!-- tất cả sản phẩm -->
        <div class="container-fluild d-flex justify-content-center slider   ">
            <div class="col-lg-10  pt-4 ">      
               <div class="row d-flex justify-content-around wrap bg-blue ps-2 pt-3 pe-2">
                <h4 class="all-item">TẤT CẢ SẢN PHẨM</h4>  
                <div id="item" class="bg-light " v-for="pro in pagination">
                  <RouterLink :to="{name:'productDetail',params: {id:pro.id}}">
                    <img
                    class="product-item img-item"
                    :src="getImgUrl(pro.photo)"
                    alt=""
                  />
                  </RouterLink> 
                  <p id="nameItem">{{ pro.name }}</p>
                  <p id="priceItem">{{ format(pro.price)}} <span id="discountItem">&nbsp; -{{ pro.discout }}%</span></p>
                  <p id="discountPrice">Giảm còn: &nbsp;{{ format(pro.price*pro.discout) }}đ</p>             
                  <p id="viewItem">Xem: ({{ pro.viewCount }}) <span> - Trả góp: 0%</span></p>
                </div>
                
            
        </div>
          <div class="d-flex justify-content-center pt-2">
            <td colspan="4" class="text-center">
                <a href="#" @click.prevent="prevPage()"><i class="fas fa-arrow-circle-left fa-2x"></i></a>
              <span class="curentpage"> {{currentPage}}</span>
                <a href="#" @click.prevent="nextPage()"><i class="fas fa-arrow-circle-right fa-2x"></i></a>
            </td>
          </div>
       </div> 
       
      </div> 
   
</div>
      
      
<FooterCom/>
         
</template>



<script>
import SearchBar from './SearchBar.vue'
import HeaderCom from './HeaderCom.vue'
import FooterCom from './FooterCom.vue'
import Paginate from 'vuejs-paginate'
 export default {
  components: {
    HeaderCom,
    SearchBar,
    FooterCom,
    Paginate
  },
    name:'userHome',
    data() {
         return {
               stompClient:'',
               userProducts:[],
               newProducts:[],
               viewProducts:[],
               types:[],
               cart:[],
               seachData:[],
               pageSize: 10,
               currentPage: 1,
               strsearch:''
            
               
         }
    },
    created() {
    
      this.getAll()
      this.getNewProduct()
      this.getViewProduct()
      this.getType()
      this.getName()
      this.getShoppingCart()

    
    },

    methods:{
              handleEvent(value) {
              this.strsearch = value;
            },
            nextPage() {
            if (this.currentPage * this.pageSize < this.userProducts.length) {
              this.currentPage++;
            }
       
          },
          
          prevPage() {
            if (this.currentPage > 1) {
              this.currentPage--;
            }
          },
        
         getShoppingCart() {
          this.cart =  JSON.parse(localStorage.getItem('shoppingcart'))
          if(this.cart==null) {
            this.cart=[]
          }
         
         },
         getAll() {
            this.$request.get('http://localhost:8082/api/all-home-product').then(res=>{
                         
                        this.userProducts = res.data.data;
            })
         },
         getType() {
            this.$request.get('http://localhost:8082/api/user-category').then(res=>{
              console.log(res.data.data)
                        this.types = res.data.data;
            })
          },
         
         getNewProduct() {
            this.$request.get('http://localhost:8082/api/new-product').then(res=>{
               
                        this.newProducts = res.data.data;
            })
         },
         
      
         getViewProduct() {
            this.$request.get('http://localhost:8082/api/view-product').then(res=>{
                   
                        this.viewProducts = res.data.data;
            })
         },

         getName() {
         return  JSON.parse(localStorage.getItem('name'))
         },

         getImgUrl(img) {
            return require('@/assets/images/'+img)
         },

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
         logout() {
           localStorage.removeItem('name')
           localStorage.removeItem('id')
           localStorage.removeItem('token')
           this.$swal.fire('Đăng xuất thành công', '', 'success')
           this.$router.push({name: 'userHome'})
         }
     },
     computed: {
          pagination () {
            return this.userProducts
            .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true; 
        });
          },
          
        searchpro () {
          return this.userProducts.filter((item) => {
          return item.name.toLowerCase().includes(this.strsearch.toLowerCase());
      });
        }
          

     },
     
     
   
}

</script>

<style>
.paginate li a {
 padding: 10px 20px;
 font-size: 20px;
 font-weight: 300;
 color: black;
}
.curentpage {
  font-weight: 500;
  font-size: 20px;
  padding: 0px 25px ;
  text-align: center;
}

</style>