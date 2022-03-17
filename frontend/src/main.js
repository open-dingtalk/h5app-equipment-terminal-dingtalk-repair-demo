import Vue from 'vue'

import 'normalize.css/normalize.css' // 基本样式统一

import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css
import '@/assets/iconfont/iconfont.css';

import App from './App'
import store from './store'
import router from './router'

import './permission' // permission control
import request from './utils/request';

// import * as filters from './filters' // global filters
// 图片预览组件
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';

import {
  ColorPicker,
  Row,
  Col,
  Card,
  MessageBox,
  Button,
  Form,
  FormItem,
  Dialog,
  Select,
  Option,
  Message,
  Alert,
  Input,
  Radio,
  RadioGroup,
  Icon,
  Table,
  Tabs,
  TabPane,
  TableColumn,
  Pagination,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Autocomplete,
  Tree,
  DatePicker,
  TimePicker,
  Collapse,
  CollapseItem,
  Popover,
  Tag,
  Upload,
  Carousel,
  CarouselItem,
  Cascader,
  Link,
  Switch,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Scrollbar,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
  Image,
  Steps,
  Step,
  TimeSelect,
  Timeline,
  TimelineItem,
  Avatar
} from 'element-ui';

Vue.use(Button)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Menu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Scrollbar)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Submenu)
  .use(ColorPicker)
  .use(Switch)
  .use(Col)
  .use(Card)
  .use(Tabs)
  .use(TabPane)
  .use(Upload)
  .use(Dialog)
  .use(Row)
  .use(Form)
  .use(FormItem)
  .use(Select)
  .use(Option)
  .use(Alert)
  .use(Input)
  .use(Radio)
  .use(RadioGroup)
  .use(Icon)
  .use(Table)
  .use(TableColumn)
  .use(Pagination)
  .use(Checkbox)
  .use(CheckboxButton)
  .use(CheckboxGroup)
  .use(Autocomplete)
  .use(Tree)
  .use(DatePicker)
  .use(TimePicker)
  .use(Collapse)
  .use(CollapseItem)
  .use(Popover)
  .use(Tag)
  .use(Carousel)
  .use(CarouselItem)
  .use(Cascader)
  .use(Link)
  .use(Progress)
  .use(Image)
  .use(Steps)
  .use(Step)
  .use(TimeSelect)
  .use(Timeline)
  .use(TimelineItem)
  .use(Avatar)



Vue.component(ElImageViewer.name, ElImageViewer);
Vue.component(MessageBox.name, MessageBox);

import * as dd from "dingtalk-jsapi";

Vue.prototype.$dd = dd;

Vue.prototype.$ELEMENT = { size: 'small' }; // 设置全局 size
Vue.prototype.$http = request;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert

// // register global utility filters
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
