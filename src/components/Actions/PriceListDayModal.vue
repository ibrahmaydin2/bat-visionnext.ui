<template>
  <b-modal id="priceListDayModal" :title="modalAction && modalAction.Title" size="sm" hide-footer no-close-on-backdrop>
    <div class="container">
      <b-row>
        <template>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group>
              <b-form-radio v-model="day" :aria-describedby="ariaDescribedby" name="some-radios" value="0">{{$t('index.today')}}</b-form-radio>
              <b-form-radio v-model="day" :aria-describedby="ariaDescribedby" name="some-radios" value="1">{{$t('index.tomorrow')}}</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </template>
      </b-row>
      <b-row class="mt-3">
        <div class="w-100 text-right">
          <b-button
            variant="danger"
            size="sm"
            @click="closeModal()"
          >
            {{$t('index.close')}}
          </b-button>
          <b-button
            :disabled="isLoading"
            variant="primary"
            size="sm"
            @click="save()"
          >
            <span v-if="isLoading"><b-spinner small></b-spinner> {{$t('index.loading')}}</span>
            <span v-else>{{$t('list.save')}}</span>
          </b-button>
        </div>
      </b-row>
    </div>
  </b-modal>
</template>
<script>
// import { required } from 'vuelidate/lib/validators'
export default {
  name: 'PriceListExcelModal',
  props: {
    modalItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isLoading: false,
      day: null
    }
  },
  methods: {
    save () {
      this.isLoading = true
      let request = {
        'model': {
          'addDay': this.day
        }
      }
      this.$api.postByUrl(request, 'VisionNextFinance/api/PriceList/PriceListAdjust').then(response => {
        this.isLoading = false
        if (response.IsCompleted === true) {
          this.$toasted.show(this.$t('index.success'), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
          this.closeModal()
        } else {
          this.$toasted.show(response.Message, {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'priceListDayModal')
    }

  }
}
</script>
<style scoped>
</style>
