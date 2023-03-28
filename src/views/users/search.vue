<template>
        <!-- header html -->
<SearchBar/>
<HeaderCom/>

    <!-- list product -->
<div class="container-fluid slider">

        <!-- tất cả sản phẩm -->
        <div class="container-fluild d-flex justify-content-center slider   ">
            <div class="col-lg-10  pt-4 ">      
               <div class="row d-flex justify-content-around wrap  ps-2 pt-3 pe-2">
                <h4 class="all-item">SẢN PHẨM TÌM KIẾM</h4>  
                <div id="item" class="bg-light " v-for=" pro in seachData" :key="index">
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


           <!-- footer -->
           <div class="container-fluild  d-flex  justify-content-center  p-5 slider">
            <div class="col-lg-10 " >
              <div class="row">
      
                <div class="col-content col-md-3">
                  <div class="link-content">
                    <h4>Hỗ Trợ - Dịch Vụ</h4>
                      <a href="/mua-hang-tra-gop">Mua hàng trả góp</a><br>
                      <a href="/huong-dan-dat-hang" >Hướng dẫn đặt hàng và thanh toán</a > <br>
                      <a href="/order/check">Tra cứu đơn hàng</a><br>
                      <a href="/chinh-sach-bao-hanh">Chính sách bảo hành</a><br>
                      <a href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</a>
                  </div>
                </div>
      
                <div class="link-content col-md-3">
                  <h4>Thông Tin Liên Hệ</h4>
                   <a href="/mua-hang-online">Bán hàng Online</a><br>
                   <a href="#">Chăm sóc Khách Hàng</a><br>
                   <a href="#">Hỗ Trợ Kỹ thuật</a><br>
                   <a href="#">Hỗ trợ Bảo hành &amp; Sửa chữa</a><br>
                   <a href="#">Liên hệ khối văn phòng</a>
              
                </div>
                <div class="link-content col-md-3">
                  <h4>
                    Siêu thị trên toàn quốc
                  </h4>
                
                      <a href="/he-thong-cua-hang"
                        >Danh sách 124 siêu thị trên toàn quốc</a > <br>
                      <a href="/he-thong-cua-hang"
                        >Danh sách siêu thị theo tỉnh thành</a
                      > <br>
                 
                      <a href="/he-thong-cua-hang"
                        >Danh sách siêu thị vùng miền</a
                      >
               
                </div>
      
                
                <div class="col-md-3">
                  <h4>Tổng đài hỗ trợ </h4>
                  <a class="hotline" href="tel:1900.2091">1900.2091</a><br>
                  <a href="">Gọi mua: 1800.1060 (7:30 - 22:00)</a><br>
                  <a href="">Kỹ thuật: 1800.1763 (7:30 - 22:00)</a><br>
                  <a href="">Khiếu nại: 1800.1062 (8:00 - 21:30)</a><br>
                  <a href="">Bảo hành: 1800.1064 (8:00 - 21:00)</a>

                </div>

              </div>
              
      
              <div class="info row mt-5">
                <p>
                  © 2020. CÔNG TY CỔ PHẦN XÂY DỰNG VÀ ĐẦU TƯ THƯƠNG MẠI HOÀNG HÀ. MST:
                  0106713191. (Đăng ký lần đầu: Ngày 15 tháng 12 năm 2014, Đăng ký
                  thay đổi ngày 24/11/2022)
                </p>
                <p>
                  <strong
                    >GP số 426/GP-TTĐT do sở TTTT Hà Nội cấp ngày 22/01/2021</strong
                  >
                </p>
                <p>
                  Địa chỉ: 89 Tam Trinh, P. Mai Động, Q. Hoàng Mai, Thành phố Hà Nội.
                  Điện thoại: 1900.2091. Chịu trách nhiệm nội dung:
                  <strong>Nguyễn Văn Biên</strong>.
                </p>
              </div>
            </div>
            </div>

</template>



<script>

import HeaderCom from './HeaderCom.vue'
import SearchBar from './SearchBar.vue'

 export default {
    name:'userHome',
    components: {
      SearchBar,
      HeaderCom,

},
      data() {
         return {
          seachData:[]
         }
    },
    created() {
     
   this.getStr()
  
    },
 
    methods:{


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


</style>