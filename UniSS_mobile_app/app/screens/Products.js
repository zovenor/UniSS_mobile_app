import {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList, View} from "react-native";
import RequestData from '../config/requests';


const Item = ({item}) => {
    return (
        <TouchableOpacity style={styles.product}>
            <Text style={styles.productText}>{item.name} - {item.price} {item.currency}</Text>
        </TouchableOpacity>
    )
}

export default function Products({navigation}) {
    const [products, set_products] = useState(null);

    async function get_products() {
        const ngrok_url = 'https://b19e-2a02-bf0-141f-1cbe-d818-6345-9c81-7e6.ngrok.io';
        const url = RequestData.url + '/api/v1/products/';
        const app_token = RequestData.app_token;
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'App-Token': app_token,
            }
        }
        let response = await fetch(url, data);
        if (response.ok) {
            let json = await response.json();
            set_products(json.products);
        }
    }

    useEffect(get_products);

    return (
        <SafeAreaView style={styles.body}>
            <FlatList
                contentContainerStyle={styles.list}
                data={products}
                renderItem={Item}

            />
        </SafeAreaView>
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
    product: {
        margin: 10,
        padding: 20,
        width: 300,
        backgroundColor: '#999',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productText: {
        fontSize: 20,
        color: '#fff',
    },
    list: {
        marginTop: 20,
        flexGrow: 1,
        alignItems: 'center',
    },
})
