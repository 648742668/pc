<template>
  <div class="dashboard-editor-container">

    <panel-group/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="myOrderLineData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :data="consumerLogData" title="前台访问情况"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :data="userLogData" title="用户访问情况"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart :data="myOrderCountLineData"/>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import GithubCorner from '@/components/GithubCorner'
  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/LineChart'
  import RaddarChart from './components/RaddarChart'
  import PieChart from './components/PieChart'
  import BarChart from './components/BarChart'
  import TransactionTable from './components/TransactionTable'
  import TodoList from './components/TodoList'
  import BoxCard from './components/BoxCard'

  const basePrefix="/dms-chart"

  export default {
    name: 'DashboardAdmin',
    components: {
      GithubCorner,
      PanelGroup,
      LineChart,
      RaddarChart,
      PieChart,
      BarChart,
      TransactionTable,
      TodoList,
      BoxCard
    },
    data() {
      return {
        myOrderLineData: {},userLogData:[],consumerLogData:[],myOrderCountLineData: {},
      }
    },
    created() {
      this.get(basePrefix+"/consumer-log",null,obj=>{
        this.consumerLogData = obj
      })
      this.get(basePrefix+"/user-log",null,obj=>{
        this.userLogData = obj
      })
      this.get(basePrefix+"/order-charts",null,obj=>{
        let date = [];
        let total = [];
        for (let i = 0; i < obj.length; i++) {
          date.push(obj[i].date)
          total.push(obj[i].total)
        }
        this.myOrderLineData = {date,total}
      })
        this.get(basePrefix+"/order-count-charts",null,obj=>{
          let date = [];
          let count = [];
          for (let i = 0; i < obj.length; i++) {
            date.push(obj[i].date)
            count.push(obj[i].count)
          }
          this.myOrderCountLineData = {date,count}
        })

    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
