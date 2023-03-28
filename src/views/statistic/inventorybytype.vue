<template>
        <NavBar/>
        <div id="layoutSidenav" >
            <SideBar/>

            <!-- <router-view/>   -->
            <div id="layoutSidenav_content" style="margin-top: 30px">
        <main>
          <div class="container-fluid px-4 ">
            <div class="container-fluid">
              <h4 class="bg-primary text-white p-2">Tồn Kho Theo Hãng Sản Phẩm</h4>
              <div>
                <div class="tab-pane col-md-12">
                  <table class="table border">
                    <thead class="border">
                      <tr>
                        <th>Số thứ tự</th>
                        <th>Hãng sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Giá thấp nhất</th>
                        <th>Giá trung bình</th>
                        <th>Giá cao nhất</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border" v-for="(ven ,index) in inventory">
                        <td>{{ index+ 1 }}</td>
                        <td>{{ ven.category }}</td>
                        <td>{{ ven.quantiry }} chiếc</td>
                        <td>{{format( ven.totalPrice) }} vnđ</td>
                        <td>{{ format(ven.minPrice) }} vnđ</td>
                        <td>{{ format(ven.avgPrice) }} vnđ</td>
                        <td>{{ format(ven.maxPrice) }} vnđ</td>
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
  import NavBar from '../layouts/NavBar.vue'
  import Footer from '../layouts/Footer.vue'
import SideBar from '../layouts/SideBar.vue'
  export default {
    components:{ Footer, NavBar, SideBar },
     name:'inventorybytype',
     data() {
          return {
                inventory:[]
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
             this.$request.get('http://localhost:8082/api/inventory').then(res=>{
                         this.inventory = res.data.data;
             })
          },
     }
  }
 </script>