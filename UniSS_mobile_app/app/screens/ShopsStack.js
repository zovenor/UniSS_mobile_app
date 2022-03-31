import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Shops from "./Shops";
import Search from "./Search";

const Stack = createNativeStackNavigator();

export default function ShopsStack(props){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Shops" initialParams={props.route.params} component={Shops}/>
            <Stack.Screen name="Search" initialParams={{type: 'shops'}} component={Search}/>
        </Stack.Navigator>
    )
}
