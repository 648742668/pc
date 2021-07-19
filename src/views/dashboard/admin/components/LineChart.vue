<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  require('echarts/theme/macarons') // echarts theme

  export default {
  mixins: [resize],
  props: {
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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ date, total } = {}) {
      this.chart.setOption({
        title: {
          text: '每日订单总价格',
          top:0,
          right:0,
          textStyle:{
            color:"#7b7979"
          }
        },
        xAxis: {
          data: date,
          axisLabel: {
            textStyle: {
              color: '#784e4e'
            },
            interval:false,
            rotate:45
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['total']
        },
        series: [{
          name: '订单总价值', itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#f17575'}
              ]
            )
          },
          smooth: true,
          type: 'bar',
          data: total,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },]
      })
    }
  }
}
</script>
