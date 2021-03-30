<template>
  <section>
    <ol class="index-progress-bar">
      <li :class="getStatus(item.Code)" v-for="(item, i) in allStatus" :key="i">
        <span>{{item.Description_2}}</span>
      </li>

      <!-- <li class="is-complete"><span>001 - Order Created</span></li>
      <li class="is-complete"><span>100 - Lab Received</span></li>
      <li class="is-complete"><span>300 - Sequencing</span></li>
      <li class="is-active"><span>500 - Analysing</span></li>
      <li class=""><span>600 - Detailed Analysis</span></li>
      <li class=""><span>800 - Pending Approval</span></li>
      <li class=""><span>900 - Completed</span></li> -->
    </ol>
  </section>
</template>
<script>
export default {
  name: 'TestStatus',
  data () {
    return {
      className: ''
    }
  },
  props: ['status', 'allStatus'],
  methods: {
    getStatus (code) {
      let className = ''
      code = Number(code)

      if (code < this.status) {
        className = 'is-complete'
      } else if (code === this.status) {
        className = 'is-active'
      } else {
        className = ''
      }

      return className
    }
  }
}
</script>

<style>

.index-progress-bar {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  width: 250px;
  margin: 0 0 1rem 0;
}

.index-progress-bar li {
  flex: 2;
  position: relative;
  padding: 0 0 10px 0;
  font-size: .875rem;
  line-height: 1.5;
  color: #000;
  font-weight: 600;
  white-space: nowrap;
  overflow: visible;
  min-width: 0;
  text-align: center;
  border-bottom: 2px solid #e8e8e8;
}

  .index-progress-bar li:first-child,
  .index-progress-bar li:last-child {
    flex: 1;
  }

  .index-progress-bar li:last-child {
    text-align: right;
  }

  .index-progress-bar li:before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: #e8e8e8;
    border-radius: 50%;
    border: 1px solid #fff;
    position: absolute;
    left: calc(50% - 6px);
    bottom: -5px;
    z-index: 3;
    transition: all .2s ease-in-out;
  }

  .index-progress-bar li:first-child:before {
    left: 0;
  }

  .index-progress-bar li:last-child:before {
    right: 0;
    left: auto;
  }

.index-progress-bar span {
  transition: opacity .3s ease-in-out;
}

.index-progress-bar li:not(.is-active) span {
  opacity: 0;
}

.index-progress-bar .is-complete:not(:first-child):after,
.index-progress-bar .is-active:not(:first-child):after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: -2px;
  left: -50%;
  z-index: 2;
  border-bottom: 1px solid #53a318;
}

.index-progress-bar li:last-child span {
  width: 200%;
  display: inline-block;
  position: absolute;
  left: -100%;
}

.index-progress-bar .is-complete:last-child:after,
.index-progress-bar .is-active:last-child:after,
.index-progress-bar .is-error:last-child:after {
  width: 200%;
  left: -100%;
}

.index-progress-bar .is-complete:before {
  background-color: #53a318;
  }

.index-progress-bar .is-error:before {
  background-color: red;
}

.index-progress-bar .is-active:before,
.index-progress-bar li:hover:before,
.index-progress-bar .is-hovered:before {
  background-color: #fff;
  border-color: #53a318;
}

.index-progress-bar li:hover:before,
.index-progress-bar .is-hovered:before {
  transform: scale(1.33);
}

.index-progress-bar .is-error:before {
  background-color: #a70d0d;
  border-color: #a70d0d;
}

.index-progress-bar .is-error:hover:before {
  background-color: #a70d0d;
  border-color: #a70d0d;
}

.index-progress-bar li:hover span,
.index-progress-bar li.is-hovered span {
  opacity: 1;
}

.index-progress-bar:hover li:not(:hover) span {
  opacity: 0;
}

</style>
