import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'view-design/dist/styles/iview.css'
import api from './utils/api'
import { Notice, Row, Col, Input, Button, Divider, List, Breadcrumb, BreadcrumbItem, Icon, Tag, Carousel, CarouselItem, Radio, RadioGroup, Drawer, Select, Option} from 'view-design'

Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.prototype.$Notice = Notice // 绑定错误提示
Vue.component('i-Row', Row)
Vue.component('i-Col', Col)
Vue.component('i-Input', Input)
Vue.component('i-Button', Button)
Vue.component('i-Divider', Divider)
Vue.component('i-List', List)
Vue.component('i-ListItem', List.Item)
Vue.component('i-ListItemMeta', List.Item.Meta)
Vue.component('i-Breadcrumb', Breadcrumb)
Vue.component('i-BreadcrumbItem', BreadcrumbItem)
Vue.component('i-Icon', Icon)
Vue.component('i-Tag', Tag)
Vue.component('i-Carousel', Carousel)
Vue.component('i-CarouselItem', CarouselItem)
Vue.component('i-Radio', Radio)
Vue.component('i-RadioGroup', RadioGroup)
Vue.component('i-Drawer', Drawer)
Vue.component('i-Select', Select)
Vue.component('i-Option', Option)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

