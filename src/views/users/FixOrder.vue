<template>

<SearchBar/>
<HeaderCom/>

    <!--  -->
 <div class="container  px-3 my-5 clearfix">
        <!-- Shopping cart table -->
        <div  class="card container">
            <div class="card-header">
                <h2>CHỈNH SỬA ĐƠN HÀNG</h2>
            </div>
            <div  class="card-body">
                <div class="table-responsive">
                  <table class="table table-bordered m-0">
                    <thead>
                      <tr>
                        <!-- Set columns width -->
                        <th class="text-center py-3 px-4" style="min-width: 300px;">Tên sản phẩm và chi tiết</th>
                        <th class="text-center py-3 px-4" style="width: 100px;">Giá</th>
                        <th class="text-center py-3 px-4" style="width: 150px;">Sửa số lượng</th>
                        <th class="text-center py-3 px-4" style="width: 100px;">Tiền</th>
                        <th class="text-center align-middle py-3 px-0" style="width: 40px;"><a href="#" class="shop-tooltip float-none text-light" title="" data-original-title="Clear cart"><i class="ino ion-md-trash"></i></a></th>
                      </tr>
                    </thead>
                    <tbody>
            
                      <tr v-for=" (x,index) in orders.listProducts">
                        <td class="p-4">
                          <div class="media align-items-center">
                            <img :src="getImgUrl(x.photo)"  style="width: 20%;" class="d-block ui-bordered mr-4" alt="">
                            <div class="media-body ">
                                <RouterLink :to="{name:'productDetail',params: {id:x.productId}}">
                                    <a href="#" class=" proname d-inline text-dark">{{ x.productName }}</a>
                               </RouterLink> 
                            </div>
                          </div>
                        </td>
                        <td class="text-right font-weight-semibold align-middle p-4">{{ format(x.unitPrice-(x.unitPrice*x.discout)) }} <br>
                          <span>Đã giảm: {{x.discout}}%</span>
                        </td>
                        <td class="align-middle text-center "><button @click="giam(x.orDetailId)" class="sl" >-</button> <input style="width: 35px;" disabled type="number" class=" text-center " :value="x.quantity"/><button @click="tang(x.orDetailId)" class="sl">+</button></td>
                        <td class="text-right font-weight-semibold align-middle p-4">{{ format((x.unitPrice*x.quantity) - (x.unitPrice*x.discout*x.quantity)) }}</td>
                        <td class="text-center align-middle px-0"><a href="#"  @click="cancelOder(x.orDetailId,orders.orderId)"  class="shop-tooltip close float-none text-danger" title="" data-original-title="Remove">×</a></td>
                      </tr>
            
                     
            
                    </tbody>
                  </table>
                </div>
                <!-- / Shopping cart table -->
            
                <div class=" flex-wrap justify-content-between align-items-center pb-4">
                 <form @submit.prevent="fixorder()" class="d-flex">
                    <div class="col-md-8">
                      <h5 class="mt-3">Nhập thông tin giao hàng</h5>
                       <div class=" d-flex ">
                    
                    <div class="mt-4 col-md-5">
                    <div>
                      <label class="font-weight-normal">Số điện thoại</label>
                      <input type="number" v-model="orders.phone" class="form-control">
                    </div>
                    </div>
                    <div class="mt-4 col-md-7">
                       <div>
                        <label class=" font-weight-normal">Địa chỉ nhận hàng</label>
                        <input type="text"  v-model="orders.address" class="form-control">
                       </div>
                    </div>
                  </div>
                  <div class="form-outline mt-4 area">
                    <label class="form-label" for="textAreaExample">Ghi chú giao hàng</label>
                    <textarea class="form-control" v-model="orders.description" id="textAreaExample1" ></textarea>
                  </div>
                    </div>
                    <div class="col-md-4  d-flex align-items-center">
                      <div>
                        <div class=" d-flex">
                    <div class="text-right mt-4 ">
                      <label class=" font-weight-normal m-0">Tổng tiền:</label>
                      <div class="text-large"  style="color: red;"><strong>{{ format(getAmount()) }}</strong></div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-4">
                  <button type="button" class="btn btn-secondary btn-default md-btn-flat mt-2 mr-3">Quay lại </button>
                  <button type="submit" style="background-color: #FF591B;border: none;" class="btn btn-primary btn-primary mt-2">Lưu chỉnh sửa</button>
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

      <!--  -->
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
            
     
                product:{} ,
                products:[] ,
                pros:[],
                orders:{
                orderId:'',
                phone:'',
                amount:'',
                address:'',
                description: '',
                listProducts:[],
               } ,

         }
    },
    created() {
      var orderId = this.$route.params.id
      this.getCart(orderId)
      this.getAmount()
    },
    methods:{
  
      cancelOder(orDetailId,orderId) {
            this.$swal.fire({
                title: "Xác nhận xóa món hàng?",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "có",
                cancelButtonText: "không",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$request.delete("http://localhost:8082/api/delete-order-detail/" + orDetailId).then(res => {
                        if (res.data.success) {
                            this.$swal.fire("đã xóa món hàng", "", "success");     
                            if(this.orders.listProducts.length==1) {
                              this.$request.delete("http://localhost:8082/api/delete-user-order/" + orderId).then(res => {
                              if (res.data.success) {
                                  this.$swal.fire("đơn hàng bị hủy", "", "success");
                                  this.$router.push({name:'userHome'})
                        }
                    });
                   } else {
                    location.reload()
                   }      
                  
                 }   
               
                    });
                }
            });
        },
        getAmount() {
          var total=0
          for(const x of this.orders.listProducts) {
                total = total +  ((x.quantity * x.unitPrice) - (x.unitPrice*x.quantity*x.discout))
                
                }
                return total
        },
        fixorder() {
          this.$swal.fire({
            title: 'Xác nhận sửa đơn hàng ?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'có',
            cancelButtonText: 'không',
            }).then((result) => {
              if (result.isConfirmed) {
                this.orders.amount = this.getAmount()
          this.$request.put('http://localhost:8082/api/update-user-order/'+this.orders.orderId,this.orders).then(res=>{
            for(const i of this.orders.listProducts) {
              const data = new FormData()
              data.append('quantity',i.quantity)
              this.$request.put('http://localhost:8082/api/update-order-detail/' + i.orDetailId, data
          ).then(res=>{
              if(res.data.success) {
                this.$swal.fire('Sửa đơn hàng thành công, cần đăng nhập', '', 'failed')
                  }    
                  this.$router.push({name: 'userOrder'})
          })
          }
          })
           }
         })
        },



        tang(orderDetaiId) {
           let item = this.orders.listProducts.find(p => p.orDetailId==orderDetaiId) 
           item.quantity += 1
           this.getAmount()
         
        },
        giam(orderDetaiId) {
            let item = this.orders.listProducts.find(p => p.orDetailId==orderDetaiId) 
            item.quantity -= 1
            let it = this.orders.listProducts.find(p => p.quantity==0) 
            if(it) {
                this.orders.listProducts.splice(it,1)
            }
            this.getAmount()
        },
     
          getCart(orderId) {
            this.$request.get('http://localhost:8082/api/user-order-fix/' + orderId).then(res=>{
                 return     this.orders = res.data
               
            })

      
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