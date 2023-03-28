<template>
 <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading"></div>
                            <div class="nav-link" href="index.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                 <RouterLink style="text-decoration: none; color: inherit;" to="/index">Trang chủ</RouterLink>
                            </div>
                            <!--  -->
                            <div class="nav-link" href="#">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                  <RouterLink style="text-decoration: none; color: inherit;" to="/typeproduct/list">Quản lý loại sản phẩm</RouterLink> 
                            </div>
                            <div class="nav-link" href="index.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                <RouterLink style="text-decoration: none; color: inherit;" to="/product/list">Quản lý  sản phẩm</RouterLink>
                            </div>
                            <div class="nav-link" href="index.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                              <RouterLink style="text-decoration: none; color: inherit;" to="/account/list">  Quản lý tài khoản </RouterLink>
                            </div>
                            <div class="nav-link" href="index.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                              <RouterLink style="text-decoration: none; color: inherit;" to="/order/list">   Quản lý đơn hàng</RouterLink>
                            </div>

                            <!--  -->
                            <div class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Quản lý thống kê
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </div>
                            <div class="" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" href="#"> <RouterLink style="text-decoration: none; color: inherit;" to="/inventory/type"> Tồn kho theo loại</RouterLink></a>
                                    <a class="nav-link" href="#"><RouterLink style="text-decoration: none; color: inherit;" to="/sale/type"> Doanh thu theo loại</RouterLink></a>
                                    <a class="nav-link" href="#"><RouterLink style="text-decoration: none; color: inherit;" to="/statistic/month"> Doanh thu theo tháng</RouterLink></a>
                                    <a class="nav-link" href="#"><RouterLink style="text-decoration: none; color: inherit;" to="/statistic/quarter"> Doanh thu theo quý</RouterLink></a>
                                    <a class="nav-link" href="#"><RouterLink style="text-decoration: none; color: inherit;" to="/statistic/year"> Doanh thu theo năm</RouterLink></a>
                                </nav>
                            </div>
                            <!--  -->
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">VAI TRÒ : QUẢN TRỊ VIÊN</div>
                        {{ getName() }}
                    </div>
                </nav>
            </div>
</template>
<script>


 export default {

    name:'SideBar',
    data() {
         return {
             
            
               
         }
    },
    created() {
    
    },

    methods:{
        getName() {
         return  JSON.parse(localStorage.getItem('name'))
         },
    
     }
   
}

</script>