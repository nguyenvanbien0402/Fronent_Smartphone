<template>
<NavBar/>
<div id="layoutSidenav" >
<SideBar/>

<!-- <router-view/>   -->
<div id="layoutSidenav_content" style="margin-top: 30px">
<main>
<div class="container-fluid px-4 ">
<div class="container-fluid">
  <h4 class="bg-primary text-white p-2">Doanh Thu Theo Quý</h4>
  <div>
    <div class="tab-pane col-md-12">
      <table class="table border">
  <thead class="border">
    <tr>
      <th>Số thứ tự</th>
      <th>Năm</th>
      <th>Quý</th>
      <th>Số lượng đã bán</th>
      <th>Tổng doanh thu</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border " v-for="(qa, index) in quarter">
      <td >{{ index+1 }}</td>
      <td>{{ qa.year }}</td>
      <td>{{ qa.quarter }}</td>
      <td>{{ qa.quantiry }} chiếc</td>
      <td>{{ format(qa.totalRevenue )}} vnđ</td>
    </tr>
  </tbody>
</table>
    </div>
  </div>
</div>
</div>
</main>
<Footer/>
</div>
</div>

</template>

<script>
import Footer from '../layouts/Footer.vue'
import NavBar from '../layouts/NavBar.vue'
import SideBar from '../layouts/SideBar.vue'
export default {
    components:{ Footer, NavBar, SideBar },
   name:'inventorybytype',
   data() {
        return {
              quarter:[]
        }
   },
   created() {
     this.getAll()
   },
   methods:{
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
        getAll() {
           this.$request.get('http://localhost:8082/api/revenue-by-quarter').then(res=>{
                       this.quarter = res.data.data;
           })
        },
   }
}
</script>


