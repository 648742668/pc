<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  require('echarts/theme/macarons') // echarts theme

  export default {
  mixins: [resize],
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  props: {
    data:{
      type:Array,
      default:()=>{return []}
    },
    title:{
      type: String,
      default: 'chart'
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions(){
      let k = []
      for (let i of this.data){
        k.push(i.name)
      }
      this.chart.setOption({
        title: {
          text: this.title,
          top:0,
          right:0,
          textStyle:{
            color:"#7b7979"
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: k
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.data,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions()
    }
  }
}
</script>
