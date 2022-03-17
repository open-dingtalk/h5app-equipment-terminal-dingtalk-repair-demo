
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'

import 'echarts/lib/component/dataset'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'

import VabChart from 'vue-echarts'

import theme from './theme.json'
VabChart.registerTheme('vab-echarts-theme', theme)

export default VabChart

