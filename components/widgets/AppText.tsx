// components/widgets/AppText.tsx
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface Props extends TextProps {
    weight?: 'regular' | 'bold';
    }

    const AppText: React.FC<Props> = ({
    children,
    style,
    weight = 'regular',
    ...rest
    }) => {
    const fontFamily =
        weight === 'bold' ? 'Raleway_700Bold' : 'Raleway_400Regular';

    return (
        <Text style={[styles.text, { fontFamily }, style]} {...rest}>
        {children}
        </Text>
    );
    };

    const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#333',
    },
    });

export default AppText;
