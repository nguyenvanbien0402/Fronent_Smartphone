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
            <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><RouterLink style="text-decoration: none; color: inherit;" to="/order/list">Danh sách</RouterLink></a>
        </li>
        </ul>
        <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active col-md-12" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <table class="table">
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Tên khách </th>
                        <th>Liên lạc</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th>Tiến trình</th>
                        <th>Sửa tiến trình</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{{ or.orderId }}</td>
                        <td>{{ or.userName }}</td>
                        <td>0{{ or.phone }}</td>
                        <td>{{ or.email }}</td>
                        <td>{{ or.address }}</td>
                        <td>{{ format(or.amount) }}</td>
                        <td>
                            <div >
                            <li v-if="or.status==1">Chưa xác nhận</li>
                            <li v-if="or.status==2">Đã xác nhận</li>
                            <li v-if="or.status==3">Đang giao</li>
                            <li v-if="or.status==4">Đã giao</li>
                            <li v-if="or.status==5">Hủy đơn hàng</li>
                            </div>
                        </td>
                        <td >
                            <select 
                            class="form-select form-select-md dropdown"
                            aria-label=".form-select-md example"
                                v-model="selected"
                            > 
                            <option disabled value="">sửa trạng thái</option>
                            <option value="1">Chưa xác nhận</option>
                            <option value="2">Đã xác nhận</option>
                            <option value="3">Đang giao</option>
                            <option value="4">Đã giao</option>
                            <option value="5">Hủy Đơn hàng</option>
                            </select>
                    
                        </td>
                        <td>
                            <button class="btn btn-warning" @click="onEdit(or.orderId,or.status)">Sửa</button> &nbsp;
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
        import Footer from '../layouts/Footer.vue'
        import NavBar from '../layouts/NavBar.vue'
       import SideBar from '../layouts/SideBar.vue'
        export default {
            components:{ Footer, NavBar, SideBar },
        name:'orderList',
        data() {
        return {
            selected:'',
            or:{
                orderDate:'',
                orderId:'',
                name:'',
                userName:'',
                phone:'',
                email:'',
                amount:'',
                address:'',
                status:'',
                listProduct:{}

            }, 
            displayValue:false
            
        }
        },
        created() {
       let oderID = this.$route.params.id
       this.getOrderDtail(oderID) 
        },
        methods:{
            formatDate(dt) {
        let d = new Date(dt).toLocaleDateString("vi-VN");
        return d
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

        getOrderDtail(oderid) {
            this.$request.get('http://localhost:8082/api/get-order-by-order-id/' + oderid
            ).then(res=> {
                    this.or = res.data
             
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
                this.getOrderDtail(orderId)
            }
            })
        } 
        })
        },
        onEdit(orderId,status) {
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
            if(res.data.success) {
                this.$swal.fire('đã sửa', '', 'success')
                this.getOrderDtail(orderId)
                if(status==1)
         {
            const email = new FormData();
        email.append("orderDate",this.formatDate(this.or.orderDate))
        email.append("orderId",this.or.orderId)
        email.append("amount",this.format(this.or.amount))
        email.append("phone",this.or.phone)
        email.append("address",this.or.address)
        email.append("email",this.or.email)
        this.$request.post('http://localhost:8082/api/email' , email
        ).then(res=> {
            if(res.data.success) {
                this.$swal.fire('đã Gửi email xác nhận', '', 'success')
                
            }
        })

        
         }

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