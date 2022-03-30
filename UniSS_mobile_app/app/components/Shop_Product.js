import {Shop} from "./Shop";
import {Product} from "./Product";

export const Item = ({item}) => {
    if (item.type === 'product') {
        return (
            <Product item={item}/>
        )
    }
    else if(item.type === 'shop'){
        return (
            <Shop item={item}/>
        )
    }
}
