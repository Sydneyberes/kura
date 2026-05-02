import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

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
    fontFamily: typography.fonts.semibold,
    color: colors.text,
  },
});