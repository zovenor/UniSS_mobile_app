import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Button, Dimensions, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import RequestData from "../config/requests";
import Loading from "../components/loading";

const deviceWidth = Dimensions.get('window').width;

export default function Scanner({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setLoaded(false);
        setScanned(true);
        getProductByCode(data);
    };

    const axios = require('axios').default;

    const getProductByCode = (code) => {
        const data = {
            url: RequestData.baseUrl + '/api/v1/get_product_by_code/',
            method: 'get',
            headers: {
                'App-Token': RequestData.app_token,
                code: code,
            }
        }

        const data2 = {
            url: RequestData.baseUrl + '/api/v1/get_shop_name/',
            method: 'get',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        axios(data).then(async (response)=>{
            let item = response.data.product;
            data2.headers.product = item.id;
            await axios(data2).then(response=>{
                item.shop_name = response.data.shop_name;
                setLoaded(true);
                navigation.navigate('Product Info', {item});
            }).catch((error)=>{
                console.log(error);
            });
        }).catch(error=>{
            Alert.alert('Scanner', 'Product not found!');
            setLoaded(true);
        })
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    if(loaded){
        return (
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.absoluteFillObject}
                />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
            </View>
        );
    }
    else{
        return (
            <Loading/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    absoluteFillObject: {
        flex: 1,
        width: deviceWidth,
    }
})
