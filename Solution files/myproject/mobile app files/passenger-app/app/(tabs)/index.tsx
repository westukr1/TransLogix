import { Image } from 'expo-image';
import { StyleSheet, Pressable } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TransLogix Passenger</ThemedText>
        <ThemedText>
          Увійдіть або створіть обліковий запис, щоб користуватися додатком.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.actionsContainer}>
        <Link href="/register" asChild>
          <Pressable style={styles.primaryButton}>
            <ThemedText style={styles.primaryButtonText}>
              Створити акаунт
            </ThemedText>
          </Pressable>
        </Link>

        {/* Якщо екран логіну ще не створено – можеш тимчасово теж вести на /register */}
        <Link href="/register" asChild>
          <Pressable style={styles.secondaryButton}>
            <ThemedText style={styles.secondaryButtonText}>
              Увійти
            </ThemedText>
          </Pressable>
        </Link>

        <Link href="/(tabs)/requests" asChild>
          <ThemedText type="link" style={styles.linkText}>
            Перейти до заявок
          </ThemedText>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 8,
  },
  actionsContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  linkText: {
    marginTop: 8,
  },
});
