import {Dimensions, SafeAreaView, StyleSheet, Text} from "react-native";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import Colors from "../config/colors";

const deviceWidth = Dimensions.get('window').width;

export const ProductInfo = (props) => {

    const item = props.route.params.item;

    props.navigation.setOptions({title: item.name});

    return (
        <SafeAreaView style={styles.body}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price} {item.currency}</Text>
            <Barcode
                style={styles.code}
                value={item.code.toString()}
                format={'CODE128'}
                background={'rgba(0,0,0,0)'}
                maxWidth={deviceWidth}
                width={2.5}
                height={150}
                text={item.code.toString()}
                lineColor={Colors.defaultFontColor}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontSize: 30,
        color: Colors.defaultFontColor
    },
    price: {
        fontSize: 20,
        color: Colors.defaultFontColor
    },
});
