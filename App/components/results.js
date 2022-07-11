import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { initializePlay, setIsOn } from '../state-management/reducers/gameReducer';
import { selectTop10Scores } from '../state-management/reducers/scoreReducer';

const Results = ({ navigation, route }) => {

    const top10Scores = useSelector(selectTop10Scores)

    const dispatch = useDispatch()

    function newGameHandle() {
        dispatch(setIsOn(false));
        navigation.navigate('Home', { name: '', score: '' });
    }

    return (
        <View style={{
            backgroundColor: 'lightgrey',
            height: '100%',
            alignItems: 'center'
        }}>
            <Text style={{ fontSize: 20, color: 'black' }}>
                Great Job {route.params.name}! you have scored: {route.params.score}!
            </Text>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black'
            }}>
                Top 10 Results
            </Text>
            {top10Scores.map((score, i) => {
                if (score.name === route.params.name) {
                    return (
                        <Text
                            style={{
                                backgroundColor: 'green',
                                color: 'white',
                                fontSize: 15,
                            }}
                            key={i}
                        >Name: {score.name} Scored: {score.score}</Text>
                    )
                }
                return (
                    <Text key={i}>Name: {score.name} Scored: {score.score}</Text>
                )  
            })}
            <Button title="New Game" onPress={newGameHandle} />
        </View>
        //- A list of the 10 best results and the name of the player.
        //- A button redirecting to start a new game.
    );
};

export default Results