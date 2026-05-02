import { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { colors, typography, spacing, layout } from '../theme';
import Button from '../components/Button';
import Input from '../components/Input';

type Props = {
  onClose: () => void;
  onCreated: () => void;
};

export default function AddCityScreen({ onClose, onCreated }: Props) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      Alert.alert('Name required', 'Please enter a city name.');
      return;
    }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('cities').insert({
      name: name.trim(),
      country: country.trim() || null,
      owner_id: user!.id,
    });
    setLoading(false);
    if (error) Alert.alert('Error', error.message);
    else onCreated();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>New City</Text>
        <Input
          variant="inline"
          placeholder="City name"
          value={name}
          onChangeText={setName}
          autoFocus
        />
        <Input
          variant="inline"
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <View style={styles.actions}>
          <Button label="Cancel" variant="secondary" onPress={onClose} />
          <Button label={loading ? 'Saving...' : 'Save'} onPress={handleCreate} disabled={loading} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 80,
  },
  title: {
    fontSize: typography.sizes.display,
    fontFamily: typography.fonts.bold,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
});