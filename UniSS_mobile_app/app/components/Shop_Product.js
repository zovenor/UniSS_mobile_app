import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity} from "react-native";
import Colors from "../config/colors";

const deviceWidth = Dimensions.get('window').width;

export const Item = ({item}) => {
    if (item.type === 'product') {
        return (
            <TouchableOpacity style={styles.product}>
                <ImageBackground imageStyle={{
                    opacity: .5,
                    borderRadius: 50,
                }} style={styles.productBackground} resizeMode={'cover'}
                                 source={require('../images/foodBackground.jpg')}>
                    <Text style={styles.productText}>{item.name} - {item.price} {item.currency}</Text>
                    <Text style={styles.productText}>{item.shopName}</Text>
                    <Text style={styles.productCode}>{item.code}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
    else if(item.type === 'shop'){
        return (
            <TouchableOpacity style={styles.shop}>
                <ImageBackground imageStyle={{
                    opacity: .5,
                    borderRadius: 50,
                }} style={styles.shopBackground} resizeMode={'cover'}
                                 source={require('../images/shopBakground.jpg')}>
                    <Text style={styles.shopText}>{item.shopName}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    product: {
        minWidth: (deviceWidth) - 20,
        backgroundColor: Colors.defaultFontColor,
        borderRadius: 50,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: (deviceWidth / 2) - 20,
    },
    productText: {
        fontSize: 20,
        color: Colors.defaultBackgroundColor,
    },
    list: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
    },
    productCode: {
        color: Colors.defaultBackgroundColor,
        position: 'absolute',
        bottom: 10,
    },
    productBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shop: {
        margin: 10,
        marginBottom: 0,
        minWidth: (deviceWidth) - 40,
        backgroundColor: Colors.defaultFontColor,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: (deviceWidth / 2) - 20,
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    shopText: {
        fontSize: 20,
        display: 'flex',
        color: Colors.defaultBackgroundColor,
    },
    shopBackground: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
})
