import {Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = (setIsAuth) => {
    Alert.alert('Logout', 'Do you want to log out?', [
        {
            text: 'No',
        },
        {
            text: 'Yes',
            onPress: () => {
                AsyncStorage.setItem('Auth-Token', '');
                setIsAuth(false);
            }
        }
    ]);
}
