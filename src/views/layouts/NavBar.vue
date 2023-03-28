<template>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <!-- Navbar Brand-->
            <a class="navbar-brand ps-3" href="#">Trang quản lý</a>
            <!-- Sidebar Toggle-->
            <!-- Navbar Search-->
            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div class="input-group">
                  
                </div>
            </form>
            <!-- Navbar-->
         <button @click="thoat " class="btn btn-primary ">Đăng xuất</button>
        </nav>
</template>
<script>


 export default {

    name:'NavBar',
    data() {
         return {
             
            
               
         }
    },
    created() {
    
    },

    methods:{

      thoat() {
        this.$router.push({name: 'userSignin'})
        localStorage.removeItem('name')
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
      }
     }
   
}

</script>