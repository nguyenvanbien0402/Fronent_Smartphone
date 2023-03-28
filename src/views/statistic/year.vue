<template>
     <NavBar/>
        <div id="layoutSidenav" >
            <SideBar/>

            <!-- <router-view/>   -->
            <div id="layoutSidenav_content" style="margin-top: 30px">
      <main>
        <div class="container-fluid px-4 ">
          <div class="container-fluid">
            <h4 class="bg-primary text-white p-2">Doanh Thu Theo Năm</h4>
            <div>
              <div class="tab-pane col-md-12">
                    <table class="table border">
                      <thead class="border">
                        <tr>
                          <th>Số thứ tự</th>
                          <th>Năm</th>
                          <th>Số lượng đã bán</th>
                          <th>Tổng doanh thu</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border" v-for="(ye, index) in years">
                          <td>{{ index+1 }}</td>
                          <td>{{ ye.year }}</td>
                          <td>{{ ye.quantiry }} chiếc</td>
                          <td>{{ format(ye.totalPrice) }} vnđ</td>
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
                years:[]
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
             this.$request.get('http://localhost:8082/api/revenue-by-year').then(res=>{
                         this.years = res.data.data;
             })
          },
     }
  }
 </script>