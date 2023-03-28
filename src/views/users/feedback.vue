<template>

<SearchBar/>
<HeaderCom/>


<div class="container-fluid slider pt-4" style="padding: 0px 80px 0px 80px">

	<div class="container">
		<div class="row">
		
			<br>
			<div class="dang-nhap">
				<h5 class="title">
					<b>GỬI THÔNG TIN PHẢN HỒI</b>
				</h5>
				<form @submit.prevent="feedback" id="fb" class="form-horizontal" >
					<div class="control-group">
						<label class="control-label" for="inputCountry">Họ và tên
							<span style="color: red;">(*)</span>
						</label>
						<div class="controls">
							<input  v-model="opinion.name" name="hovaten" style="width: 100%;"
								placeholder="Họ và tên" type="text" class="form-control"
								><br>

						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="inputPost">Số điện thoại
							<span style="color: red;">(*)</span>
						</label>
						<div class="controls">
							<input  v-model="opinion.phone"  name="phone" style="width: 100%;"
								placeholder="Số điện thoại" type="number" class="form-control"
								><br>

						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="inputCountry">Email <span
							style="color: red;">(*)</span>
						</label>
						<div class="controls">
							<input i v-model="opinion.email"  name="email" style="width: 100%;"
								placeholder="Email" type="email" class="form-control" ><br>

						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="inputCountry">Mật khẩu <span
							style="color: red;">(*)</span>
						</label>
						<div class="controls">
							<input i v-model="opinion.password"  name="password" style="width: 100%;"
								placeholder="Mật khẩu" type="password" class="form-control" ><br>

						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="inputPost">Nội dung <span
							style="color: red;">(*)</span>
						</label>
						<div class="controls">
							<textarea  v-model="opinion.content"  name="content" style="width: 100%;"
								placeholder="Nội dung" type="text" class="form-control" rows="6"></textarea>
							<br>

						</div>
					</div>
					<br />
					<div class="control-group">
						<div class="controls text-center">
							<button type="submit" class="btn btn-success">Gửi ý kiến</button>
						</div>
					</div>
					<br />
				</form>
			</div>
		</div>
	</div>
</div>

 <FooterCom/>


</template>

<script>
import FooterCom from './FooterCom.vue';
import HeaderCom from './HeaderCom.vue';
import SearchBar from './SearchBar.vue';

export default {

  components: {
  HeaderCom,
  SearchBar,
  FooterCom
  },
    name: "FeedBack",
    data() {
        return {
          opinion : {
			name:'',
			phone:'',
			email:'',
			content:'',
			password:''
		  }
        };
    },
    created() {
      
    },
    methods: {
     feedback () {
		this.$request.post('http://localhost:8082/api/recevie-mail', this.opinion ).then(res=> {
                  if(res.data.success ) {
                    this.$swal.fire('Gửi ý kiến thành công', '', 'success')
					this.opinion=''
                   
                  } 
                }).catch(res => {
					this.$swal.fire('Đăng nhập để gửi ý kiến ')
                    })   
	 }
       
    },
    components: { SearchBar, HeaderCom, FooterCom }
}
</script>

<style>

</style>