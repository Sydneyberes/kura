import { TextInput, TextInputProps, StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing } from '../theme';

type InputProps = TextInputProps & {
  variant?: 'field' | 'inline';
  label?: string;
};

export default function Input({ variant = 'field', label, style, ...props }: InputProps) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          variant === 'field' ? styles.field : styles.inline,
          style,
        ]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  field: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 100,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.regular,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  inline: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.bold,
    color: colors.text,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.lg,
  },
});