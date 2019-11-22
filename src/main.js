import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import FastClick from 'fastclick';
FastClick.attach(document.body); // 使用 fastclick解决移动端300ms点击延迟
// import 'url-search-params-polyfill';
import axios from 'axios' //引入axios 请求后端api
Vue.prototype.axios = axios //原型链
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://120.78.75.14/'

import { Checkbox, CheckboxGroup, IndexBar, IndexAnchor, SwipeCell, Tab, Tabs, NavBar, Row, Col, Area, Tabbar, PullRefresh, TabbarItem, Search, Field, ActionSheet, Swipe, SwipeItem, Divider, ImagePreview, Cell, Picker, Popup, Button, CellGroup, Toast, Tag, Uploader, Dialog, Grid, GridItem, Image } from "vant";
Vue.use(IndexBar).use(IndexAnchor).use(SwipeCell).use(Tab).use(Checkbox).use(CheckboxGroup)
    .use(Tabs)
    .use(NavBar)
    .use(Row)
    .use(Col)
    .use(Tabbar)
    .use(TabbarItem).use(Search).use(Swipe).use(PullRefresh).use(SwipeItem).use(Area).use(ActionSheet).use(ImagePreview).use(Field).use(Cell).use(Popup).use(Divider).use(Button).use(Picker).use(CellGroup).use(Toast).use(Tag).use(Uploader).use(Grid).use(Dialog).use(GridItem).use(Image);



new Vue({
    router,
    render: h => h(App)
}).$mount('#app')