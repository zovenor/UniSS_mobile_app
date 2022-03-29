import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity} from "react-native";
import Colors from "../config/colors";

const deviceWidth = Dimensions.get('window').width;

export const Product = ({item}) => {
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
})
