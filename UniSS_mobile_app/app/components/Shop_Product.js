import {Shop} from "./Shop";
import {Product} from "./Product";

export const Item = ({item, navigation}) => {
    if (item.type === 'product') {
        return (
            <Product item={item} navigation={navigation}/>
        )
    }
    else if(item.type === 'shop'){
        return (
            <Shop item={item} navigation={navigation}/>
        )
    }
}
