<template>
  <b-col class="text-right">
    <b-button :title="$t('insert.creditBudget.exportExcel')" size="sm" class="mb-1" variant="success" @click="exportExcel"><i class="fas fa-file-excel"></i></b-button>
  </b-col>
</template>
<script>
import mixin from '../mixins/index'
export default {
  name: 'NextExportDetail',
  mixins: [mixin],
  data () {
    return {
    }
  },
  props: {
    url: {
      type: String,
      description: 'Export edilecek data için çağrılan url bilgisi'
    },
    recordId: {
      type: Number | String,
      description: 'Detay bilgisi almak için bağlı olunan kayıt bilgisi'
    },
    recordKey: {
      type: String,
      description: 'Detay bilgisi almak için bağlı olunan kayıdın apideki primaryKey bilgisi'
    },
    fileName: {
      type: String,
      description: 'İndirilen dosya isminin adı bilgisi'
    }
  },
  methods: {
    exportExcel () {
      this.$api.downloadByUrl(`${this.url}?${this.recordKey}=${this.recordId}`, 'get').then((response) => {
        this.downloadResponse(response, `${this.fileName}-${this.recordId}`)
      })
    }
  }
}
</script>
