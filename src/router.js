import Vue from 'vue'
import Router from 'vue-router'

// import Home from './views/Home.vue'
// import Found from './views/Found.vue'
// import Community from './views/Community.vue'
// import User from './views/User.vue'

// import Login from './views/Login.vue'
// import Search from './views/public/Search.vue'


// import Dub from './views/foundChild/Dub.vue'
// import AddTrends from './views/communityChild/AddTrends.vue'
// import AddFriends from './views/communityChild/AddFriends.vue'
// import AddSentence from './views/foundChild/AddSentence.vue'
// import Article from './views/foundChild/Article.vue'
// import Video from './views/foundChild/Video.vue'
// import ArticleDetails from './views/foundChild/ArticleDetails.vue'
// import VideoPlay from './views/foundChild/VideoPlay.vue'
// import DubDetails from './views/foundChild/DubDetails.vue'

// import DubPlay from './views/foundChild/DubPlay.vue'

// import Sort from './views/foundChild/Sort.vue'
// import Map from './views/foundChild/Map.vue'
// import ChangeMessage from './views/userChild/ChangeMessage.vue'
// import FeedBack from './views/userChild/FeedBack.vue'
// import UserPage from './views/userChild/UserPage.vue'




const Home = () =>
    import ('./views/Home.vue')
const Found = () =>
    import ('./views/Found.vue')
const Community = () =>
    import ('./views/Community.vue')
const User = () =>
    import ('./views/User.vue')

const Login = () =>
    import ('./views/Login.vue')
const Search = () =>
    import ('./views/public/Search.vue')
const Dub = () =>
    import ('./views/foundChild/Dub.vue')
const Course = () =>
    import ('./views/foundChild/Course.vue')
const AddTrends = () =>
    import ('./views/communityChild/AddTrends.vue')
const AddFriends = () =>
    import ('./views/communityChild/AddFriends.vue')
const AddSentence = () =>
    import ('./views/foundChild/AddSentence.vue')
const Article = () =>
    import ('./views/foundChild/Article.vue')
const Video = () =>
    import ('./views/foundChild/Video.vue')
const ArticleDetails = () =>
    import ('./views/foundChild/ArticleDetails.vue')
const VideoPlay = () =>
    import ('./views/foundChild/VideoPlay.vue')
const DubDetails = () =>
    import ('./views/foundChild/DubDetails.vue')

const DubPlay = () =>
    import ('./views/foundChild/DubPlay.vue')

const Sort = () =>
    import ('./views/foundChild/Sort.vue')
const Map = () =>
    import ('./views/foundChild/Map.vue')
const ChangeMessage = () =>
    import ('./views/userChild/ChangeMessage.vue')
const FeedBack = () =>
    import ('./views/userChild/FeedBack.vue')
const UserPage = () =>
    import ('./views/userChild/UserPage.vue')
const MyCourse = () =>
    import ('./views/userChild/MyCourse.vue')
const MyDynamic = () =>
    import ('./views/userChild/MyDynamic.vue')

const CreateCourse = () =>
    import ('./views/userChild/CreateCourse.vue')

const CourseDetails = () =>
    import ('./views/foundChild/CourseDetails.vue')
const MyCollect = () =>
    import ('./views/userChild/MyCollect.vue')
const Draft = () =>
    import ('./views/userChild/Draft.vue')
const UserPlan = () =>
    import ('./views/userChild/UserPlan.vue')


Vue.use(Router)

export default new Router({
    routes: [
        //首页推荐
        {
            path: '*',
            redirect: '/home'
        }, {
            path: '/home',
            name: 'home',
            component: Home
        },
        //发现
        {
            path: '/found',
            name: 'found',
            component: Found,

        },
        //社区
        {
            path: '/community',
            name: 'community',
            component: Community
        },
        //我的
        {
            path: '/user',
            name: 'user',
            component: User
        }, {
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            path: '/dub',
            name: 'dub',
            component: Dub
        },
        {
            path: '/addtrends',
            name: 'addtrends',
            component: AddTrends
        }, {
            path: '/addfriends',
            name: 'addfriends',
            component: AddFriends
        }, {
            path: '/addsentence',
            name: 'addsentence',
            component: AddSentence
        }, {
            path: '/article',
            name: 'article',
            component: Article
        }, {
            path: '/video',
            name: 'video',
            component: Video
        }, {
            path: '/course',
            name: 'course',
            component: Course
        }, {
            path: '/articledetails/:id',
            name: 'articledetails',
            component: ArticleDetails
        }, {
            path: '/videoplay/:id',
            name: 'videoplay',
            component: VideoPlay
        }, {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/dubdetails/:id',
            name: 'dubdetails',
            component: DubDetails
        }, {
            path: '/dubplay/:id',
            name: 'dubplay',
            component: DubPlay
        }, {
            path: '/sort',
            name: 'sort',
            component: Sort
        },
        {
            path: '/map',
            name: 'map',
            component: Map
        },
        {
            path: '/changemessage',
            name: 'changemessage',
            component: ChangeMessage
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: FeedBack
        },

        {
            path: '/mycourse',
            name: 'mycourse',
            component: MyCourse
        },
        {
            path: '/createcourse',
            name: 'createcourse',
            component: CreateCourse
        },
        {
            path: '/coursedetails/:id',
            name: 'coursedetails',
            component: CourseDetails
        }, {
            path: '/userpage/:id',
            name: 'userpage',
            component: UserPage
        }, {
            path: '/mydynamic',
            name: 'mydynamic',
            component: MyDynamic
        },
        {
            path: '/mycollect',
            name: 'mycollect',
            component: MyCollect
        },
        {
            path: '/draft',
            name: 'draft',
            component: Draft
        },
        {
            path: '/userplan',
            name: 'userplan',
            component: UserPlan
        }
    ]
})