<template>
  <div class="home">
    <div class="bannerList">
      <div class="banner-item bg1">
        <div class="icon">
          <img class="icon1" src="@/assets/images/home/icon1.png" alt="">
        </div>
        <div class="banner-text">
          <h5>危险源总数</h5>
          <p>{{this.form.dangerNum}}</p>
        </div>
      </div>
      <div class="banner-item bg2">
         <div class="icon">
          <img class="icon2" src="@/assets/images/home/icon2.png" alt="">
        </div>
        <div class="banner-text">
          <h5>隐患总数</h5>
          <p>{{this.form.latentDangerNum}}</p>
        </div>
      </div>
      <div class="banner-item bg3">
         <div class="icon">
          <img class="icon3" src="@/assets/images/home/icon3.png" alt="">
        </div>
        <div class="banner-text">
          <h5>检查房间总数</h5>
          <p>{{this.form.inspectRoomNum}}</p>
        </div>
      </div>
      <div class="banner-item bg4">
         <div class="icon">
          <img class="icon4" src="@/assets/images/home/icon4.png" alt="">
        </div>
        <div class="banner-text">
          <h5>整改总数</h5>
          <p>{{this.form.recRoomNum}}</p>
        </div>
      </div>
    </div>
    <div class="chart-list">
      <div class="chart-item">
        <chart :autoresize="true" theme="vab-echarts-theme" :options="option1" />
      </div>
      <div class="chart-item">
        <chart :autoresize="true" theme="vab-echarts-theme" :options="option2" />
      </div>
      <div class="chart-item">
        <chart :autoresize="true" theme="vab-echarts-theme" :options="option3" />
      </div>
      <div class="chart-item">
        <chart :autoresize="true" theme="vab-echarts-theme" :options="option4" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/plugins/chart'

export default {
  components: {
    Chart
  },
  data() {
    return {
      form: {},
      option1: {
        title: {
          text: '院校隐患情况',
          textStyle: {
            fontSize:  18
          },
          left: 'center',
          top: 10
        },
        legend: {
          bottom: 6
        },
        grid: {
          left: 40,
          right: 40
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '检查房间数', '隐患总数', '整改房间数']
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
        ]
      },
      option2: {
        title: {
          text: '任务状态',
          left: 'center',
          top: 10
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        legend: {
            bottom: '10px',
            data: []
        },
        series: [
            {
              type: 'pie',
              radius: '55%',
              data: [],
              top: "2%",
              emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
        ]
      },
      option3: {
        title: {
          text: '任务类型',
          left: 'center',
          top: 10
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 10,
            data: []
        },
        series: [
            {
              type: 'pie',
              radius: '55%',
              data: [],
              emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
        ]
      },
      option4: {
        title: {
          text: '院校任务',
          left: 'center',
          top: 10
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          data: []
        },
        series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '32',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data: []
            }
        ]
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get('/stat/index',{}).then(res => {
        if ( res.status == '1' ) {
          console.log(res);
          let { dangerNum,latentDangerNum,recRoomNum,inspectRoomNum,indexCollegeStatList,taskStateStatList,taskTypeStatList,collegeTaskStatList } = res.obj;
          this.form = { dangerNum,latentDangerNum,recRoomNum,inspectRoomNum };
          indexCollegeStatList.forEach(ele => {
            let arr = [];
            arr.push(ele.label,ele.inspectRoomNum,ele.latentDangerNum,ele.recRoomNum)
            this.option1.dataset.source.push(arr);
          })
          taskStateStatList.forEach(ele => {
            this.option2.legend.data.push(ele.label);
            this.option2.series[0].data.push({
              value: ele.num,
              name: ele.label
            })
          })
          taskTypeStatList.forEach(ele => {
            this.option3.legend.data.push(ele.label);
            this.option3.series[0].data.push({
              value: ele.num,
              name: ele.label
            })
          })
          collegeTaskStatList.forEach(ele => {
            this.option4.legend.data.push(ele.label);
            this.option4.series[0].data.push({
              value: ele.num,
              name: ele.label
            })
          })
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;
  .bannerList {
    padding: 12px;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
  .banner-item {
    width: 24%;
    margin-right: 20px;
    height: 90px;
    display: flex;
    align-items: center;
    padding-left: 40px;
    &:last-child {
      margin-right: 0px;
    }
  }
  .bg1 {
    background: url('../assets/images/home/banner1.png') center / 100% 100% no-repeat;
  }
  .bg2 {
    background: url('../assets/images/home/banner2.png') center / 100% 100% no-repeat;

  }
  .bg3 {
    background: url('../assets/images/home/banner3.png') center / 100% 100% no-repeat;
  }
  .bg4 {
    background: url('../assets/images/home/banner4.png') center / 100% 100% no-repeat;
  }
  .icon {
    width: 62px;
    height: 62px;
    background-color: rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .icon1 {
    width: 39px;
    height: 35px;
  }
  .icon2 {
    width: 46px;
    height: 39px;
  }
  .icon3 {
    width: 27px;
    height: 38px;
  }
  .icon4 {
    width: 37px;
    height: 38px;
  }
  .banner-text {
    color: #fff;
    padding-left: 20px;
    h5,p {
      line-height: 1.6;
    }
    p {
      font-size: 22px;
    }
  }
  .chart-list {
    margin-top: 12px;
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .chart-item {
      width: 49.5%;
      height: 100%;
      background-color: #fff;
      margin-bottom: 12px;
      &:nth-child(2n) {
        margin-right: 0px;
      }
      ::v-deep.echarts {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>