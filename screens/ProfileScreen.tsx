import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { colors, typography, spacing } from '../theme';
import Button from '../components/Button';

export default function ProfileScreen() {
  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Button label="Sign out" variant="secondary" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.semibold,
    color: colors.text,
  },
});