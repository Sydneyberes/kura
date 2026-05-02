import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { supabase } from '../lib/supabase';
import { colors, typography, spacing, layout } from '../theme';
import AddCityScreen from './AddCityScreen';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - layout.screenPadding * 2 - 12) / 2;
const ROTATIONS = [-3.5, -0.5, 2.9, 3.6, -2.3, -2.1, 1.8, -1.2, 3.1, -0.8];

type City = {
  id: string;
  name: string;
  country: string | null;
  cover_image: string | null;
};

export default function CitiesScreen() {
  const [cities, setCities] = useState<City[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  function loadCities() {
    supabase
      .from('cities')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setCities(data);
      });
  }

  useEffect(() => {
    loadCities();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          {`Your\nCities (${cities.length})`}
        </Text>
        <View style={styles.grid}>
          {cities.map((city, index) => (
            <TouchableOpacity
              key={city.id}
              style={[
                styles.card,
                { transform: [{ rotate: `${ROTATIONS[index % ROTATIONS.length]}deg` }] }
              ]}
            >
              <View style={styles.cardImage} />
              <Text style={styles.cardName}>{city.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setShowAdd(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={showAdd} animationType="slide">
        <AddCityScreen
          onClose={() => setShowAdd(false)}
          onCreated={() => {
            setShowAdd(false);
            loadCities();
          }}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 72,
    paddingBottom: 160,
  },
  title: {
    fontSize: typography.sizes.display,
    fontFamily: typography.fonts.bold,
    color: colors.text,
    marginBottom: spacing.xl,
    lineHeight: typography.sizes.display * 1.1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: CARD_SIZE,
    backgroundColor: colors.background,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: CARD_SIZE,
    backgroundColor: colors.card,
    borderRadius: 0,
  },
  cardName: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.medium,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: 2,
    paddingHorizontal: 2,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  addButtonText: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.regular,
    color: colors.textMuted,
  },
});