import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { colors, typography, spacing } from '../theme';

type ButtonProps = TouchableOpacityProps & {
  label: string;
  variant?: 'primary' | 'secondary';
};

export default function Button({ label, variant = 'primary', style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        style,
      ]}
      {...props}
    >
      <Text style={[
        styles.label,
        variant === 'secondary' && styles.labelSecondary,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 100,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.text,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.text,
  },
  label: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semibold,
    color: colors.background,
  },
  labelSecondary: {
    color: colors.text,
  },
});