import Error404 from "../components/error/Error404"
import Main from "../pages/Main"
import ProductLike from "../pages/ProductLike"
import {Products }from "../pages/"
const routers =[

    {
        parth:"/404",
        element:<Error404/>,
        state:"404"
    },
    {
        parth:"index",
        element:<Main/>,
        state:""
    },
    {
        parth:"/like/",
        element:<ProductLike/>,
        state:"post"
    },
    {
        parth:"/Products/",
        element:<Products/>,
        state:"Products"
    },
    {
        parth:"/Posts/",
        element:"",
        state:"Posts"
    }
]

export default routers


