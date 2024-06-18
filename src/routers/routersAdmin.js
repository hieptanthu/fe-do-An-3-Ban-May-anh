import Main from "../pages/Admin/Main"
import Product from "../pages/Admin/Product"
import { Trademark ,TrendingItem,Oder,ProductSpecifications,SettingPage,User,Blog} from "../pages/Admin"

const Url="/Admin"
const routersAdmin =[

    {
        parth:Url,
        element:<Main/>,
        state:"Main"
    },
    {
        parth:Url+"/Product",
        element:<Product/>,
        state:"Product"
    },
    {
        parth:Url+"/Trademark",
        element:<Trademark/>,
        state:"Trademark"
    },
    {
        parth:Url+"/TrendingItem",
        element:<TrendingItem/>,
        state:"TrendingItem"
    },{
        parth:Url+"/Oder",
        element:<Oder/>,
        state:"Oder"
    },
    {
        parth:Url+"/ProductSpecifications/:productId",
        element:<ProductSpecifications/>,
        state:"ProductSpecifications"
    }
    ,
    {
        parth:Url+"/SettingPage/",
        element:<SettingPage/>,
        state:"SettingPage"
    }
    ,
    {
        parth:Url+"/User/",
        element:<User/>,
        state:"User"
    }
    ,
    {
        parth:Url+"/Blog/",
        element:<Blog/>,
        state:"Blog"
    }

    

    


    


    


    




    
]





export default routersAdmin