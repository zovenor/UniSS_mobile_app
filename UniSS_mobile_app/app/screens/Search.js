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

const deviceWidth = Dimensions.get('window').width;

export default function Search(props) {

    const [products, setProducts] = useState([]);
    const [shops, setShops] = useState([]);
    const [item, setItem] = useState([])
    const axios = require('axios').default;

    const searchItem = (text) => {

        const data = {
            url: RequestData.baseUrl + '/api/v1/products/?find=' + text,
            method: 'get',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        const data12 = {
            url: RequestData.baseUrl + '/api/v1/shops/?find=' + text,
            method: 'get',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        let items_response = [];

        axios(data).then(async (response) => {
            console.log(items_response);
            let products_response = response.data.products.slice(0,10);
            for(let el in products_response){
                axios(data12).then(response=>{

                }).catch(error=>{
                    console.log(error);
                });
            }
            items_response = [...items_response, ...products_response];
            console.log(items_response);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        searchItem('');
    }, []);

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} onChangeText={(text) => {
                    searchItem(text);
                }} placeholder={"Search"}></TextInput>
            </View>

            <View>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={products}
                    renderItem={Item}
                    style={{
                        width: deviceWidth,
                    }}
                    conten
                />
            </View>

            {/*<View>*/}
            {/*    <FlatList*/}
            {/*        contentContainerStyle={styles.list}*/}
            {/*        data={shops}*/}
            {/*        renderItem={Shop}*/}
            {/*        style={{*/}
            {/*            width: deviceWidth,*/}
            {/*        }}*/}
            {/*        conten*/}
            {/*    />*/}
            {/*</View>*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {},
    textInput: {
        fontSize: 30,
        color: Colors.defaultFontColor,
        width: deviceWidth - 20,
    },
    inputView: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 50,
        borderColor: Colors.defaultFontColorLight,
        paddingLeft: 50,
        paddingRight: 50,
        borderStyle: "dashed",
        width: deviceWidth - 20,
        margin: 10,
    },
})
