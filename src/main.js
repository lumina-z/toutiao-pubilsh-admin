import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//引入element组件
import ElementPlus from 'element-plus';
//引入element组件样式
import 'element-plus/lib/theme-chalk/index.css';

//加载全局样式文件
//import './styles/index.less'

createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
//$munt('#app')  ==  el: '#app'
