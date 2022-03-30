import {useState, useEffect} from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    RefreshControl,
    Dimensions,
    ImageBackground, LogBox,
} from "react-native";
import RequestData from '../config/requests';
import Loading from '../components/loading';
import Colors from "../config/colors";
import {default as axios} from "axios";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "./Settings";
import {Product} from "../components/Product";

const deviceWidth = Dimensions.get('window').width;

function Products({navigation}) {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const onRefresh = () => {
        get_products();
    }

    const axios = require('axios').default;

    const get_products = () => {
        const data = {
            method: 'get',
            url: RequestData.baseUrl + '/api/v1/products/',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        const data2 = {
            method: 'get',
            url: RequestData.baseUrl + '/api/v1/get_shop_name/',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        axios(data)
            .then(async (response) => {
                let products_request = response.data.products;
                for (let el in products_request) {
                    data2.headers.product = products_request[el].id;
                    await axios(data2).then(response => {
                        products_request[el].shopName=response.data.shop_name.toString()
                    }).catch(error => {
                        console.log(error);
                    });
                }
                setProducts(products_request)
                setLoaded(true);
            })
            .catch(error => {
                setLoaded(true);
                console.log(error);
            });
    }

    useEffect(()=>{
        get_products();
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, []);

    if (loaded) {
        return (
            <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh}/>}>
                <SafeAreaView style={styles.body}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={products}
                        renderItem={Product}
                        style={{
                            width: deviceWidth,
                        }}
                        conten
                    />
                </SafeAreaView>
            </ScrollView>
        )
    } else {
        return <Loading/>;
    }
}

const Stack = createNativeStackNavigator();

export default function ProductsStack(props){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Products" initialParams={props.route.params} component={Products}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    list: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
})
