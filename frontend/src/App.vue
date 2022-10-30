<template>
  <div>
    <NavbarItem />
    <div class="container-fluid">
      <div class="row">
        <SidebarItem />
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <keep-alive> </keep-alive>
          <router-view />
          <!-- <hello-world /> -->
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarItem from "./components/NavbarItem.vue";
import SidebarItem from "./components/SidebarItem.vue";
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    NavbarItem,
    SidebarItem,
    // HelloWorld,
  },
};
</script>
