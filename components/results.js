import React from 'react';
import { FlatList, Text } from 'react-native';

const Results = ({ navigation, route }) => {
    return (
        <Text>
            {route.params.name} scored: {route.params.score}
        </Text>
        //- A list of the 10 best results and the name of the player.
        //- A button redirecting to start a new game.
    );
};

export default Results