<template>
  <div id="app">
		<Aside />
		<Content />
		<Footer />
  </div>
</template>

<script>
import Aside from '@/components/template/Aside.vue'
import Content from '@/components/template/Content.vue'
import Footer from '@/components/template/Footer.vue'

export default {
  name: 'app',
  components: {Aside, Content, Footer}
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



</style>
