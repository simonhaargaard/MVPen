import React from "react";
import { Buttons } from "../Components/Buttons";
import {View, Text, Button, TouchableOpacity, ScrollView, StyleSheet, FlatList} from 'react-native';
import {AuthContext} from "../Components/Context";
import {TextField} from "../Components/Form";
import Tilføj from "../Model/TilføjProdukter";

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export const Page2 = ({navigation}) => {
    return(
        <ScreenContainer>
            <Text>Her skal produktet vises</Text>
            <Button title="Skriv til sælger" onPress={() => alert("Todo")}/>
        </ScreenContainer>
    )
}
export const Settings = ({navigation}) => {
    const {logud} = React.useContext(AuthContext);
    return(
        <ScreenContainer>
            <Text>Her skal man kunne se sine egne produkter man har til salg</Text>
            <Button title="Tilføj produkt" onPress={() => alert("Todo")}/>
            <Button title="Sign out" onPress={() => logud()}/>
        </ScreenContainer>
    )
}
export const CreateAccount = ({navigation}) => {
    const {signUp} = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
        <ScrollView
            contentContainerStyle={{ paddingVertical: 20 }}
            style={{ backgroundColor: "#fff" }}>
            <TextField
                label="Email"
                onChangeText={email => setEmail(email)}
            />
            <TextField
                label="Password"
                secureTextEntry
                onChangeText={password => setPassword(password)}
            />
            <Buttons text="Submit" onPress={() => signUp(email, password)} />
            <View style={styles.textBlock}>
                <Text style={styles.text}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.push("Login")}>
                    <Text style={[styles.text, styles.link]}>Sign in!</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
export const LogInd = () => {
    const {signIn} = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
        <ScrollView
            contentContainerStyle={{ paddingVertical: 20 }}
            style={{ backgroundColor: "#fff" }}>
            <TextField
                label="Email"
                onChangeText={email => setEmail(email)}
            />
            <TextField
                label="Password"
                secureTextEntry
                onChangeText={password => setPassword(password)}
            />
            <Buttons text="Login" onPress={() => signIn(email, password)} />
        </ScrollView>
    );
}
export const Splash = () => (
    <ScreenContainer>
        <Text>Loading...</Text>
    </ScreenContainer>
);
const styles = StyleSheet.create({
    textBlock: {
        marginTop: 20
    },
    text: {
        fontSize: 18,
        color: "#969696",
        textAlign: "center",
        marginBottom: 2
    },
    link: {
        textDecorationLine: "underline"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});