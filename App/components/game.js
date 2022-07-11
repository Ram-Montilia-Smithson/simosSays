
import React, { useEffect, useState } from 'react';
import { Button, Modal, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ColorCard } from './color-card';
import { useDispatch, useSelector } from 'react-redux';
import { selectTopScore, setTop10Scores, setTopScore } from '../state-management/reducers/scoreReducer';
import {
    initializePlay,
    selectColors,
    selectFlashColor,
    selectIsDisplay,
    selectIsOn,
    selectPlay,
    selectScore,
    selectUserColors,
    selectUserPlay,
    setColors,
    setFlashColor,
    setIsDisplay,
    setIsOn,
    setScore,
    setUserColors,
    setUserPlay
} from '../state-management/reducers/gameReducer';

const Game = ({ navigation }) => {

    const play = useSelector(selectPlay);
    const topScore = useSelector(selectTopScore);
    const score = useSelector(selectScore);
    const isOn = useSelector(selectIsOn);
    const isDisplay = useSelector(selectIsDisplay);
    const colors = useSelector(selectColors);
    const flashColor = useSelector(selectFlashColor);
    const userPlay = useSelector(selectUserPlay)
    const userColors = useSelector(selectUserColors)

    const dispatch = useDispatch();

    const timeout = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const [name, setName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const colorList = [
        {
            color: 'green',
            flash: '#7dff7d', //light green
        },
        {
            color: 'red',
            flash: '#ff7d7d', //light red
        },
        {
            color: 'yellow',
            flash: '#ffff7d', //light yellow
        },
        {
            color: 'blue',
            flash: '#7d7dff', //light blue
        },
    ];

    function startHandle() {
        dispatch(setIsOn(true));
    }
    
    function newGameHandle() {
        dispatch(setIsOn(false));
    }

    useEffect(() => {
        if (isOn) {
            dispatch(setIsDisplay(true));
        }
        else {
           dispatch(initializePlay());
        }
    }, [isOn]);

    useEffect(() => {
        if (isOn && isDisplay) {
            let newColor = colorList[Math.floor(Math.random() * 4)].color;
            const copyColors = [...play.colors];
            copyColors.push(newColor);
            dispatch(setColors(copyColors))
        }
    }, [isOn, isDisplay]);

    useEffect(() => {
        if (isOn && isDisplay && colors.length) {
            displayColors();
        }
    }, [isOn, isDisplay, colors.length]);

    async function displayColors() {
        await timeout(500);
        for (let i = 0; i < colors.length; i++) {
            dispatch(setFlashColor(colors[i]));
            await timeout(500);
            dispatch(setFlashColor(''));
            await timeout(500);

            if (i === colors.length - 1) {
                const copyColors = [...colors];
                dispatch(setIsDisplay(false));
                dispatch(setUserPlay(true));
                dispatch(setUserColors(copyColors.reverse()));
            }
        }
    }

    async function cardClickHandle(color) {
        if (!isDisplay && userPlay) {
            const copyUserColors = [...userColors];
            const lastColor = copyUserColors.pop();
            dispatch(setFlashColor(color));

            if (color.color === lastColor) {
                if (copyUserColors.length) {
                    dispatch(setUserColors(copyUserColors));
                } else {
                    await timeout(250);
                    dispatch(setIsDisplay(true));
                    dispatch(setUserPlay(false));
                    dispatch(setScore(colors.length));
                    dispatch(setUserColors([]));
                }
            } else {
                await timeout(250);
                dispatch(setScore(colors.length - 1));
                dispatch(setUserPlay(false))
                setModalVisible(true);
            }
            await timeout(250);
            dispatch(setFlashColor(''));
        }
    }

    const closeModal = () => {
        dispatch(setTop10Scores({score: score, name: name}));
        dispatch(setTopScore(score));
        navigation.navigate('Results', { name: name, score: score });
        setName('');
        setModalVisible(!modalVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardWrapper}>
                {colorList &&
                    colorList.map((v, i) => (
                        <ColorCard
                            key={i}
                            onPress={() => {
                                cardClickHandle(v);
                            }}
                            flash={flashColor === v.color}
                            color={v}
                        />
                    ))}
            </View>
            <View style={styles.buttons}>
                {!isOn && !score ? (
                    <Button title="Start" onPress={startHandle} />
                ) : (
                    <Button title="Start" disabled={true} />
                )}

                {isOn && !isDisplay && !userPlay ? (
                    <Button title="New Game" onPress={newGameHandle} />
                ) : (
                    <Button title="New Game" disabled={true} />
                )}
                
                <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                    {isOn && (isDisplay || userPlay) ? (
                        <Text style={styles.scoreText}>current Score:{score}</Text>
                    ) : (
                        <Text style={styles.scoreText}>Final Score: {score}</Text>
                    )}
                </View>
            </View>
            <View style={styles.score}>
                <Text style={styles.topScoreText}>Top Score: {topScore}</Text>
            </View>
            <Modal
                presentationStyle={'formSheet'}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    closeModal();
                }}
            >
                <View
                    style={styles.modal}
                >
                    <Text>You Scored {score}</Text>
                    <Text>Please enter you name:</Text>
                    <TextInput style={styles.input} onChangeText={setName} value={name} />
                    <Button title="Close" onPress={() => closeModal()} disabled={!name.length}/>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
    },
    cardWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 16,
        height: '45%',
    },
    buttons: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    score: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    topScoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    scoreText: {
        fontSize: 15,
        color: 'white',
        backgroundColor: 'purple',
        padding: 5
    },
    modal: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'lightgrey',
        width: '100%'
    }
});

export default Game;
