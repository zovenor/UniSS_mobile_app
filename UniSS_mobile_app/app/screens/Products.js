import {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList, View} from "react-native";
import RequestData from '../config/requests';
import Loading from '../components/loading';


const Item = ({item}) => {
    return (
        <TouchableOpacity style={styles.product}>
            <Text style={styles.productText}>{item.name} - {item.price} {item.currency}</Text>
        </TouchableOpacity>
    )
}

export default function Products({navigation}) {
    const [products, setProducts] = useState(null);
    const [loaded, setLoaded] = useState(false);

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
        await fetch(url, data).then(response => response.json()).then(responseJSON => {
            setProducts(responseJSON.products);
            setLoaded(true);
        });
    }

    useEffect(get_products);

    if (loaded) {
        return (
            <SafeAreaView style={styles.body}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={products}
                    renderItem={Item}

                />
            </SafeAreaView>
        )
    } else {
        return <Loading></Loading>;
    }
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
