<template>
    
<SearchBar/>
<HeaderCom/>
<!-- contact -->
<div class="container-fluid slider pt-4">
  <div class="container bg-light pt-4 " style="padding: 0px 80px 0px 80px">
    <h3 class="title"><b>LIÊN HỆ</b> </h3>
     <br/>
    <div class="ct1">
        <div class="row">
            <div class="col-sm-6">

                <h4 style="color: rgb(228, 5, 5);margin-bottom: 20px;font-weight: 700;">TRỤ SỞ CHÍNH:</h4>
                <p class="add_contact"><i style="font-size: 20px;color:royalblue;" class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;&nbsp; 137 Nguyễn Thị Thập, P.Thanh Khê Tây, Q.Thanh Khê, TP.Đà Nẵng
                </p>
                <hr>
                <p class="phone_contact"> <i style="font-size: 20px;color: rgb(168, 105, 108);" class="fas fa-phone"></i>&nbsp;&nbsp; Điện thoại: <a style='color:#666'>0935542813</a>
                </p>
                    <hr>
                <p class="email_contact"><i style="font-size: 20px;color:goldenrod" class="fas fa-envelope-open-text"></i>&nbsp;&nbsp; Email: <a style='color:#666'>happyshopdn@gmail.com</a></p>
                <hr>
                <br>

                <h4 style="color: rgb(228, 5, 5);margin-bottom: 20px;font-weight: 700;">CHI NHÁNH PHÍA BẮC:</h4>
                <p class="add_contact"><i style="font-size: 20px;color:royalblue" class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;&nbsp; Tầng 9, toà nhà Diamond (Handico 6), Số 2 Hoàng Đạo Thuý, Trung Hoà Nhân Chính, Quận Thanh Xuân, Hà Nội</p>
            
                <hr>
                <p class="add_contact"> <i style="font-size: 20px;color: rgb(168, 105, 108);" class="fas fa-phone"></i>&nbsp;&nbsp; Điện thoại: <a style='color:#666'>024-73073737</a>
                </p>
                    <hr>
                <p class="email_contact"><i style="font-size: 20px;color:goldenrod" class="fas fa-envelope-open-text"></i>&nbsp;&nbsp; Email: <a style='color:#666'>happyshophn@gmail.com</a></p>
                <hr>
            </div>
            <div class="col-sm-6">

                <h4 style="color: rgb(228, 5, 5);margin-bottom: 20px;font-weight: 700;">CHI NHÁNH PHÍA NAM:</h4>
                <p class="add_contact"><i style="font-size: 20px;color:royalblue" class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;&nbsp; 750 Sư Vạn Hạnh, Phường 12, Quận 10, Tp. Hồ Chí Minh, Việt Nam.</p>
                <hr>
                <p class="add_contact"><i style="font-size: 20px;color:royalblue" class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;&nbsp; Đường số 6, Hưng Phước 4, Quận 7, Tp. Hồ Chí Minh, Việt Nam</p>
                <hr>
                <p class="phone_contact"> <i style="font-size: 20px;color: rgb(168, 105, 108);" class="fas fa-phone"></i>&nbsp;&nbsp; Điện thoại : <a style='color:#666'>028-62563737</a> – Ext: 621 | Fax : <a style='color:#666'>+84-6.2906480</a></p>
                <hr>
                <p class="email_contact"><i style="font-size: 20px;color:goldenrod" class="fas fa-envelope-open-text"></i>&nbsp;&nbsp; Email: <a style='color:#666'>happyshopsg@gmail.com</a></p>
                <hr>

            </div>
        </div>
        <br><br>

        <!-- hỗ trợ -->
        <h3>THÔNG TIN HỖ TRỢ</h3><br>
        <div class="row">
            <div class="col-sm-6">
                <div class="ky-thuat">
                    <h4><i class="fas fa-tools"></i> &nbsp;KỸ THUẬT</h4>
                    <p> <i style="font-size: 20px;" class="fas fa-phone"></i>&nbsp; Điện thoại:
                        <span><strong style="color: red;"> 1900
              1999</strong></span>
                    </p>
                    <p><i style="font-size: 20px" class="fas fa-house-damage"></i>&nbsp; Website: linhkiendientu.watchtv.vn</p>
                    <p><i style="font-size: 20px" class="fas fa-envelope-open"></i>&nbsp; Email: kythuat@pavietnam.vn</p>
                    <p><i style="font-size: 20;" class="fas fa-user-edit"></i>&nbsp; Giải quyết và hướng dẫn các sự cố kỹ thuật
                    </p>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="dich-vu ">
                    <h4><i class=" fas fa-user-cog "></i> DỊCH VỤ KHÁCH HÀNG</h4>
                    <p> <i style=" font-size: 20px; " class=" fas fa-phone "></i>&nbsp; Điện thoại: <a><span><strong
                style=" color: rgb(13, 2, 162); ">1900
                9991</strong></span></a></p>
                    <p><i style=" font-size: 20px " class=" fas fa-house-damage "></i>&nbsp; Website: dientutoancau.com</p>
                    <p><i style=" font-size: 20px " class=" fas fa-envelope-open "></i>&nbsp; Email: cus@pavietnam.vn</p>
                    <p><i style=" font-size: 20; " class=" fas fa-user-edit "></i>&nbsp; Các thủ tục hành chính liên quan đến dịch vụ</p>
                </div>
            </div>
        </div>
    </div>
    <!-- /  hỗ trợ -->
    <br>
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
  name:'about',
  data() {
    return {
          types:[],
          truck:[],
          cart:[]
    }
  },
  created() {
   this.getType()
   this.getName()
   this.getTruck()
   this.getShoppingCart()
  },
  methods: {
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
    getType() {
            this.$request.get('http://localhost:8082/api/user-category').then(res=>{
              console.log(res.data.data)
                        this.types = res.data.data;
            })
          },
          getName() {
         return  JSON.parse(localStorage.getItem('name'))
         },

  }
}
</script>

<style>

</style>