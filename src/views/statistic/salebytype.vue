<template>
      <NavBar/>
        <div id="layoutSidenav" >
          <SideBar/>

            <!-- <router-view/>   -->
            <div id="layoutSidenav_content" style="margin-top: 30px">
      <main>
        <div class="container-fluid px-4 ">
          <div class="container-fluid">
            <h4 class="bg-primary text-white p-2">Mức Bán Theo Hãng Sản Phẩm</h4>
            <div>
              <div class="tab-pane col-md-12">
                <table class="table border">
                    <thead class="border">
                      <tr>
                        <th>Số thứ tự</th>
                        <th>Hãng sản phẩm</th>
                        <th>Số lượng đã bán</th>
                        <th>Tổng Doanh thu</th>
                        <th>Giá thấp nhất</th>
                        <th>Giá trung bình</th>
                        <th>Giá cao nhất</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border " v-for="(re, index) in revenuebytype">
                        <td >{{ index+1 }}</td>
                        <td>{{ re.category }}</td>
                        <td>{{ re.quantiry }} chiếc</td>
                        <td>{{ format(re.totalPrice) }} vnđ</td>
                        <td>{{ format(re.minPrice )}} vnđ</td>
                        <td>{{ format(re.avgPrice )}} vnđ</td>
                        <td>{{ format(re.maxPrice )}} vnđ</td>
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
                revenuebytype:[]
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
             this.$request.get('http://localhost:8082/api/revenue-by-category').then(res=>{
                         this.revenuebytype = res.data.data;
             })
          },
     }
  }
 </script>