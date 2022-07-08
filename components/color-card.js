import React from 'react';
import { Pressable } from 'react-native';

export const ColorCard = ({ color, onPress, flash }) => {
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