<template>
  <div>
    <b-dropdown-group header="Workflow">
      <b-dropdown-item @click="getWorkFlowProcessModel(workFlow.RecordId)" v-for="(workFlow, i) in workFlowList" :key="i">
        <!-- <i class="far fa-list-alt" /> -->
        <img width="10" height="10" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTM5NC44LDIyMi44NTFMMTg2LjA2NSwxNC4xMTZjLTE4LjgyMS0xOC44MjEtNTEuMzI4LTE4LjgyMS02OC40MzgsMGMtMTguODIsMTguODIxLTE4LjgyLDQ5LjYxNywwLDY4LjQzOCAgICBMMjkwLjQzMywyNTcuMDdMMTE3LjYyOCw0MjkuODc1Yy0xOC44MiwxOC44MjEtMTguODIsNDkuNjE4LDAsNjguNDM4QzEyNi4xODMsNTA2Ljg2OCwxMzkuODcsNTEyLDE1MS44NDYsNTEyICAgIGMxMS45NzYsMCwyNS42NjUtNS4xMzIsMzQuMjE5LTEzLjY4OEwzOTQuOCwyOTEuMjg4YzguNTU1LTguNTU1LDEzLjY4OC0yMi4yNDIsMTMuNjg4LTM0LjIxOSAgICBDNDA4LjQ4OCwyNDUuMDkzLDQwMy4zNTUsMjMxLjQwNiwzOTQuOCwyMjIuODUxeiBNMzcwLjg0NywyNjcuMzM1TDE2My44MjMsNDc0LjM2Yy01LjEzMyw1LjEzMi0xNS4zOTgsNS4xMzItMjAuNTMxLDAgICAgYy01LjEzMy01LjEzMi01LjEzMy0xNS4zOTksMC0yMC41MzFsMTg0Ljc4Mi0xODQuNzgyYzYuODQ0LTYuODQ0LDYuODQ0LTE3LjEwOSwwLTIzLjk1M0wxNDEuNTgxLDYwLjMxMiAgICBjLTUuMTMzLTYuODQ0LTUuMTMzLTE1LjM5OSwwLTIwLjUzMWMzLjQyMi0zLjQyMiw2Ljg0NC01LjEzMiwxMC4yNjYtNS4xMzJjMy40MjIsMCw2Ljg0NCwxLjcxLDEwLjI2Niw1LjEzMmwyMDguNzM1LDIwOC43MzUgICAgYzMuNDIyLDMuNDIyLDUuMTMyLDYuODQ0LDUuMTMyLDEwLjI2NkMzNzQuMjY5LDI2MC40OTEsMzcyLjU1OCwyNjUuNjI1LDM3MC44NDcsMjY3LjMzNXoiIGZpbGw9IiNmNzhiNGUiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+" />
        <!-- <img width="15" height="15" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMS43MDkgNTExLjcwOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNDk2LjcwOSAxOTkuMjk4aC00Ny4zOWMtMy4yNTUtMTAuNjU4LTcuMzg3LTIxLjAyMy0xMi4zNTYtMzAuOTk0bDM3LjE3Ni0zNy4xNzdjMi44MTMtMi44MTMgNC4zOTQtNi42MjggNC4zOTQtMTAuNjA2IDAtMy45NzktMS41OC03Ljc5My00LjM5NC0xMC42MDZsLTY2LjE0OS02Ni4xNDljLTUuODU3LTUuODU4LTE1LjM1NS01Ljg1OC0yMS4yMTMgMGwtMzYuMDAyIDM2LjAwMWMtMTAuMTIzLTUuMzkzLTIwLjY4NC05LjkwOC0zMS41NzQtMTMuNTAxdi01MS4xMDJjMC04LjI4NC02LjcxNi0xNS0xNS0xNWgtOTMuNTQ4Yy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1djUwLjAxM2MtMTEuNDA4IDMuNTQtMjIuNDc4IDguMDkxLTMzLjA5NiAxMy42MDVsLTMyLjQwNS0zMi40MDVjLTUuODU3LTUuODU4LTE1LjM1NS01Ljg1Ny0yMS4yMTMgMGwtNjYuMTQ4IDY2LjE0OGMtNS44NTggNS44NTctNS44NTggMTUuMzU1IDAgMjEuMjEzbDMyLjY1NCAzMi42NTVjLTUuNDE2IDEwLjU3My05Ljg3OCAyMS41NzktMTMuMzQxIDMyLjkwNWgtNDcuMTA0Yy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1djkzLjU0OGMwIDguMjg0IDYuNzE2IDE1IDE1IDE1aDQ4LjczOGMzLjU0NyAxMC41OTUgNy45NjkgMjAuODc0IDEzLjIyMyAzMC43MzdsLTM0LjgyMyAzNC44MjJjLTIuODEzIDIuODEzLTQuMzk0IDYuNjI4LTQuMzk0IDEwLjYwNyAwIDMuOTc4IDEuNTggNy43OTMgNC4zOTQgMTAuNjA2bDY2LjE0OCA2Ni4xNDhjNS44NTcgNS44NTggMTUuMzU1IDUuODU4IDIxLjIxMyAwbDM1Ljk5Ni0zNS45OTZjOS4xMjMgNC41NDkgMTguNTcgOC4zOTcgMjguMjU5IDExLjUxdjQ1LjI2NWMwIDguMjg0IDYuNzE2IDE1IDE1IDE1aDkzLjU0OGM4LjI4NCAwIDE1LTYuNzE2IDE1LTE1di00NS4xNWMxMC40OTUtMy4zNTEgMjAuNzA5LTcuNTY1IDMwLjU0My0xMi42MDNsMzcuMzAxIDM3LjNjNS44NTYgNS44NTcgMTUuMzU0IDUuODU4IDIxLjIxMyAwbDY2LjE0OS02Ni4xNDhjMi44MTMtMi44MTMgNC4zOTQtNi42MjggNC4zOTQtMTAuNjA3IDAtMy45NzgtMS41OC03Ljc5My00LjM5NC0xMC42MDZsLTM3LjA1My0zNy4wNTNjNC44MTktOS4yODQgOC45MDgtMTguOTI0IDEyLjIyOC0yOC44MzNoNDkuMDI2YzguMjg0IDAgMTUtNi43MTYgMTUtMTV2LTkzLjU0OGMwLTguMjgzLTYuNzE2LTE0Ljk5OS0xNS0xNC45OTl6bS0xNSA5My41NDhoLTQ1LjE0NmMtNi43NjggMC0xMi42OTYgNC41MzEtMTQuNDc0IDExLjA2MS00LjA3NSAxNC45NzQtMTAuMTc2IDI5LjM0LTE4LjEzMyA0Mi42OTktMy41MTMgNS44OTgtMi41NzMgMTMuNDI4IDIuMjgxIDE4LjI4MmwzNC40NSAzNC40NS00NC45MzcgNDQuOTM1LTM0LjY0OS0zNC42NDljLTQuODMyLTQuODMxLTEyLjMxNC01Ljc4OC0xOC4yMDMtMi4zMjgtMTMuODkgOC4xNTgtMjguNzk5IDE0LjMwOC00NC4zMTUgMTguMjc2LTYuNjM5IDEuNjk4LTExLjI4MiA3LjY4LTExLjI4MiAxNC41MzJ2NDEuNDRoLTYzLjU0OHYtNDEuNTMzYzAtNi44NDEtNC42MjktMTIuODE1LTExLjI1My0xNC41MjQtMTQuNzc1LTMuODEyLTI5LjAwNy05LjYwMS00Mi4yOTgtMTcuMjA3LTUuODczLTMuMzYyLTEzLjI3MS0yLjM3NC0xOC4wNTcgMi40MTNsLTMzLjI1NCAzMy4yNTMtNDQuOTM2LTQ0LjkzNSAzMi4zMTItMzIuMzFjNC44OTktNC44OTkgNS44MDYtMTIuNTE1IDIuMTkzLTE4LjQyNy04LjQ0My0xMy44Mi0xNC44OC0yOC43NDgtMTkuMTMtNDQuMzY3LTEuNzc2LTYuNTMtNy43MDYtMTEuMDYyLTE0LjQ3NC0xMS4wNjJoLTQ0Ljg1NnYtNjMuNTQ4aDQzLjU0NmM2LjkyNiAwIDEyLjk1MS00Ljc0MiAxNC41OC0xMS40NzQgMy45NDItMTYuMzAxIDEwLjI3My0zMS45NDEgMTguODE1LTQ2LjQ4NSAzLjQ2LTUuODkgMi41MDMtMTMuMzczLTIuMzI3LTE4LjIwM2wtMzAuMDA0LTMwLjAwNCA0NC45MzYtNDQuOTM1IDI5LjgwMyAyOS44MDJjNC44NTQgNC44NTUgMTIuMzgzIDUuNzk0IDE4LjI4MiAyLjI4MSAxNC41NDYtOC42NjQgMzAuMjMtMTUuMTA3IDQ2LjYxNy0xOS4xNTEgNi42OTgtMS42NTMgMTEuNDA1LTcuNjYzIDExLjQwNS0xNC41NjN2LTQ2LjQwMWg2My41NDh2NDcuMjc2YzAgNi43OTMgNC41NjUgMTIuNzM5IDExLjEyOSAxNC40OTIgMTUuOSA0LjI0OCAzMS4wODYgMTAuNzU0IDQ1LjEzNyAxOS4zMzggNS45MTIgMy42MTEgMTMuNTI4IDIuNzA1IDE4LjQyNy0yLjE5NGwzMy40OS0zMy40OSA0NC45MzYgNDQuOTM1LTM0LjQzNCAzNC40MzRjLTQuNzg2IDQuNzg2LTUuNzc0IDEyLjE4My0yLjQxMiAxOC4wNTcgOC4wMjUgMTQuMDIzIDE0LjAyMSAyOS4xMDEgMTcuODIzIDQ0LjgxMyAxLjYyOCA2LjczMSA3LjY1MyAxMS40NzMgMTQuNTc5IDExLjQ3M2g0My44MzN6IiBmaWxsPSIjZjc4YjRlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0ibTE0Mi40MDQgMjM2LjQyYzMuMDgxIDQuODI1IDkuNjYzIDguMTg2IDE2LjI3MyA2LjQwOWwyNi41NjgtNi43MTJjOC4wMzItMi4wMjkgMTIuODk4LTEwLjE4NSAxMC44NjktMTguMjE3LTEuNzQyLTYuODk2LTguMDA1LTExLjQ0Ni0xNC44MjMtMTEuMzEzIDE2LjI0Mi0yNC4xNzQgNDMuODQtMzkuNTgzIDc0LjA5My0zOS41ODMgMzguODgxIDAgNzIuOTk0IDI0Ljg0NCA4NC44ODggNjEuODIgMi41MzcgNy44ODYgMTAuOTgyIDEyLjIyNSAxOC44NzIgOS42ODcgNy44ODctMi41MzcgMTIuMjI0LTEwLjk4NiA5LjY4Ny0xOC44NzItMTUuODk3LTQ5LjQyNi02MS40ODgtODIuNjM1LTExMy40NDYtODIuNjM1LTQzLjAyMSAwLTgyLjA0NCAyMy4zMTQtMTAzLjAyMSA1OS4yNjYtNC43MDUtNS45NTMtMTMuMjQyLTcuNTA3LTE5Ljc5My0zLjM1Mi02Ljk5NiA0LjQzNy05LjA3IDEzLjcwNi00LjYzMyAyMC43MDFsMTQuMzk4IDIyLjcwMWMuMDIyLjAzNC4wNDYuMDY2LjA2OC4xeiIgZmlsbD0iI2Y3OGI0ZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGQ9Im0zNjkuNTE0IDI3NS42MTNjLTMuMDY1LTQuODk0LTkuNDk4LTguNTk0LTE2LjQ4My02LjczM2wtMjYuNTY4IDYuNzExYy04LjAzMiAyLjAyOS0xMi44OTggMTAuMTg1LTEwLjg2OSAxOC4yMTcgMS43MTggNi43OTkgNy44MjUgMTEuMzMgMTQuNTMyIDExLjMzLjA5NSAwIC4xOTEtLjAwNy4yODYtLjAwOS0xNi4yNDMgMjQuMTctNDMuODM5IDM5LjU3NS03NC4wODggMzkuNTc1LTM4Ljg4IDAtNzIuOTkzLTI0Ljg0NC04NC44ODgtNjEuODItMi41MzctNy44ODYtMTAuOTg3LTEyLjIyNS0xOC44NzMtOS42ODYtNy44ODYgMi41MzctMTIuMjIzIDEwLjk4Ni05LjY4NiAxOC44NzMgMTUuODk4IDQ5LjQyNiA2MS40ODkgODIuNjM0IDExMy40NDYgODIuNjM0IDQzLjAyMSAwIDgyLjA0NC0yMy4zMTQgMTAzLjAyMS01OS4yNjUgNC43MDUgNS45NTMgMTMuMjQzIDcuNTA2IDE5Ljc5MyAzLjM1MiA2Ljk5Ni00LjQzOCA5LjA3LTEzLjcwNiA0LjYzMy0yMC43MDF6IiBmaWxsPSIjZjc4YjRlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" /> -->
        <span class="ml-1">{{workFlow.Description1}}</span>
      </b-dropdown-item>
    </b-dropdown-group>
    <b-modal id="processModal" class="mr-5" refs="processModal" :title="modalTitle" hide-footer @hide="closeModal" no-close-on-backdrop>
      <div class="p-2" v-if="modalOptions.length > 0">
        <v-select :options="modalOptions" @input="selectedType" label="Label" />
      </div>
      <div class="process-modal-footer mt-2">
        <div class="w-100 text-right">
          <b-button type="button" @click="closeModal()" variant="danger" size="md" >
            {{$t('insert.cancel')}}
          </b-button>
          <b-button id="submitButton" type="button" size="md" @click="save()" variant="success" >
            {{$t('insert.confirm')}}
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'Workflow',
  props: {
    value: {},
    items: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      workFlowList: [],
      recordId: this.$route.params.url,
      processModel: [],
      modalTitle: '',
      modalOptions: [],
      selectedProcess: null,
      baseLink: this.$route.meta.baseLink
    }
  },
  mounted () {
    if (this.items.length < 1) {
      this.getAllData()
    } else {
      this.workFlowList = this.items
      console.log(this.workFlowList)
    }
  },
  methods: {
    getAllData () {
      if (!this.value || !this.value.ControllerName || !this.value.ClassName || !this.value.PageName) {
        return
      }
      let request = {
        'ControllerName': this.value.ControllerName, // 'Customer', // T_UI_FROM ActionUrl
        'ClassName': this.value.ClassName, // 'Customer', // T_SYS_TABLE ObjectName
        'PageName': this.value.PageName // 'pg_Customer' // T_SYS_FORM
      }
      // let request = {
      //   'ControllerName': this.baseLink, // T_UI_FROM ActionUrl
      //   'ClassName': this.baseLink, // T_SYS_TABLE ObjectName
      //   'PageName': `pg_${this.baseLink}` // T_SYS_FORM
      // }
      this.$api.post(request, 'Workflow', 'Workflow/GetWorkflowList').then((res) => {
        this.workFlowList = res.ListModel.BaseModels
      })
    },
    getWorkFlowProcessModel (workflowId) {
      this.workFlowId = workflowId
      let request = {
        'WorkflowId': workflowId, // Workflow ID
        'RecordId': this.recordId // Get ID (İlgili Kaydın ID'si)
      }
      this.$api.post(request, 'Workflow', 'Workflow/GetWorkflowProcessModel').then((res) => {
        console.log(res)
        if (!res.ProcessModel || res.ProcessModel.OperationProcessModel.length < 1) {
          this.$toasted.show(this.$t('insert.errorProcess'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.modalTitle = res.ProcessModel.Description1
        res.ProcessModel.OperationProcessModel.map(process => {
          this.modalOptions.push({
            Id: process.RecordId,
            Label: process.ToValue.Label
          })
        })
        this.$root.$emit('bv::show::modal', 'processModal')
      })
    },
    selectedType (e) {
      if (e) {
        this.selectedProcess = e.Id
      } else {
        this.selectedProcess = null
      }
    },
    save () {
      if (!this.selectedProcess) {
        this.$toasted.show(this.$t('insert.pleaseChooseField'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      let request = {
        'WorkflowOperationId': this.selectedProcess, // OperationProcessModel ID'si
        'InfoText': 'Ahmet Test.',
        'WorkflowId': this.workFlowId, // Workflow ID
        'RecordId': this.recordId // Get ID (İlgili Kaydın ID'si)

      }
      this.$api.post(request, 'Workflow', 'Workflow/ProcessWorkflow').then((res) => {
        this.$toasted.show(this.$t('insert.success'), {
          type: 'success',
          keepOnHover: true,
          duration: '3000'
        })
        this.closeModal()
      })
    },
    closeModal () {
      this.selectedProcess = null
      this.modalOptions = []
      this.$root.$emit('bv::hide::modal', 'processModal')
    }
  }
}
</script>
<style lang="sass">
  #processModal .modal-dialog
    margin-right: 5rem !important

  .bg-orange
    background-color: #f78b4e
    border: none
    &:hover
      background: #f78b4e
  .bat__workflow-dropdown
    .bat__workflow-dropdown-btn
      &:hover
        color: black !important
        text-decoration: none !important
    .dropdown-menu
      box-shadow: 0 0 10px #a2a2a2
      max-height: 400px
      overflow-x: hidden
      overflow-y: auto
      .b-dropdown-text
        width: 200px
        margin: 0px 10px 0px 10px
        color: #333 !important
        padding: 7px 10px
      .dropdown-item
        width: 200px
        margin: 0px 10px 0px 10px
        color: #333 !important
        border-bottom: 1px #efefef solid
        font-size: 12px
        padding: 7px 10px
        display: flex
        align-items: center
        span
          white-space: normal !important
        &:hover
          background-color: #efefef
        & i
          padding: 2px
          color: #333
        & a
          color: #333
          display: block
      .active
        background-color: transparent
        & i
          padding: 2px
</style>
