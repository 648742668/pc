<template>
    <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  require('echarts/theme/macarons') // echarts theme

  const animationDuration = 6000

  export default {
    mixins: [resize],
    props: {
      data: {
        type: Object,
        required: true
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
      setOptions({ date, count } = {}) {
        this.chart.setOption({
          title: {
            text: '每日订单数',
            top:0,
            right:0,
            textStyle:{
              color:"#7b7979"
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: date,
            axisTick: {
              alignWithLabel: true
            },
            interval:false,
        rotate:45
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: 'pageA',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: count,
            animationDuration
          }]
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.data)

      }
    },
    watch: {
      data: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },

  }
</script>
