import { atom,selector  } from 'recoil';

export const newsState = atom({
  key: 'newsState',
  default: [],
});

export const menusState = atom({
    key: 'menusState',
    default: [],
  });


  export const CategoryState = atom({
    key: 'CategoryState',
    default: [],
  });

export const accState = atom({
      key: 'AccState',
      default: {},
  });

  export const FriendsState = atom({
    key: 'FriendsState',
    default: [],
});


export const ProductLikeState = atom({
  key: 'ProductLikeState',
  default: [],
});


export const TrademarkState = atom({
  key: 'TrademarkState',
  default: [],
});


export const socketState = atom({
  key: 'socketState',
  default: null, // Khởi tạo giá trị mặc định là null
});


export const ListUpDateCartState = atom({
  key: 'ListUpDateCartState',
  default:[]
});


export const ItemsCartState = atom({
  key: 'ItemsCartState',
  default:[]
});


export const ProductsChekOut = atom({
  key: 'ProductsChekOut',
  default:{}
});









