<template>
	<main id="app">
    	<router-view></router-view>
  	</main>
</template>

<script>
	export default {
		name: 'app',
	}
</script>

<style lang="scss">
$corPrincipal: #007aff;

body{
	margin: 0px;
	padding: 0px;
	background-color: #f8f8f8;
	font-family: 'Roboto', sans-serif;
	font-weight: 400; 
	
	.main-content{
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    flex-flow: column;
	    width: 1024px;
	    min-height: 100vh;
	    margin: 0 auto;
	    
	    &__title{
	        color: $corPrincipal;
	        font-size: 25px;
	        font-weight: 700;
	        text-transform: uppercase;
	        margin-top: 0px;
	        margin-bottom: 5px;
	    }

	    &__subtitle{
	        color: #757374;
	        font-size: 18px;
	        font-weight: 700;
	        margin-top: 0px;
	        margin-bottom: 30px;
	    }
	}

	.content-boxes{
	    display: flex;
	    justify-content: space-between;
	    flex-flow: row wrap;
	}
}
</style>
