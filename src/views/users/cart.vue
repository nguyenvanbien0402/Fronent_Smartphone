<template>

<SearchBar/>
<HeaderCom/>

    <!--  -->
 <div class="container  px-3 my-5 clearfix">
        <!-- Shopping cart table -->
        <div  class="card container">
            <div class="card-header">
                <h2 v-if="products.length>0">Giỏ hàng có {{ products.length}} sản phẩm</h2>
                <h2 v-if="products.length==0">không có sản phẩm nào</h2>
            </div>
            <div v-if="products.length>0" class="card-body">
                <div class="table-responsive">
                  <table class="table table-bordered m-0">
                    <thead>
                      <tr>
                        <!-- Set columns width -->
                        <th class="text-center py-3 px-4" style="min-width: 300px;">Tên sản phẩm và chi tiết</th>
                        <th class="text-center py-3 px-4" style="width: 100px;">Giá</th>
                        <th class="text-center py-3 px-4" style="width: 150px;">Số lượng</th>
                        <th class="text-center py-3 px-4" style="width: 100px;">Tiền</th>
                        <th class="text-center align-middle py-3 px-0" style="width: 40px;"><a href="#" class="shop-tooltip float-none text-light" title="" data-original-title="Clear cart"><i class="ino ion-md-trash"></i></a></th>
                      </tr>
                    </thead>
                    <tbody>
            
                      <tr v-for=" (x,index) in products">
                        <td class="p-4">
                          <div class="media align-items-center">
                            <img :src="getImgUrl(x.photo)"  style="width: 20%;" class="d-block ui-bordered mr-4" alt="">
                            <div class="media-body ">
                                <RouterLink :to="{name:'productDetail',params: {id:x.id}}">
                                    <a href="#" class=" proname d-inline text-dark">{{ x.name }}</a>
                               </RouterLink> 
                            </div>
                          </div>
                        </td>
                        <td class="text-right font-weight-semibold align-middle p-4">{{ format(x.price-(x.price*x.discout)) }} <br>
                         <span>Đã giảm: {{x.discout }}%</span>
                        </td>
                        <td class="align-middle text-center "><button @click="giam(x.id)" class="sl" >-</button> <input style="width: 35px;" disabled type="number" class=" text-center " :value="x.quantity"/><button @click="tang(x.id)" class="sl">+</button></td>
                        <td class="text-right font-weight-semibold align-middle p-4">{{ format((x.price-(x.price*x.discout))*x.quantity) }}</td>
                        <td class="text-center align-middle px-0"><a href="#" @click="clear(index)" class="shop-tooltip close float-none text-danger" title="" data-original-title="Remove">×</a></td>
                      </tr>
            
                     
            
                    </tbody>
                  </table>
                </div>
                <!-- / Shopping cart table -->
            
                <div class=" flex-wrap justify-content-between align-items-center pb-4">
                 <form @submit.prevent="dathang()" class="d-flex">
                    <div class="col-md-8">
                      <h5 class="mt-3">Nhập thông tin giao hàng</h5>
                       <div class=" d-flex ">
                    
                    <div class="mt-4 col-md-5">
                    <div>
                      <label class="font-weight-normal">Số điện thoại</label>
                      <input type="number" v-model="order.phone" class="form-control">
                    </div>
                    </div>
                    <div class="mt-4 col-md-7">
                       <div>
                        <label class=" font-weight-normal">Địa chỉ nhận hàng</label>
                        <input type="text"  v-model="order.address" class="form-control">
                       </div>
                    </div>
                  </div>
                  <div class="form-outline mt-4 area">
                    <label class="form-label" for="textAreaExample">Ghi chú giao hàng</label>
                    <textarea class="form-control" v-model="order.description" id="textAreaExample1" ></textarea>
                  </div>
                    </div>
                    <div class="col-md-4  d-flex align-items-center">
                      <div>
                        <div class=" d-flex">
                    <div class="text-right mt-4 mr-5">
                      <label class=" font-weight-normal m-0">Đã trừ:</label>
                      <div class="text-large" style="color: red;"><strong>{{ format(discoutPrice) }}</strong></div>
                    </div>
                    <div class="text-right mt-4 ">
                      <label class=" font-weight-normal m-0">Tổng tiền:</label>
                      <div class="text-large"  style="color: red;"><strong>{{ format(totalPrice) }}</strong></div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-4">
                 
                  <RouterLink style="text-decoration: none; " to="/user/home"><button class="btn btn-secondary btn-default md-btn-flat mt-2 mr-3">Quay lại</button> </RouterLink>
                  <button type="submit" style="background-color: #FF591B;border: none;" class="btn btn-primary btn-primary mt-2">Đặt hàng</button>
                </div>
                      </div>
                    </div>
                 </form>
                
                </div>
                  <div>
                    <h5 style="color: #FF591B;">Phương thức thanh toán</h5>
                    <p><i style="font-size: 25px;" class="fa-sharp fa-solid fa-money-bill-1"></i>&nbsp;<span style="font-weight: 500;font-size: 18px;"> Nhận hàng,kiểm tra,thanh toán</span></p>
                  </div>
                
            
              </div>
          </div>
      </div>
      <FooterCom/>
    
</template>

<script>
import HeaderCom from './HeaderCom.vue'
import SearchBar from './SearchBar.vue'
import FooterCom from './FooterCom.vue'

export default {

   components: {
    HeaderCom,
    SearchBar,
    FooterCom
},
    name:'cart',
    data() {
         return {
            
               types:[],
               product:{} ,
               products:[] ,
               pros:[{}],
               truck:[],
               cart:[],
               unitPrice:'',
               discoutPrice:0,
               totalPrice:0,
               order:{
                userId:'',
                phone:'',
                amount: '',
                address:'',
                description: ''
               } ,

         }
    },
    created() {
       
        this.getCart()
        this.getType()
        this.getName()
        this.getShoppingCart()
        this.getTruck()
    },
    methods:{
      validated () {
       let isValid = true
       if(! this.order.address) {
        isValid = false
       }
       if(! this.order.description) {
        isValid = false
       }
       if(! this.order.phone) {
        isValid = false
       }
       return isValid
      },

      getTruck()
        {
          let userId = localStorage.getItem('userId')
            this.$request.get('http://localhost:8082/api/user/order/' + userId).then(res=>{     
                        this.truck = res.data
                        if(this.truck==null) {
                        this.truck=[]
          }          
        })
      },
        
         getShoppingCart() {
          this.cart =  JSON.parse(localStorage.getItem('shoppingcart'))
          if(this.cart==null) {
            this.cart=[]
          }
         },
        dathang() {
          this.order.userId = localStorage.getItem('userId')
          if( this.validated()) {
            if(this.order.userId !=null ) {
                  this.$swal.fire({
            title: 'Xác nhận đặt hàng ?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'có',
            cancelButtonText: 'không',
            }).then((result) => {
              if (result.isConfirmed) {
           
          this.order.amount = this.totalPrice
          this.$request.post('http://localhost:8082/api/insert-order',this.order).then(res=>{
            this.a  =  res.data.orderId;
            this.pros = JSON.parse(localStorage.getItem('shoppingcart'))
            this.pros = this.pros.map(({name, photo, ...rest})=> rest);
            this.pros = this.pros.map(obj => ({ ...obj, orderId:this.a }))
            var ok = true;
            console.log(this.pros)
            for(const i of this.pros) {
              this.$request.post('http://localhost:8082/api/insert-order-detail-product',i
          ).then(res=>{
              if(res.data.success) {
                  ok=true
                  } else {
                ok=false
                this.$swal.fire('Đăng hàng thất bại, cần đăng nhập', '', 'failed')
                  }    
               
          })
          }
            if(ok) {
            this.$swal.fire('Đặt hàng thành công', '', 'success')
          } 
            this.$router.push({name: 'userOrder'})
            localStorage.removeItem('shoppingcart')
          })
           }
         })
                } else {
                  this.$swal.fire('Yêu cầu đăng nhập để đặt hàng', '', 'faild')
                }
          } else {
            alert("Nhập thông tin đặt hàng ")
          }
              
        
        },



        clear(index) {
                this.products.splice(index,1)
                localStorage.setItem('shoppingcart',JSON.stringify(this.products))
                location.reload()
        },
        tang(proId) {
           let item = this.products.find(p => p.id==proId) 
           item.quantity += 1
           localStorage.setItem('shoppingcart',JSON.stringify(this.products))
           this.getCart
           location.reload()
        },
        giam(proId) {
            let item = this.products.find(p => p.id==proId) 
            item.quantity -= 1
            localStorage.setItem('shoppingcart',JSON.stringify(this.products))
              this.getCart()
            location.reload()
            let it = this.products.find(p => p.quantity==0) 
            if(it) {
                this.products.splice(it,1)
                localStorage.setItem('shoppingcart',JSON.stringify(this.products))
                this.getCart()
                location.reload()
            }
          
            localStorage.setItem('shoppingcart',JSON.stringify(this.products))
        },
         getType() {
            this.$request.get('http://localhost:8082/api/user-category').then(res=>{
              console.log(res.data.data)
                        this.types = res.data.data;
            })
          }, 
          getCart() {
          this.products = JSON.parse(localStorage.getItem('shoppingcart'))
      
          if(this.products !=null)
          {
            for(var x of this.products) 
             {
              this.totalPrice = this.totalPrice + ((x.price*x.quantity)- (x.price*x.quantity*x.discout))
              this.discoutPrice = this.discoutPrice + (x.price*x.quantity*x.discout)
             }
          }  else {
            this.products=[]
          }
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
     }
}

</script>

  <style>

.ui-w-40 {
    width: 40px !important;
    height: auto;
}

.card{
    box-shadow: 0 1px 15px 1px rgba(52,40,104,.08);    
}

.ui-product-color {
    display: inline-block;
    overflow: hidden;
    margin: .144em;
    width: .875rem;
    height: .875rem;
    border-radius: 10rem;
    -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,0.15) inset;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.15) inset;
    vertical-align: middle;
}

.sl {
  border: none;
  width: 40px;
  font-size: 18px;

}
.area {
  padding: 0px 15px;
}
.proname {
    font-size: 20px;
    font-weight: 500;
    font-family: Arial, Helvetica, sans-serif;
    color: black;
    margin-left: 50px;
}
</style>