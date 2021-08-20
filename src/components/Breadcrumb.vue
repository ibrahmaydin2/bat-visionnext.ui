<template>
  <div>
    <CommonInfoModal :modalAction="modalAction" :modalItem="modalItem" />
    <b-breadcrumb>
      <b-breadcrumb-item :to="{name: 'Dashboard'}">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      </b-breadcrumb-item>
      <!--<b-breadcrumb-item v-for="(it, i) in breadcrumbList" :key="'brc' + i">
        {{ it.title }}
      </b-breadcrumb-item>-->
      <b-breadcrumb-item :to="{name: baseName}">
        {{ $t('router.'+baseName) }}
      </b-breadcrumb-item>
      <b-breadcrumb-item :active="!title" :class="routeName.includes('Get') ? '' : 'info-breadcrumb-item'">
        {{ $t('router.'+routeName) }}
      </b-breadcrumb-item>
      <b-breadcrumb-item v-if="title" active :class="routeName.includes('Get') ? '' : 'info-breadcrumb-item'">
        {{ title }}
      </b-breadcrumb-item>
      <li v-if="routeName.includes('Update') || routeName.includes('Get')">
        <span class="ml-3"><i v-b-tooltip.hover :title="$t('insert.commonInfo.recordInfo')" @click="getInfoModal" class="info-icon fa fa-info-circle"></i></span>
      </li>
    </b-breadcrumb>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['title'],
  data () {
    return {
      baseName: this.$route.meta.baseLink,
      routeName: this.$route.name,
      modalItem: {},
      modalAction: {}
    }
  },
  mounted () {
    this.baseName = this.$route.meta.baseLink
    this.routeName = this.$route.name
  },
  computed: {
    ...mapState(['breadcrumbList'])
  },
  methods: {
    getInfoModal () {
      this.$api.getByUrl(`VisionNextUIOperations/api/UIOperationGroupUser/GetFormFields?name=${this.$route.meta.baseLink}`).then((response) => {
        if (response && response.UIPageModels && response.UIPageModels.length > 0) {
          let actions = response.UIPageModels[0].RowActions

          if (actions && actions.length > 0) {
            let filteredActions = actions.filter(f => f.Action === 'Info')

            if (filteredActions && filteredActions.length > 0) {
              this.modalAction = filteredActions[0]
              this.modalItem = {
                RecordId: this.$route.params.url
              }
              this.$nextTick(() => {
                this.$bvModal.show('common-info-modal')
              })
            } else {
              this.showNoInfoMessage()
            }
          } else {
            this.showNoInfoMessage()
          }
        } else {
          this.showNoInfoMessage()
        }
      })
    },
    showNoInfoMessage () {
      this.$bvToast.toast(this.$t('insert.commonInfo.noInfoMessage'), {
        title: this.$t('index.error'),
        variant: 'danger',
        toaster: 'b-toaster-top-right',
        noCloseButton: false
      })
    }
  }
}
</script>

<style>
  .breadcrumb {
    background-color: transparent;
    padding: 0px 0px;
    margin-bottom: 15px;
  }
  .breadcrumb-item.active {
    color: #fff !important;
    background: #ff8b4d !important;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 0px 0px 0px 20px;
  }
  .breadcrumb-item.active::before {
    display: none !important;
  }
  .breadcrumb-item.active::before {
    content: "";
    display: table;
    clear: both;
  }
  .breadcrumb-item {
    position: relative;
    line-height: 30px;
    padding: 0px 20px 0px 1.5rem;
    background: #efefef;
  }
  .breadcrumb-item a {
    color: #000;
    padding-left: 15px;
  }
  .breadcrumb-item:first-child a {
    padding-left: 0px;
  }
  .breadcrumb-item::before {
    content: "" !important;
    position: absolute;
    top: -3px;
    left: 100%;
    height: 0;
    width: 0;
    border: 18px solid transparent;
    border-right-width: 0px;
    border-left-width: 14px;
    z-index: 1;
    border-left-color: #ffffff;
    margin: 0;
    display: inline-block;
    content: '';
  }
  .breadcrumb-item::after {
    content: "" !important;
    position: absolute;
    top: 0;
    left: 100%;
    height: 0;
    width: 0;
    border: 15px solid transparent;
    border-right-width: 0;
    border-left-width: 12px;
    z-index: 1;
    border-left-color: #efefef;
    margin: 0;
    display: inline-block;
    content: '';
    color: #959fa5;
  }
  .info-breadcrumb-item::after {
    display: none;
  }
</style>
