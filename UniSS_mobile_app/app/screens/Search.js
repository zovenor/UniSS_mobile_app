import {
    Text,
    SafeAreaView,
    TextInput,
    StyleSheet,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ImageBackground
} from "react-native";
import {useEffect, useState} from "react";
import Colors from "../config/colors";
import RequestData from "../config/requests";
import {Product} from "../components/Product";
import {Shop} from "../components/Shop";
import {Item} from '../components/Shop_Product';
import {default as axios} from "axios";
import {Ionicons} from "@expo/vector-icons";
import Loading from "../components/loading";

const deviceWidth = Dimensions.get('window').width;

export default function Search(props) {

    const [items, setItems] = useState([]);
    const [text, setText] = useState('');
    const [loaded, setLoaded] = useState(false);
    const axios = require('axios').default;

    const searchItem = (text) => {

        const data = {
            url: RequestData.baseUrl + '/api/v1/products/?find=' + text,
            method: 'get',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        const data2 = {
            url: RequestData.baseUrl + '/api/v1/shops/?find=' + text,
            method: 'get',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        const dataShopNames = {
            url: RequestData.baseUrl + '/api/v1/get_shop_name/',
            method: 'get',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        let items_response = [];

        axios(data2).then(async (response) => {
            let shops_response = response.data.shops.slice(0, 10);
            for (let el in shops_response) {
                dataShopNames.headers.shop = shops_response[el].id;
                shops_response[el].type = 'shop';
                await axios(dataShopNames).then(response22 => {
                    shops_response[el].shopName = response22.data.shop_name;
                }).catch(error => {
                    console.log(error);
                });
            }
            items_response = [...items_response, ...shops_response];
            setItems(items_response);
        }).catch(error => {
            console.log(error);
        })

        axios(data).then(async (response) => {
            let products_response = response.data.products.slice(0, 10);
            for (let el in products_response) {
                dataShopNames.headers.product = products_response[el].id;
                products_response[el].type = 'product';
                await axios(dataShopNames).then(response12 => {
                    products_response[el].shopName = response12.data.shop_name;
                }).catch(error => {
                    console.log(error);
                });
            }
            setLoaded(true);
            items_response = [...items_response, ...products_response];
            setItems(items_response);
        }).catch(error => {
            console.log(error);
        })

    }

    useEffect( () => {
        searchItem(text);
    }, []);

    if(loaded){
        return (
            <SafeAreaView style={styles.body}>
                <View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.textInput} onChangeText={(textInput) => {
                            setText(textInput);
                        }} placeholder={"Search"}/>

                        <TouchableOpacity onPress={() => {
                            searchItem(text);
                        }} style={styles.button}>
                            <Ionicons name="search" color={Colors.defaultBackgroundColor} size={30}/>
                        </TouchableOpacity>

                    </View>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={items}
                        renderItem={Item}
                    />
                </View>
            </SafeAreaView>
        )
    }
    else{
        return <Loading/>
    }
}

const styles = StyleSheet.create({
    body: {},
    textInput: {
        fontSize: 30,
        color: Colors.defaultFontColor,
        flex: 1,
    },
    inputView: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        borderColor: Colors.defaultFontColorLight,
        paddingLeft: 30,
        paddingRight: 30,
        width: deviceWidth - 40,
        height: 70,
        zIndex: 100,
        position: 'absolute',
        backgroundColor: Colors.defaultBackgroundColor,
        flexDirection: 'row',
        alignItems: "center",
        margin: 10,
        marginLeft: 20,
    },
    list: {
        padding: 10,
        paddingTop: 70 + 20,
        paddingBottom: 0,
        flexDirection: "column",
        minHeight: '100%',
    },
    button: {
        backgroundColor: Colors.appColor,
        borderRadius: 50,
        padding: 10,
    }
})
