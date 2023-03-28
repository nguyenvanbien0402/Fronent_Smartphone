<template>
    
    <SearchBar/>
    <nav
      class="navbar navbar-expand-sm navbar-dark"
      style="margin-top: -20px; background-color: rgb(0, 72, 61)"
    >
      <div
        class="container-fluid"
        style="height: 30px; padding: 0px 60px 0px 60px"
      >
        <ul
          class="navbar-nav d-flex justify-content-center"
          style="margin-left: 150px"
        > 
        <!--  -->
        <div id="dropPanel" class="dropdown"  >
          <li id="itemDrop"
            style="width: 280px;width: ; font-size: 18px; border-right: 1px solid gray"
          >
            <a
              class="nav-link dropdown-toggle"
              style="cursor: pointer; color: white"
              data-toggle="collapse"
              href="#chungloai"
          
            >
              <i class="fa fa-navicon"></i>&nbsp;&nbsp;
              <span class="danh_muc">DANH MỤC SẢN PHẨM</span>
            </a>
          </li>
          <div class="dropdown-menu itemHover mx-auto">
            <li v-for="x in types"> <RouterLink style="text-decoration: none;"  :to="{name:'productBytypeId',params: {id:x.id}}"><a href="#">Điện thoại {{ x.nameVn }}</a> </RouterLink></li>
            
          </div>
        </div>
         
<!--  -->
          <li class="nav-item" style="margin-left: 12px">
           <RouterLink style="text-decoration: none; " to="/user/home"><a class="nav-link" style="color: white" href="#">TRANG CHỦ</a> </RouterLink>
          
          </li>

          <li class="nav-item">
            <RouterLink style="text-decoration: none; " to="/user/about"><a class="nav-link" style="color: white" href="#"
              >GIỚI THIỆU</a
            ></RouterLink>
            
          </li>
          <li class="nav-item">
            <RouterLink  style="text-decoration: none; " to="/user/contact" >  <a class="nav-link" style="color: white" href="/contact">LIÊN HỆ</a></RouterLink>
            
          </li>
          <li class="nav-item">
            <RouterLink style="text-decoration: none; "  to="/user/feedback">   <a class="nav-link" style="color: white" href="/feedback"
              >PHẢN HỒI</a
            ></RouterLink>
          
          </li>
          <li class="nav-item">
            <RouterLink  style="text-decoration: none; " to="/user/quession"> <a class="nav-link" style="color: white" href="/faq">HỎI ĐÁP</a></RouterLink>
           
          </li>

          <!-- Dropdown -->
          <div id="accountPanel" class="dropdown"  >
          <li id=""
            style="width: 160px; font-size: 16px; border-right: 1px solid gray"
          >
            <a
              class="nav-link dropdown-toggle"
              style="cursor: pointer; color: white"
              data-toggle="collapse"
              href="#chungloai"
          
            >
              <i class=""></i>&nbsp;&nbsp;
              <span >TÀI KHOẢN</span>
            </a>
          </li>
          <div class="dropdown-menu opptionHover mx-auto">
            <li > <RouterLink style="text-decoration: none;" v-if="!getName()" to="/signup" ><a href="#">Đăng ký</a> </RouterLink></li>
            <li > <RouterLink style="text-decoration: none;" v-if="!getName()" to="/signin"><a href="#">Đăng nhập</a> </RouterLink></li>
            <li > <RouterLink style="text-decoration: none;" to="/passforget"><a href="#">Quên mật khẩu</a> </RouterLink></li>
            <li ><a href="#" style="padding-left: 20px;" @click="logout()">Đăng xuất</a></li>
          </div>
        </div>
        </ul>
      </div>
    </nav>

<!-- list product -->
<div class="container-fluid slider">
        <!-- sản phẩm theo danh mục  -->
        <div class="container-fluild d-flex justify-content-center slider   ">
            <div class="col-lg-10  pt-4 ">    
               <div class="row d-flex justify-content-around  wrap pt-3 ps-2 pe-2">
                <h4 class="all-item">SẢN PHẨM THEO HÃNG </h4>     
                <div id="item" class="bg-light " v-for="pro in productsByTypeId">
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
       
</div>
<!-- footer -->
<FooterCom/>

</template>

<script>
import SearchBar from './SearchBar.vue'
import FooterCom from './FooterCom.vue';

 export default {
  components:{
   SearchBar,
   FooterCom
  },
    name: "probytypeId",
    data() {
        return {
            types: [],
            productsByTypeId: [],
            truck: [],
            cart: []
        };
    },
    created() {
        let typeId = this.$route.params.id;
        this.getProductByTypeId(typeId);
        this.getName()
        this.getType()
        
    },
    methods: {
      getType() {
            this.$request.get('http://localhost:8082/api/user-category').then(res=>{
                        this.types = res.data.data;
            })
          },
        getShoppingCart() {
            this.cart = JSON.parse(localStorage.getItem("shoppingcart"));
            if (this.cart == null) {
                this.cart = [];
            }
        },

        getProductByTypeId(typeId) {
            this.$request.get("http://localhost:8082/api/pro-by-type/" + typeId).then(res => {
                this.productsByTypeId = res.data.data;
            });
        },
        getName() {
            return JSON.parse(localStorage.getItem("name"));
        },
      
        getImgUrl(img) {
            return require("@/assets/images/" + img);
        },
        format(price) {
            if (typeof price !== "number") {
                return price;
            }
            var formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND"
            });
            return formatter.format(price);
        }
    },
    components: { SearchBar, FooterCom }
}

</script>

<style>


</style>