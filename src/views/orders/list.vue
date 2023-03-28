<template>
     <NavBar/>
        <div id="layoutSidenav" >
           <SideBar/>

            <!-- <router-view/>   -->
            <div id="layoutSidenav_content" style="margin-top: 30px;">
                <main>
                    <div class="container-fluid px-4">
                       
                        
    <div class="container-fluid">

        <h4 class="bg-primary text-white p-2">Đơn Hàng</h4>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Danh sách</a>
            </li>
         
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active col-md-12" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Tên khách</th>
                            <th>Liên lạc</th>
                            <th>Địa chỉ</th>
                            <th>Ngày đặt </th>
                            <th>Tổng </th>
                            <th>Sản phẩm-Số lượng-Đơn giá</th>
                            <th>Tiến trình</th>
                            <th>thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(or , index) in orders" >
                            <td>{{ or.orderId }}</td>
                            <td>{{ or.userName }}</td>
                            <td>0{{ or.phone }}</td>
                            <td>{{ or.address }}</td>
                            <td>{{ formatDate(or.orderDate) }}</td>
                            <td>{{ format(or.amount) }}</td>
                            <tr v-for="x in or.listProducts">
                                <td>{{ x.productName }}</td>
                                <td>{{ x.quantity }}</td>
                                <td>{{ format(x.unitPrice) }}</td>
                            </tr>
                            <td>
                                <div >
                                <li v-if="or.status==1">Chưa xác nhận</li>
                                <li v-if="or.status==2">Đã xác nhận</li>
                                <li v-if="or.status==3">Đang giao</li>
                                <li v-if="or.status==4">Đã giao</li>
                                <li v-if="or.status==5">Hủy đơn hàng</li>
                                </div>
                            </td>
                            <td>
                               <RouterLink :to="{name:'OrderEdit',params: {id:or.orderId }}"><button class="btn btn-warning ">Sửa</button></RouterLink>  &nbsp;
                                <button class="btn btn-danger " @click="onDelete(or.orderId)">Xóa</button>
                            </td>
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
import Footer from '../layouts/Footer.vue';
import NavBar from '../layouts/NavBar.vue';
import SideBar from '../layouts/SideBar.vue';
 export default {
    components:{
    Footer,
    NavBar,
    SideBar
},
    name:'orderList',
    data() {
         return {
              orders:[],
              selected:'',
              displayValue:false
              
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

        formatDate(dt) {
        let d = new Date(dt).toLocaleDateString("vi-VN");
        return d
      },
  
         getAll() {
            this.$request.get('http://localhost:8082/api/all-order').then(res=>{
                        console.log(localStorage.getItem('token'))
                        this.orders = res.data.data;                     
            })
         },
         display() {
            this.displayValue=!this.displayValue
         },
         onDelete(orderId) {

            this.$swal.fire({
            title: 'Xác nhận xóa ?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'có',
            cancelButtonText: 'không',
            }).then((result) => {
            if (result.isConfirmed) {
             this.$request.delete('http://localhost:8082/api/delete-order/' + orderId
             ).then(res=> {
                if(res.data.success) {
                    this.$swal.fire('đã xóa', '', 'success')
                    this.getAll()
                }
             })
            } 
           })
         },
         onEdit(orderId) {
            const formData = new FormData();
            formData.append('status',this.selected)
            this.$swal.fire({
            title: 'Xác nhận sửa ?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'có',
            cancelButtonText: 'không',
            }).then((result) => {
            if (result.isConfirmed) {
            this.$request.put('http://localhost:8082/api/update-order/' + orderId, formData
            ).then(res=> {
                console.log('ở đây' + this.status)
                if(res.data.success) {
                    this.$swal.fire('đã sửa', '', 'success')
                    this.getAll()
                }
            })

            } 
            })
            }   
    }
 }



</script>

<style>
li {
    list-style: none;
}
</style>