<template>
  <div id="app">
    <ion-tabs>
      <ion-tab tab="/">
        <home/>
      </ion-tab>
=
      <ion-tab tab="department">
        <department/>
      </ion-tab>

      <ion-tab tab="region">
        <region/>
      </ion-tab>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="/">
          <ion-icon name="navigate"></ion-icon>
          <ion-label>code postal</ion-label>

        </ion-tab-button>
        <ion-tab-button tab="department">
          <ion-icon name="pin"></ion-icon>
          <ion-label>départment</ion-label>

        </ion-tab-button>
        <ion-tab-button tab="region">
          <ion-icon name="map"></ion-icon>
          <ion-label>région</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
  import home from '@/components/Home.vue'
  import department from '@/components/department.vue'
  import region from '@/components/region.vue'
  export default {
    components: {
      home,
      department,
      region
    }
  }
</script>
