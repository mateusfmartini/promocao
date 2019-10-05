<template>
  <div id="app" :class="{'login': !fornecedor }">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<Aside v-if="fornecedor"/>
		<Content />
		<Footer />
  </div>
</template>

<script>
import { baseApiUrl, chaveFornecedor } from './global'
import axios from 'axios'
import { mapState } from "vuex"
import Aside from '@/components/template/Aside.vue'
import Content from '@/components/template/Content.vue'
import Footer from '@/components/template/Footer.vue'

export default {
  name: 'app',
  components: {Aside, Content, Footer},
  computed: mapState(['fornecedor']),
  data: function() {
		return {
			validatingToken: true
		}
  },
  methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(chaveFornecedor)
			const userData = JSON.parse(json)
			this.$store.commit('setFornecedor', null)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) {
				this.$store.commit('setFornecedor', userData)
			} else {
				localStorage.removeItem(chaveFornecedor)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	mounted() {
		this.validateToken()
	}
}
</script>

<style>
	* {
		font-family: "Roboto", sans-serif;
		
	}

#app {
		display: grid;
		grid-template-rows: 1fr 1fr 40px;
		grid-template-columns: 100%;
		grid-template-areas:
			"aside"
			"content"
			"footer";
		background-color: #f1f1f1;
		min-height: 100vh;
}

@media (min-width: 768px) {
#app {
		grid-template-rows: 1fr 40px;
		grid-template-columns: 33% 1fr;
		grid-template-areas:
			"aside content"
			"footer footer";
} }

#app.login{
		grid-template-rows: 1fr 40px;
		grid-template-columns: 1fr;
		grid-template-areas:
			"content"
			"footer";
}

#app.login > .content {
	background-image: url('./assets/login-background.png');
	background-size: cover;
}

</style>
