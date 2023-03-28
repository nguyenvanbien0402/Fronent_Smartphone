<template>

<SearchBar/>
<HeaderCom/>
    <!--product detail -->
    <div class="container mt-4">
             
             <h4 id="name-detail">{{ product.name }}</h4>
             <hr>
            <div class="row d-flex justify-content-center">
                   <div class="col-md-6">
                      <div>
                       <img :src="getImgUrl(product.photo)" alt="">
                      </div>
                      <div class="div-thongso">
                       <h3 class=" thongso">Thông số kĩ thuật</h3>
                       <div v-html="product.description" id="div-detail" class="d-flex justify-content-center mt-4">
                      
                       </div>
                      </div>
                   </div>
                   <!--  -->
                   <div class="col-md-6  div-content">
                        <h4 id="giagiam" style="font-weight: 700;color: red;">{{ format(product.price - (product.price*product.discout)) }}</h4>
                        <h5 style="color: red;font-weight: 500;">Giảm: {{ format(product.price*product.discout) }}</h5>
                        <h5 >Giá gốc: <span id="detail-price">{{ format(product.price) }}</span> </h5>
                        <div class="pro-content">
                         <p id="khuyenmai"><strong>ƯU ĐÃI THÊM</strong></p>
                         <p><i class="fa-solid fa-circle-check tick"></i>Ưu đãi đặc quyền dành cho Học sinh Sinh viên: Tặng thêm 1 năm bảo hành </p>
                         <p><i class="fa-solid fa-circle-check tick"></i>Thu cũ đổi mới trợ giá ngay 15% đến 3 triệu (SmartExchange) </p>
                         <p><i class="fa-solid fa-circle-check tick"></i>Tặng PMH 200.000đ mua máy in</p>
                         <p><i class="fa-solid fa-circle-check tick"></i>Tặng Balo Laptop</p>
                         <p><i class="fa-solid fa-circle-check tick"></i>Giảm ngay 20% khi mua sim MBF Siêu Data 1T giá chỉ 184.000đ</p>
                         <p><i class="fa-solid fa-circle-check tick"></i>Giảm thêm 5% màn hình LCD khi mua kèm máy</p>
                         <p><i class="fa-solid fa-circle-check tick"></i>Đơn hàng mua Điện thoại/Máy tính bảng/Laptop được tặng 1 PMH 500.000đ mua Robot hút bụi/ máy lọc nước áp dụng đến 28/02</p>
                         <p><i class="fa-solid fa-circle-check tick"></i>Giảm ngay 5% tối đa 500.000 đồng khi thanh toán trả góp 6/12 tháng qua Kredivo</p>
                         <RouterLink :to="{name:'cart',params: {id:product.id}}">
                          <button @click="addToCart(product.id)" class=" buy">
                           <div><strong>MUA NGAY</strong></div>
                           <p>Giao hàng miễn phí hoặc nhận tại cửa hàng</p>
                         </button>
                        </RouterLink> 
                        <a href="https://zalo.me/0857973867" target="_blank"> <button class="btn btn-primary tragop">
                           <div><strong>TRẢ GÓP 0%</strong></div>
                           <p>Duyệt nhanh qua điện thoại</p>
                         </button></a>
                     </div>

                     <div id="chinhsach" class="d-flex justify-content-around">
                       <div>
                        <p><i class="fa-solid fa-medal icon-chinhsach"></i>Hàng chính hãng</p>
                        <p><i class="fa-solid fa-truck icon-chinhsach"></i>Giao hàng miễn phí trong 90 phút</p>
                        <a><i class="fa-sharp fa-solid fa-rotate icon-chinhsach"></i>Chính sách đổi trả </a>
                       </div>
                       <div>
                        <p><i class="fa-solid fa-shield icon-chinhsach"></i>Bảo hành 12 tháng</p>
                        <p><i class="fa-sharp fa-solid fa-gear icon-chinhsach"></i>Hỗ trợ cài đặt miễn phí</p>
                        <a><i class="fa-solid fa-piggy-bank icon-chinhsach"></i>Chính sách trả góp</a>
               
                       </div>
                     </div>
                   </div>
            </div>
           </div>


           <!-- comment-->

           <div class="container mt-4">
             <div class="card container">
               <div class="card-header">
                <h5>ĐÁNH GIÁ SẢN PHẨM</h5>
                <div class="col-md-12">
                  <form @submit.prevent="sendComment">
                   <div class="form-group">
                    <input v-model="rate.content" placeholder="Nhập nội dung bình luận(tiếng việt có dấu)" type="text" height="100px" class="form-control">
                    <div class="mt-2">
                    <div>
                      <input value="1" name="star" v-model="rate.star" type="radio"><i class="fa-solid fa-star star"></i>
                    </div>
                    <div>
                      <input  value="2" name="star"  v-model="rate.star"  type="radio"><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i>
                    </div>
                    <div>
                      <input  value="3" name="star"  v-model="rate.star" type="radio"><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i>
                    </div>
                    <div>
                      <input   value="4" name="star"  v-model="rate.star" type="radio"><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i>
                      <i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i>
                    </div>
                    <div>
                      <input  value="5" name="star"  v-model="rate.star"  type="radio"><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i>
                      <i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i>
                    </div>
                    </div>
                   </div >
                     <div class="text-right">
                      <button class="btn btn-primary" type="submit">Gửi đánh giá</button>
                     </div>
                  </form>
                </div>
               </div>
               <div class="card-body ">
                  <div class="d-flex row col-md-10 mt-3" v-for="(c,index) in comment" :key="index">
                    <div class=" text-right col-md-1 " >
                    <img class="userPho" v-if="c.userPhoto"  :src="getImgUrl(c.userPhoto)"  alt="user photo">
                    <div  class="userPho text-center" v-else><i style="font-size: 45px; color: gray;" class="fa-solid fa-user"></i></div>
                    </div>
                <div  class="col-md-10 div-commet" >
                  <h5>{{ c.userName }}</h5>
                  <span v-if="c.star==1||c.star==2||c.star==3||c.star==4||c.star==5"><i class="fa-sharp fa-solid fa-star"></i></span>
                  <span v-if="c.star==2||c.star==3||c.star==4||c.star==5" ><i class="fa-sharp fa-solid fa-star"></i></span>
                  <span v-if="c.star==3||c.star==4||c.star==5" ><i class="fa-sharp fa-solid fa-star"></i></span>
                  <span v-if="c.star==4||c.star==5" ><i class="fa-sharp fa-solid fa-star"></i></span>
                  <span v-if="c.star==5" ><i class="fa-sharp fa-solid fa-star"></i></span>
                  <p>{{ c.content }}</p>
                  <p style="font-weight: 500;">Ngày:{{ formatDate(c.createDate) }}</p>
                </div>
                  </div>
               </div>
             </div>
           </div>
    <!-- footer -->
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
    name: "proDetail",
    data() {
        return {
            proId:'',
            comment:[],
            shoppingcart: [],
            product: {},
            pro: { name: "", id: "", price: "", discout: "", photo: "", quantity: "" },
            rate:{content:'',star:'',productId:'',userId:''}
        };
    },
    created() {
        this.proId = this.$route.params.id;
        this.getDetailPro(this.proId);
        this.getCommnet(this.proId)
    },
    methods: {
      validate() {
        let isValid = true
        if(! this.rate.content) {
          isValid = false
        }
        return isValid
      },
     
      formatDate(dt) {
        let d = new Date(dt).toLocaleDateString("vi-VN");
        return d
      },
      getSta(event) {
          console.log(event.target.value)
      },
      sendComment() {
        if(this.validate()) {
          this.rate.userId = localStorage.getItem('userId')
         this.rate.productId = this.proId
         this.$request.post("http://localhost:8082/api/insert-comment", this.rate).then(res => {
                if(res.data.success)
                {
                  alert('Gửi đánh giá sản phẩm thành công')
                  location.reload()
                }
               
            }).catch(res=> {
              alert('Đăng nhập để bình luận')
            })
        } else {
          alert("Nhập nội dung bình luận")
        }
      
      },
      getCommnet(proId) {
        this.$request.get("http://localhost:8082/api/comment-by-productId/" + proId).then(res => {
                this.comment = res.data
                console.log(this.comment)
            });
      },

        addToCart(proId) {
            var storage = localStorage.getItem("shoppingcart");
            if (storage) {
                this.shoppingcart = JSON.parse(storage);
                let item = this.shoppingcart.find(c => c.id === proId);
                if (item) {
                    item.quantity += 1;
                    localStorage.setItem("shoppingcart", JSON.stringify(this.shoppingcart));
                }
                else {
                    this.pro.id = this.product.id;
                    this.pro.name = this.product.name;
                    this.pro.price = this.product.price;
                    this.pro.discout = this.product.discout;
                    this.pro.photo = this.product.photo;
                    this.pro.quantity = 1;
                    this.shoppingcart.push(this.pro);
                    localStorage.setItem("shoppingcart", JSON.stringify(this.shoppingcart));
                }
            }
            else {
                this.pro.id = this.product.id;
                this.pro.name = this.product.name;
                this.pro.price = this.product.price;
                this.pro.discout = this.product.discout;
                this.pro.photo = this.product.photo;
                this.pro.quantity = 1;
                this.shoppingcart.push(this.pro);
                localStorage.setItem("shoppingcart", JSON.stringify(this.shoppingcart));
            }
        },
 
    
        getDetailPro(proId) {
            this.$request.get("http://localhost:8082/api/product/detail/" + proId).then(res => {
                this.product = res.data.data;
            });
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
        },

    },
    components: { SearchBar, HeaderCom, FooterCom }
}

</script>


<style>
    .tick {
      color: #48BB78;
      padding: 5px;

    }
    #detail-price {
      color:#212529;
      text-decoration: line-through;
      font-size: 20px;
    }
    #name-detail {
      margin-left: 50px;
    }
    .pro-content {
      border: 1px solid #E9ECEF;
      background-color:#F8F9FA ;
     
    }
    .div-content {
      border-radius: 5px;
      padding: 10px ;
       
    }
    #khuyenmai {
      background-color: #E9ECEF;
      text-align: center;
      padding: 5px 0px;
      border-radius: 5px;

    }
    .buy {
         
          border: none;
          text-align: center;
          color: white;
          font-family: Arial,Helvetica,sans-serif;
          width:100%;
          cursor: pointer;
          padding: 10px 0px;
          border-radius: 5px;
          margin-top: 10px;
          background-color: #F7792C;
    }
    .tragop {
          border: none;
          text-align: center;
          color: white;
          font-family: Arial,Helvetica,sans-serif;
          width:100%;
          cursor: pointer;
          padding: 10px 0px;
          border-radius: 5px;
          margin-top: 10px;
    }
    .tragop p {
      margin-bottom: 0px;
    }
    .buy p {
      margin-bottom: 0px;
    }
    .thongso {
      margin: 40px 0px 0px 50px ;
      
    }
    .div-thongso{
      padding-left: 40px;
    }
    #div-detail {
      background-color: #F3F4F7;
      padding: 10px;
      border-radius: 5px;
    }
    #chinhsach {
      margin-top: 20px;
      background-color: #F3F4F7;
      padding-top: 20px;
      padding-bottom: 20px;
    }

    .icon-chinhsach{
    padding:0px 5px;
      color: #F2701D
    }

    .userPho {
      border-radius: 100px;
      height: 50px;
      width: 50px;
    }
    .div-commet p {
          line-height: 1;
          margin: 0px 0px 8px;
    }
    .div-commet span {
      color: #F2701D;
    }


    /* star rate */
.star{
  color: #F2701D
}
     </style>