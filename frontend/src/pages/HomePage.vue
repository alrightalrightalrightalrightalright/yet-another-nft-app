<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Welcome 🖐</h1>
    </div>
    <p>New content will be added.</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomePage",
  computed: {
    ...mapGetters("accounts", ["getChainName", "isUserConnected"]),
  },
}
</script>
