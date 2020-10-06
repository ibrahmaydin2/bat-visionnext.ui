<template>
  <tr>
    <td>
      <autocomplete
        ref="autocomplete"
        :search="search"
        class="autocomplete-email"
        :placeholder="$t('dashboard.search')"
        :get-result-value="getResultValue"
        @submit="handleSubmit"
        :disabled="disabled"
      ></autocomplete>
    </td>
    <td>
      <b-form-input :disabled="disabled" type="text" :value="form.title"></b-form-input>
    </td>
    <td><b-form-input :disabled="disabled" type="text" :value="form.name"></b-form-input></td>
    <td><b-form-input :disabled="disabled" type="text" :value="form.surname"></b-form-input></td>
    <td class="asc__add-row"><i @click="addUser()" class="fa fa-plus"></i></td>
  </tr>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      form: {
        title: '',
        name: '',
        surname: '',
        email: '',
        id: null
      }
    }
  },
  components: {
    name: 'EmailSearch'
  },
  computed: {
    ...mapState(['userEmails', 'sharingUser'])
  },
  methods: {
    ...mapMutations(['setSharingUserData']),
    search (input) {
      if (input.length < 1) { return [] }
      this.$store.dispatch('getUsersByEmail', {...this.data, param: input})
      return this.userEmails
    },
    getResultValue (result) {
      return result.Email
    },
    handleSubmit (result) {
      if (result) {
        this.form.title = result.Title
        this.form.name = result.Name
        this.form.surname = result.Surname
        this.form.email = result.Email
        this.form.id = result.RecordId
      }
    },
    addUser () {
      let tmpData = {
        'Title': this.form.title,
        'Name': this.form.name,
        'Surname': this.form.surname,
        'Email': this.form.email,
        'ContactId': this.form.id,
        'WorkOrderId': null,
        'Deleted': null,
        'RecordState': null

      }
      this.setSharingUserData(tmpData)
      this.form.title = ''
      this.form.name = ''
      this.form.surname = ''
      this.$refs.autocomplete.value = ''
    }
  },
  props: {
    disabled: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style scope lang="sass">
  .autocomplete-email
    .autocomplete
      text-align: center
    .autocomplete-input
      outline: none
      font-size: 14px
      width: 100%
      border: 1px dotted #bfbbbb !important
      padding: 5px
      font-weight: 500
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+)
      background-repeat: no-repeat
      background-position: center left 0
      padding-left: 25px !important
      background-size: 20px
    input::-webkit-input-placeholder
      color: #656665
      text-transform: initial !important
    .autocomplete-result-list
      line-height: 1.15
      margin: 0
      border: 1px solid rgba(0,0,0,.12)
      padding: 0
      box-sizing: border-box
      max-height: 296px
      overflow-y: auto
      background: #fff
      list-style: none
      box-shadow: 0 2px 2px rgba(0,0,0,.16)
      position: absolute
      z-index: 1
      width: 100% !important
      text-align: center
      visibility: hidden
      pointer-events: none
      color: black
      left: 50%
      transform: translate(-50%)
      box-shadow: 0 0 50px #999
      margin-top: 5px
    .autocomplete-result
      cursor: pointer
      padding: 10px
      text-align: left
      border-bottom: 0.5px solid rgba(0,0,0,.16)
</style>
