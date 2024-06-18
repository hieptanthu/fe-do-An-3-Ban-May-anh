import Error404 from "../components/error/Error404"
import Main from "../pages/Main"
import ProductLike from "../pages/ProductLike"
import {Products ,Productdetails,CartShop,Checkout,Contact,Blog,BlogDetail}from "../pages/"
 
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
        parth:"/Productdetails/:_id",
        element:<Productdetails/>,
        state:"Productdetails"
    },
    {
        parth:"/CartShop/",
        element:<CartShop/>,
        state:"CartShop"
    }
    ,
    {
        parth:"/Checkout/",
        element:<Checkout/>,
        state:"Checkout"

        
    }
    ,
    {
        parth:"/Contact/",
        element:<Contact/>,
        state:"Contact"

    }
    ,
    {
        parth:"/Blog/",
        element:<Blog/>,
        state:"Blog"

    }
    ,
    {
        parth:"/BlogDetail/:_id",
        element:<BlogDetail/>,
        state:"BlogDetail"

    }

    
    

    
]





export default routers


