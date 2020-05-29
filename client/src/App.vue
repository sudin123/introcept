<template>
  <div>
    <section class="hero is-info is-fullheight">
      <div class="hero-head">
        <Navbar />
      </div>
      <router-view></router-view>
    </section>
    <Form />
    <Errors />
  </div>
</template>

<script>
import Navbar from './layout/Navbar';
import Form from './components/Form';
import Errors from './components/Errors';

export default {
  components: {
    Form,
    Navbar,
    Errors,
  },
  async created() {
    let columns = await this.$api.get('/api/columns');
    this.$store.commit('SET_COLUMNS', columns);
  },
};
</script>


<style scoped>
html,
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
}
.hero.is-info {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://unsplash.it/1200/900?random') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.hero .subtitle {
  padding: 3rem 0;
  line-height: 1.5;
}
</style>