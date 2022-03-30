import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity} from "react-native";
import Colors from "../config/colors";

const deviceWidth = Dimensions.get('window').width;

export const Shop = ({item}) => {
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

const styles = StyleSheet.create({
    shop: {
        minWidth: deviceWidth - 20,
        backgroundColor: Colors.defaultFontColor,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: (deviceWidth - 20) / 2,
        flexWrap: 'wrap',
        flexDirection: 'column',
        marginBottom: 10,
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
