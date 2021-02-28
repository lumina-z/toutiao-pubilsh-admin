<template>
  <div class="home-container">
    <div class="header-right">
      <img class="header-img" :src="user.image" alt="" />
      <div>
        {{ user.name }}
        <div> {{user.date}} </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMocksUser } from "@/api/mockDemo";

export default {
  name: "HomeIndex",
  data() {
    return {
      user: {},
    };
  },

  props: {},

  components: {},

  computed: {},

  created() {
    this.loadMockUser();
  },
  methods: {
    loadMockUser() {
      getMocksUser()
        .then((res) => {
          this.user = res.data;
          console.log(this.user);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted: () => {
    // axios.get("/user/userinfo")
    //   .then((res) => {
    //     this.user = res.data
    //     console.log(user);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>
<style lang='less' scoped>
</style>