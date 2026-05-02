import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';

export default function PlacesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Places</Text>
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
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },
});