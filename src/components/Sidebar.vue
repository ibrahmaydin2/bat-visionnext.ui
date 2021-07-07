<template>
  <b-sidebar id="sidebar-1" text-variant="light" backdrop shadow :title="$t('sidebar.otherApps')">
    <div class="asc__sidebar-header p-4">
      <!-- <img v-b-toggle.sidebar-1 class="mr-4" src="../../static/otherApps2.svg">
      <span> Diğer Uygulamalar </span> -->
    </div>
    <div class="px-3 py-2 asc__sidebar-body text-center">
      <b-card v-for="(app,i) in otherApps" :key="'otherapp' + i" class="mb-3">
        <a :href="app.SuccessReturnUrl" target="_blank">
          {{app.Name}}
        </a>
      </b-card>
      <!-- <b-img src="https://picsum.photos/500/500/?image=53" fluid thumbnail></b-img> -->
    </div>
  </b-sidebar>
</template>
<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      otherApps: []
    }
  },
  mounted () {
    let otherApps = JSON.parse(localStorage.getItem('UserModel')).AuthorizedInstances
    this.otherApps = otherApps ? otherApps.filter(o => o.Hash !== process.env.HASH) : []
  }
}
</script>
<style lang="sass">
.b-sidebar
  background-color: #f49201 !important
  .asc__sidebar-header
    display: flex
    align-items: center
    justify-content: center
    padding: 10px
    & img
      max-width: 30px
    & span
      font-size: 18px
      color: white
      font-weight: bold
  .asc__sidebar-body
    img
      max-height: 200px
      margin-bottom: 10px
      width: 100% !important
    .card-body
      color: #333
      font-weight: bold
</style>
