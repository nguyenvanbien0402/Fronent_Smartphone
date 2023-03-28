<template>
       <header>
		<div class="container-fluild pb-4 " style="background-color: #F3F3F3;">
		  <div>
			<img class="banner" src="../images/banner.gif" alt="" />
		  </div>
  
		  <!--  -->
		  <div class="container-fluid d-flex justify-content-center">
			<div class="row  col-lg-11 header d-flex align-items-center">
			  <div class="col-md-3 logo">
				<img src="../images/logo-text.png" alt="" />
			  </div>
			  <!--  -->
			  <div class="col-md-5  form-search">
			<form  >
				  <div class="">
                 
					<input v-model.trim="strSeach" name="search" type="text" class="border"  style="border-radius: 5px;" placeholder=" Bạn cần tìm gì" />
                   <button @click.prevent="send"  style="margin-left: 10px;">
					  <i class="icon fas fa-search"></i>
					</button>
              
				  </div>
        </form>
			<!-- ở đây -->
			  </div>
			  <!--  -->
			  <div class="col-md-2">
				<div class="row">
				  <div class="col-sm-7 check-order">
            <RouterLink style="text-decoration: none; " to="/order"><a id="truck" class="nav-link" style="color: white" href="#"
                  >	<i style="font-size: 30px;"  class="icon fas fa-truck"></i> <span id="sltruck" style=" font-weight: 500;font-size: 14px;">{{truck.length }}</span></a
                ></RouterLink>
				  </div>
				  <div  class="col-sm-5 check-cart">
            <RouterLink style="text-decoration: none; " :to="{name:'shoppingCart'}"><a id="cat" class="nav-link" style="color: white" href="#"
                  ><i  style="font-size: 30px;"  class="icon fas fa-shopping-cart"></i><span id="slcart" style=" font-weight: 500;font-size: 14px;">{{cart.length }}</span> </a
                ></RouterLink>
				  </div>
				</div>
			  </div>
        <div class="col-md-2 d-flex align-item-center">
          <div   v-if="getName()">
            <img  id="userpho"   
                    class="product-item img-item"
                    :src="getImgUrl()"
                    alt=""    /> 
          </div>
          <p id="nameUser"><span style="color: black;"></span>{{ getName()}}</p>
        
          <p style="color: #FF591B; font-size: 16px;" v-if="!getName()">CHƯA ĐĂNG NHẬP</p>
        
     
        </div>
			</div>
    
		  </div>
		</div>
	  </header>
</template>


<script>



 export default {
    name:'SearchBar',
    data() {
         return {
               photo:'',
               seachData: [],
               cart:[],
               truck:[], 
               strSeach: ''
        
     
         }
    },
    created() {
      this.getTruck()
      this.getName()
      this.getShoppingCart()
      this.getImgUrl()
    },

    methods:{
        
      send () {
           this.$emit('eventName', this.strSeach)
      },

        getTruck()
        {

          let userId = localStorage.getItem('userId')
          if(userId !=null) {
            this.$request.get('http://localhost:8082/api/user/order/' + userId).then(res=>{     
                        this.truck = res.data     
        })
          } else {
            this.truck=[]
          }
        
      },
        
         getShoppingCart() {
          this.cart =  JSON.parse(localStorage.getItem('shoppingcart'))
          if(this.cart==null) {
            this.cart=[]
          }
         
         },

         getName() {
         return  JSON.parse(localStorage.getItem('name'))
         },
         getImgUrl() {
           this.photo = JSON.parse(localStorage.getItem('photo'))
           if(this.photo) {
            return require('@/assets/images/'+this.photo)
           }
           return null
         }

 

        
     }
}

</script>

<style>

#userpho {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>