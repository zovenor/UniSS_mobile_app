import {SafeAreaView, Text} from "react-native";

export const ProductInfo = (props) => {

    console.log(props);

    const item = props.route.params.item;

    props.navigation.setOptions({title: item.name});

    return (
        <SafeAreaView>
            <Text>{item.name}</Text>
        </SafeAreaView>
    )
}
