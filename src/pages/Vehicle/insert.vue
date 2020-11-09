<template>
  <b-row>
    <b-col cols="12">
      <header>
        <Breadcrumb />
        <div>
          <router-link :to="{name: 'Dashboard' }">
            <b-button size="sm" variant="outline-danger">Cancel</b-button>
          </router-link>
          <b-button @click="save()" size="sm" variant="success">Save</b-button>
        </div>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col cols="2">
            <b-form-group
              label="Enter your name"
            >
              <b-form-input />
            </b-form-group>
          </b-col>
          <b-col cols="2">
            <b-form-group
              label="Enter your name"
            >
              <b-form-input />
            </b-form-group>
          </b-col>
          <b-col cols="2">
            <b-form-group
              label="Enter your name"
            >
              <b-form-input />
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <b-col cols="3">
              <b-form-group
                label="Enter your name"
              >
                <b-form-input />
              </b-form-group>
            </b-col>
            <b-col cols="3">
            </b-col>
            <b-col cols="3">
              <b-form-group
                label="Enter your name"
              >
                <b-form-input />
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group
                label="Enter your name"
              >
                <b-form-input />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="3">
              <b-form-group
                label="Enter your name"
              >
                <b-form-input />
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group
                label="Enter your name"
              >
                <b-form-input />
              </b-form-group>
            </b-col>
            <b-col cols="3">
            </b-col>
            <b-col cols="3">
              <b-form-group
                label="Enter your name"
              >
                <b-form-input />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="3">
              <b-form-group
                label="Enter your name"
              >
                <b-form-input />
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group
                label="Enter your name"
              >
                <b-form-input />
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group
                label="Enter your name"
              >
                <b-form-input />
              </b-form-group>
            </b-col>
            <b-col cols="3">
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.other')">
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      form: {
      }
    }
  },
  computed: {
    ...mapState([])
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
  },
  methods: {
    save () {
      let createData = {
      }
      this.$store.dispatch('createData', {...this.query, info: createData})
    }
  }
}
</script>
<style lang="sass">
</style>
