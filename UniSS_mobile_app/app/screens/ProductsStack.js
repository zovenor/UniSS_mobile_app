import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Products from "./Products";

const Stack = createNativeStackNavigator();

export default function ProductsStack(props){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Products" initialParams={props.route.params} component={Products}/>
        </Stack.Navigator>
    )
}
