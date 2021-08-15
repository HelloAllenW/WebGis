import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    routes:[
        {
            path: '/',
            redirect: '/index'
        },
        {
            path:'/index',
            name:'index',
            component: ()=>import('../index.vue')
        },
        {
            path:'/OtherMap',
            name:'OtherMap',
            component: ()=>import('@/components/OtherMap.vue')
        },
        {
            path:'/BaiduMap',
            name:'BaiduMap',
            component: ()=>import('@/components/BaiduMap.vue')
        },
        {
            path:'/SplitScreenMap',
            name:'SplitScreenMap',
            component: ()=>import('@/components/SplitScreenMap.vue')
        },
        {
            path:'/EchartsInMap',
            name:'EchartsInMap',
            component: ()=>import('@/components/EchartsInMap.vue')
        }
    ]
})
export default router