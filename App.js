/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const ColorCard = ({color, onPress, flash}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: flash ? color.flash : color.color,
        width: '45%',
        height: '100%',
        marginBottom: 100,
        borderWidth: flash ? 2 : 0,
      }}
    />
  );
};

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={App}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={{title: 'Results'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Results = ({navigation, route}) => {
  return (
    <Text>
      {route.params.name} scored: {route.params.score}
    </Text>
    //- A list of the 10 best results and the name of the player.
    //- A button redirecting to start a new game.
  );
};

const App = ({navigation}) => {
  const [isOn, setIsOn] = useState(false);
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

  const initPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };

  const [play, setPlay] = useState(initPlay);
  const [flashColor, setFlashColor] = useState('');
  const [topScore, setTopScore] = useState(0);

  function startHandle() {
    setIsOn(true);
  }

  useEffect(() => {
    if (isOn) {
      setPlay({...initPlay, isDisplay: true});
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)].color;

      const copyColors = [...play.colors];
      copyColors.push(newColor);
      setPlay({...play, colors: copyColors});
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  async function displayColors() {
    await timeout(500);
    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(play.colors[i]);
      await timeout(500);
      setFlashColor('');
      await timeout(500);

      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];

        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  }

  async function cardClickHandle(color) {
    if (!play.isDisplay && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlashColor(color);

      if (color.color === lastColor) {
        if (copyUserColors.length) {
          setPlay({...play, userColors: copyUserColors});
        } else {
          await timeout(250);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(250);
        setPlay({...initPlay, score: play.colors.length - 1});
        if (play.score > topScore) {
          setTopScore(play.score);
        }
        setModalVisible(true);
      }
      await timeout(250);
      setFlashColor('');
    }
  }

  function closeHandle() {
    setIsOn(false);
  }

  const closeModal = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Results', {name: name, score: play.score});
    setName('');
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
        {!isOn && !play.score ? (
          <Button title="Start" onPress={startHandle} />
        ) : (
          <Button title="Start" disabled={true} />
        )}
        {isOn && !play.isDisplay && !play.userPlay ? (
          <Button title="New Game" onPress={closeHandle} />
        ) : (
          <Button title="New Game" disabled={true} />
        )}
        {isOn && (play.isDisplay || play.userPlay) ? (
          <Text style={{width: '33%'}}>current Score:{play.score}</Text>
        ) : (
          <View style={{width: '33%'}}>
            <Text>Final Score: {play.score}</Text>
          </View>
        )}
      </View>
      <View style={styles.score}>
        <Text style={styles.scoreText}>Top Score: {topScore}</Text>
      </View>
      <Modal
        presentationStyle={'formSheet'}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}>
        <Text>You scored: {play.score}</Text>
        <Text>Please enter you name:</Text>
        <TextInput onChangeText={setName} value={name} />
        <Button title="Close" onPress={() => closeModal()} />
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
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AppWrapper;
