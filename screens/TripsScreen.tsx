import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

export default function TripsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trips</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.semibold,
    color: colors.text,
  },
});