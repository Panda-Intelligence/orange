import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import { BlurView } from 'expo-blur';
import colors from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'glass' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    if (variant === 'glass') {
      return [...baseStyle, styles.glassButton, style];
    }

    return [...baseStyle, styles[variant], style];
  };

  const getTextStyle = () => {
    const baseTextStyle = [styles.text, styles[`${size}Text`]];

    if (variant === 'primary' || variant === 'danger') {
      return [...baseTextStyle, styles.lightText, textStyle];
    }

    return [...baseTextStyle, textStyle];
  };

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'danger' ? 'white' : colors.primary}
          size="small"
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
        </View>
      )}
    </>
  );

  if (variant === 'glass') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[getButtonStyle(), disabled && styles.disabled]}
      >
        <BlurView intensity={80} tint={colors.blurTint} style={styles.blurView}>
          {renderContent()}
        </BlurView>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), disabled && styles.disabled]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  glassButton: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  blurView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 80,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 160,
  },
  text: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  lightText: {
    color: 'white',
  },
  disabled: {
    opacity: 0.6,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});