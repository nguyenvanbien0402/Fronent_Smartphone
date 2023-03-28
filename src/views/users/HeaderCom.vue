<template>
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
            <li v-for="x in types"> <RouterLink style="text-decoration: none;"  :to="{name:'productTypeDetail',params: {id:x.id}}"><a href="#">Điện thoại {{ x.nameVn }}</a> </RouterLink></li>
            
          </div>
        </div>
         
<!--  -->
          <li class="nav-item" style="margin-left: 12px" >
           <RouterLink style="text-decoration: none; " to="/user/home"><a class="nav-link" style="color: white" href="#">TRANG CHỦ</a> </RouterLink>
             
          </li>

          <li class="nav-item">
            <RouterLink style="text-decoration: none; " to="/user/about"><a class="nav-link" style="color: white" href="#"
              >GIỚI THIỆU</a
            ></RouterLink>
            
          </li>
          <li class="nav-item">
            <RouterLink  style="text-decoration: none; " to="/user/contact" >  <a class="nav-link" style="color: white" href="#">LIÊN HỆ</a></RouterLink>
            
          </li>
          <li class="nav-item">
            <RouterLink style="text-decoration: none; "  to="/user/feedback">   <a class="nav-link" style="color: white" href="#"
              >PHẢN HỒI</a
            ></RouterLink>
          
          </li>
          <li class="nav-item">
            <RouterLink  style="text-decoration: none; " to="/user/quession"> <a class="nav-link" style="color: white" href="#">HỎI ĐÁP</a></RouterLink>
           
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
            <li > <RouterLink style="text-decoration: none;" v-if="getName()" to="/update/info"><a href="#">Cập nhật thông tin</a> </RouterLink></li>
            <li > <RouterLink style="text-decoration: none;" v-if="getName()" to="/change/pass"><a href="#">Thay đổi mật khẩu</a> </RouterLink></li>
            <li ><a href="#" style="padding-left: 20px;" v-if="getName()" @click="logout()">Đăng xuất</a></li>
          </div>
        </div>
        </ul>
      </div>
    </nav>
    </template>


<script>

 export default {
    name:'HeaderCom',
    data() {
         return {
            
               types:[],

               
         }
    },

    created() {
      this.getType()
 
    },

    methods:{

         getType() {
            this.$request.get('http://localhost:8082/api/user-category').then(res=>{
                        this.types = res.data.data;
            })
          },
         getName() {
         return  JSON.parse(localStorage.getItem('name'))
         },

         logout() {
           localStorage.removeItem('name')
           localStorage.removeItem('userId')
           localStorage.removeItem('token')
           localStorage.removeItem('photo')

           this.$swal.fire('Đăng xuất thành công', '', 'success')
           location.reload()
           this.$router.push({name: 'userHome'})
         }
     }
}

</script>

<style>

</style>