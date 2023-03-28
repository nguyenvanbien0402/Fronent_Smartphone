<template>

<SearchBar/>
<HeaderCom/>
  
     <div class="container  px-3 my-5 clearfix">
            <!-- Shopping cart table -->
            <div  class="card ">
                <div class="card-header">
                    <h2 v-if="getName()">Đơn hàng đã đặt</h2>
                    <h2 v-if="!getName()">Bạn cần đăng nhập để biết đơn hàng đã đặt</h2>
                    <!-- <h2 v-if="products.length==0">không có sản phẩm nào</h2> -->
                </div>
                <div v-if="orders.length>0" class="card-body "  v-for="(o,index) in orders">
                    <div class="table-responsive">
                      <table class="table table-bordered m-0">
                        <thead>
                          <tr>
                            <!-- Set columns width -->
                            <th class="text-center py-3 px-4" style="min-width: 300px;">Tên sản phẩm và chi tiết</th>
                            <th class="text-center py-3 px-4" style="width: 100px;">Giá</th>
                            <th class="text-center py-3 px-4" style="width: 150px;">Số lượng</th>
                            <th class="text-center py-3 px-4" style="width: 100px;">Tiền</th>
                          
                          </tr>
                        </thead>
                        <tbody>
                
                          <tr v-for=" (x,index) in o.listProducts">
                            <td class="p-4">
                              <div class="media align-items-center">
                                <img :src="getImgUrl(x.photo)"  style="width: 20%;" class="d-block ui-bordered mr-4" alt="">
                                <div class="media-body ">
                                    <RouterLink :to="{name:'productDetail',params: {id:o.orderId}}">
                                        <a href="#" class=" proname d-inline text-dark">{{ x.productName }}</a>
                                   </RouterLink> 
                                </div>
                              </div>
                            </td>
                            <td class="text-right font-weight-semibold align-middle p-4">{{ format(x.unitPrice-(x.unitPrice*x.discout)) }} <br>
                             <span>Giảm: {{x.discout }}%</span>
                            </td>
                            <td class="align-middle text-center "><input disabled style="width: 35px;"  type="number" class=" text-center " :value="x.quantity"/></td>
                            <td class="text-right font-weight-semibold align-middle p-4">{{ format((x.unitPrice-(x.unitPrice*x.discout))*x.quantity) }}</td>
                           
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- / Shopping cart table -->     
                    <div class="d-flex mt-2 ">
                        <div class="col-md-11">
                          <table>
                            <thead>
                                <tr>
                                    <th>Liên hệ</th>
                                    <th>Địa chỉ</th>
                                    <th>Ngày đặt </th>
                                    <th>Ghi chú </th>
                                    <th>Tình trạng </th>
                                    <th style="width: 100px;">Thanh toán</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="detail" >
                                    <td>0{{ o.phone }}</td>
                                    <td>{{ o.address }}</td>
                                    <td>{{formatDate( o.orderDate )}}</td>
                                    <td>{{ o.description }}</td>
                                    <td>
                                        <div class="status-li" >
                                            <li style="list-style: none;" v-if="o.status==1">Chưa xác nhận</li>
                                            <li style="list-style: none;" v-if="o.status==2">Đã xác nhận</li>
                                            <li style="list-style: none;" v-if="o.status==3">Đang giao</li>
                                            <li  style="list-style: none;" v-if="o.status==4">Đã nhận hàng</li>
                                            <li style="list-style: none;" v-if="o.status==5">Hủy đơn hàng</li>
                                            </div>
                                    </td>
                                    <td>COD</td>
                                    <td style="color: #FF591B; font-weight: 600;">{{ format(o.amount) }}</td>
                                   
                                </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="col-md-1">
                            <div class=" d-flex">
                                <div class=" buton text-center">
                                <button @click="cancelOder(o.orderId)" v-if="o.status==1" class="btn btn-warning mt-2">Hủy đơn</button>
                                <button disabled v-if="o.status==2" class="btn btn-warning mt-2 ">Không thể hủy</button>
                                <button disabled v-if="o.status==3" class="btn btn-warning mt-2 ">Không thể hủy</button>
                                <button disabled v-if="o.status==4" class="btn btn-warning mt-2 ">Không thể hủy</button>
                                <button disabled v-if="o.status==5" class="btn btn-warning mt-2 ">Đã nhận hàng</button>
                               <RouterLink :to="{name:'FixOrder',params: {id:o.orderId}}"> <button  v-if="o.status==1" class="btn btn-primary mt-1">Chỉnh sửa</button></RouterLink>
                                </div>
                           </div> 
                        </div>
                    </div>
                
                <!--  -->
                  </div>
              </div>
          </div>
    
        

<FooterCom/>
        
    </template>
    

    
<script>
import HeaderCom from './HeaderCom.vue';
import SearchBar from './SearchBar.vue'
import FooterCom from './FooterCom.vue';


export default {
  components:{
  SearchBar,
  HeaderCom,
  FooterCom
  },
    name: "cart",
    data() {
        return {
            types: [],
            orders: [],
            listProducts: [],
            truck: [],
            cart: [],
            unitPrice: "",
            discoutPrice: 0,
            totalPrice: 0,
        };
    },
    created() {
        this.getOrder();
        this.getName();
    },
    methods: {
           
      formatDate(dt) {
        let d = new Date(dt).toLocaleDateString("vi-VN");
        return d
      },

        cancelOder(orderId) {
            this.$swal.fire({
                title: "Xác nhận hủy đơn ?",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "có",
                cancelButtonText: "không",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$request.delete("http://localhost:8082/api/delete-user-order/" + orderId).then(res => {
                        if (res.data.success) {
                            this.$swal.fire("đã hủy đơn hàng", "", "success");
                            this.getOrder();
                        }
                    });
                }
            });
        },
  
        getOrder() {
            let userId = localStorage.getItem("userId");
            this.$request.get("http://localhost:8082/api/user/order/" + userId).then(res => {
                this.orders = res.data;
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
    components: { SearchBar, HeaderCom, FooterCom }
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
#detail  td{
 padding: 2px 15px 2px 5px;
 border: 0.5px solid gray;
}

.buton button {
  width: 150px;
  color: #fff;
  font-weight: 500;
}

.status-li {
    font-weight: 500;
    color: #FF591B;
}
</style>