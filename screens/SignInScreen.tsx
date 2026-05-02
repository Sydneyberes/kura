import { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import { colors, typography, spacing, layout } from '../theme';
import Button from '../components/Button';
import Input from '../components/Input';

export default function SignInScreen({ onSignIn, onGoToSignUp }: { onSignIn: () => void, onGoToSignUp: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) Alert.alert('Error', error.message);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Kura</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
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
          label={loading ? 'Signing in...' : 'Sign in'}
          onPress={handleSignIn}
          disabled={loading}
          style={styles.button}
        />
        <TouchableOpacity onPress={onGoToSignUp} style={styles.link}>
          <Text style={styles.linkText}>No account? Create one</Text>
        </TouchableOpacity>
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
  link: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  linkText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textMuted,
  },
});