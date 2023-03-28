<template>
    
    <SearchBar/>
     <HeaderCom/>
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

import FooterCom from './FooterCom.vue';
import SearchBar from './SearchBar.vue'
import HeaderCom from './HeaderCom.vue';



 export default {
  components:{
  SearchBar,
  FooterCom,
  HeaderCom
  },
    name: "probytype",
    data() {
        return {
            productsByTypeId: []
        };
    },
    created() {
        let typeId = this.$route.params.id;
        this.getProductByTypeId(typeId);
 
    },
    methods: {

        getProductByTypeId(typeId) {
            this.$request.get("http://localhost:8082/api/pro-by-type/" + typeId).then(res => {
                this.productsByTypeId = res.data.data;
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
        }
    },
    components: { SearchBar, FooterCom, HeaderCom }
}

</script>

<style>


</style>