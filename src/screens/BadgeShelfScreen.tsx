import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useExplorer } from '../context/ExplorerContext';

interface Badge {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

const allBadges: Badge[] = [
  {
    id: 'france-culture',
    emoji: '🎭',
    title: 'Fransız Kültürü Uzmanı',
    description: 'Fransa\'nın kültürel görevlerini tamamladın!',
  },
  {
    id: 'italy-culture',
    emoji: '🍕',
    title: 'İtalyan Kültürü Uzmanı',
    description: 'İtalya\'nın kültürel görevlerini tamamladın!',
  },
  {
    id: 'japan-culture',
    emoji: '🎎',
    title: 'Japon Kültürü Uzmanı',
    description: 'Japonya\'nın kültürel görevlerini tamamladın!',
  },
  {
    id: 'uk-culture',
    emoji: '☕',
    title: 'İngiliz Kültürü Uzmanı',
    description: 'İngiltere\'nin kültürel görevlerini tamamladın!',
  },
  {
    id: 'turkey-culture',
    emoji: '🌙',
    title: 'Türk Kültürü Uzmanı',
    description: 'Türkiye\'nin kültürel görevlerini tamamladın!',
  },
];

const BadgeShelfScreen = () => {
  const { badges } = useExplorer();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rozet Koleksiyonu</Text>

      <View style={styles.badgeGrid}>
        {allBadges.map((badge) => {
          const isUnlocked = badges.includes(badge.id);

          return (
            <View
              key={badge.id}
              style={[
                styles.badgeCard,
                !isUnlocked && styles.lockedBadge,
              ]}
            >
              <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
              <Text style={styles.badgeTitle}>{badge.title}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
              {!isUnlocked && (
                <View style={styles.lockedOverlay}>
                  <Text style={styles.lockedText}>Kilitli</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lockedBadge: {
    opacity: 0.5,
  },
  badgeEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  badgeDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  lockedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BadgeShelfScreen; 