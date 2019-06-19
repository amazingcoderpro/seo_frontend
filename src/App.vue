<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "app",
  created() {
    if (localStorage.eleToken) {
      const decode = localStorage.eleToken;
      //const user = JSON.parse( localStorage.user);
      //const menu_tree = JSON.parse(localStorage.menu_tree);
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
      //this.$store.dispatch("setUser", user);
      //this.$store.dispatch("setMenuTree", menu_tree);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style scoped>
   @import url(./assets/css/base.css);
</style>
