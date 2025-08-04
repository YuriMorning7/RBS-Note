import { Ionicons } from '@expo/vector-icons';
import React from 'react';

type Props = {
    name: React.ComponentProps<typeof Ionicons>['name'];
    size?: number;
    color?: string;
};

const AppIcon: React.FC<Props> = ({ name, size = 24, color = '#333' }) => {
    return <Ionicons name={name} size={size} color={color} />;
};

export default AppIcon;
