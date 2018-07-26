import Vue from 'vue'
import Router from 'vue-router'
import Loading from '@/components/Loading'
import Callback from '@/components/Callback'
import Login from '@/components/Login'
import Register from '@/components/Register'
import SportsData from '@/components/SportsData'
import DataDetails from '@/components/DataDetails'
import DymList from '@/components/DymList'
import DymDetails from '@/components/DymDetails'
import ClassDetails from '@/components/ClassDetails'
import GymClassDetails from '@/components/GymClassDetails'
import ClassList from '@/components/ClassList'
import OrderList from '@/components/OrderList'
import AffirmOrder from '@/components/AffirmOrder'


import MemberLogin from '@/components/MemberLogin'
import MemberList from '@/components/MemberList'
import MemberAdd from '@/components/MemberAdd'
import MemberEdit from '@/components/MemberEdit'
import MemberDetails from '@/components/MemberDetails'

import ReportForm from '@/components/ReportForm'
import ReportCourseDetail from '@/components/ReportCourseDetail'
import ReportCount from '@/components/ReportCount'


import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

// Vue.use(Router)

const router = new Router({
	mode: 'history',
  routes: [
    { path: '*',
    	component: NotFoundComponent
    },

    {
      path: '/',
      name: 'Loading',
      component: Loading
    },

    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/sportsData',
      name: 'sportsData',
      component: SportsData
    },
    {
      path: '/dataDetails',
      name: 'dataDetails',
      component: DataDetails
    },
    {
      path: '/dymList',
      name: 'dymList',
      component: DymList
    },
    {
      path: '/dymDetails',
      name: 'dymDetails',
      component: DymDetails
    },
    {
      path: '/classList',
      name: 'classList',
      component: ClassList
    },
    {
      path: '/classDetails',
      name: 'classDetails',
      component: ClassDetails
    },
    {
      path: '/gymClassDetails',
      name: 'gymClassDetails',
      component: GymClassDetails
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: OrderList
    },
    {
      path: '/affirmOrder',
      name: 'affirmOrder',
      component: AffirmOrder
    },

    {
        path: '/memberLogin',
        name: 'memberLogin',
        component: MemberLogin,
        meta: {
            title: '员工登录'
        }
    },
    {
        path: '/memberList',
        name: 'memberList',
        component: MemberList,
      	meta: {
            title: '添加列表'
        }
    },
    {
      path: '/memberAdd',
      name: 'memberAdd',
      component: MemberAdd,
      meta: {
            title: '添加会员'
        }
    },
    {
      path: '/memberEdit',
      name: 'memberEdit',
      component: MemberEdit,
      meta: {
            title: '会员编辑'
        }
    },
    {
      path: '/memberDetails',
      name: 'memberDetails',
      component: MemberDetails,
      meta: {
            title: '会员查看'
        }
    },
    {
      path: '/reportForm',
      name: 'ReportForm',
      component: ReportForm,
      meta: {
            title: '报表'
        }
    },
    {
      path: '/reportCourseDetail',
      name: 'ReportCourseDetail',
      component: ReportCourseDetail,
      meta: {
            title: '课程报表'
        }
    },
    {
      path: '/reportCount',
      name: 'ReportCount',
      component: ReportCount,
      meta: {
            title: '营收统计'
        }
    },
  ]
})
router.beforeEach((to, from, next) => {
if (to.meta.title) {
    document.title = to.meta.title;
}
 if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
 if (sessionStorage.getItem('userId')) {// 判断是否登录
// 	if (sessionStorage.getItem('isAdmin') == false){
 		next({
		  	path: '/home',
		})
// 	}else{
// 		next({
//		  	path: '/index',
//		})
// 	}
 } else {// 没登录则跳转到登录界面
  next({
  path: '/login',
//query: {redirect: to.fullPath}
  })
 }
 } else {
 next()
 }
})

export default router
