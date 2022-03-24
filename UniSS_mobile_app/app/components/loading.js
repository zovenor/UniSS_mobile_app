import {ImageBackground, SafeAreaView, StyleSheet} from "react-native";

export default function Loading(){
    return (
        <SafeAreaView style={styles.loadView}>
            <ImageBackground style={styles.loading} source={require('../gifs/loading.gif')} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loading: {
        width: 200,
        height: 200,
    },
    loadView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
