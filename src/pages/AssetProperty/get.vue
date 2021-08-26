<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.AssetProperty.Code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.AssetProperty.Description1')}}:</b> {{ rowData.Description1 }}</span>
          </section>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextAsset/api/AssetProperty', record: this.$route.params.url})
    }
  }
}
</script>
