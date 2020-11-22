import React from "react";
import {FlatList, Text} from "react-native";
import {Row, Separator} from "../Components/Row";
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import Users from '../Model/Users';


export default class CarList extends React.Component {
    state = {
        products: {},
    };
    componentDidMount() {
        firebase
            .database()
            .ref('/Products')
            .on('value', snapshot => {
                this.setState({ products: snapshot.val() });
            });
    }
    render() {
        const {products} = this.state;
        const productsArray = Object.values(products);
        if (!products) {
            return (
                <Text>Ingen produkter tilgængelige</Text>
            )
        } else {
            return (
                <FlatList
                    data={Users}
                    keyExtractor={item => {
                        return `${item.id.value}-${item.phone}`;
                    }}
                    renderItem={({item}) => {
                        const name = `${item.name.first} ${item.name.last}`;

                        return (
                            <Row
                                image={{uri: item.picture.thumbnail}}
                                title={name}
                                subtitle={item.email}
                                onPress={() => alert("todo!")}
                            />
                        );
                    }}
                    ItemSeparatorComponent={Separator}
                    ListHeaderComponent={() => <Separator/>}
                    ListFooterComponent={() => <Separator/>}
                    contentContainerStyle={{paddingVertical: 20}}
                />
            );
        }
    }
}