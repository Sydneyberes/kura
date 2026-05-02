import { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { supabase } from '../lib/supabase';
import { colors, typography, spacing, layout } from '../theme';
import Button from '../components/Button';
import Input from '../components/Input';

export default function SignUpScreen({ onSignUp }: { onSignUp: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) Alert.alert('Error', error.message);
    else onSignUp();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Kura</Text>
        <Text style={styles.subtitle}>Create an account</Text>
        <Input
          variant="field"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          variant="field"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          label={loading ? 'Creating account...' : 'Create account'}
          onPress={handleSignUp}
          disabled={loading}
          style={styles.button}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: layout.screenPadding,
  },
  title: {
    fontSize: typography.sizes.display,
    fontFamily: typography.fonts.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.sm,
  },
});