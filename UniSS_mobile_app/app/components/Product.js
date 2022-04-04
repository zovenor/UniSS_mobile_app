import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity} from "react-native";
import Colors from "../config/colors";

const deviceWidth = Dimensions.get('window').width;

export const Product = (props) => {

    console.log(props);

    return (
        <TouchableOpacity style={styles.product} onPress={()=>{props.navigation.navigate('Product Info', {item: props.item})}}>
            <ImageBackground imageStyle={{
                opacity: .5,
                borderRadius: 50,
            }} style={styles.productBackground} resizeMode={'cover'}
                             source={require('../images/foodBackground.jpg')}>
                <Text style={styles.productText}>{props.item.name} - {props.item.price} {props.item.currency}</Text>
                <Text style={styles.productText}>{props.item.shopName}</Text>
                <Text style={styles.productCode}>{props.item.code}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    product: {
        minWidth: deviceWidth - 20,
        backgroundColor: Colors.defaultFontColor,
        borderRadius: 50,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: (deviceWidth -20 ) / 2,
    },
    productText: {
        fontSize: 20,
        color: Colors.defaultBackgroundColor,
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
