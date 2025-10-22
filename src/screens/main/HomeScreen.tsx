import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { colors } from '../../theme/colors';
import { Avatar, Card, Button } from '../../components';
import { ProfileCard, StatCard, ActivityItem } from '../../components/home';
import {
  currentUser,
  userStats,
  recommendedProfiles,
  recentActivities,
} from '../../data/mockData';

const HomeScreen = () => {
  const handleViewProfile = (profileId: number) => {
    console.log('View profile:', profileId);
    // Navigate to profile detail screen
  };

  const handleActivityPress = (activityId: number) => {
    console.log('Activity pressed:', activityId);
    // Navigate to user profile or chat
  };

  const handleUpgradePremium = () => {
    console.log('Upgrade to premium');
    // Navigate to premium subscription screen
  };

  const handleCompleteProfile = () => {
    console.log('Complete profile');
    // Navigate to edit profile
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.neutral.white} barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar
              name={`${currentUser.firstName} ${currentUser.lastName}`}
              size={50}
              verified={currentUser.verified}
              premium={currentUser.premium}
            />
            <View style={styles.headerText}>
              <Text style={styles.greeting}>{getGreeting()}!</Text>
              <Text style={styles.userName}>
                {currentUser.firstName} {currentUser.lastName}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Profile Completion Card */}
        {currentUser.profileCompletion < 100 && (
          <Card style={styles.completionCard}>
            <View style={styles.completionHeader}>
              <View>
                <Text style={styles.completionTitle}>Complete Your Profile</Text>
                <Text style={styles.completionSubtitle}>
                  {currentUser.profileCompletion}% completed
                </Text>
              </View>
              <Text style={styles.completionIcon}>📝</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${currentUser.profileCompletion}%` },
                ]}
              />
            </View>

            <Text style={styles.completionMessage}>
              Complete profiles get 3x more responses!
            </Text>

            <Button
              title="Complete Now"
              onPress={handleCompleteProfile}
              size="sm"
              variant="outline"
              style={styles.completionButton}
            />
          </Card>
        )}

        {/* Quick Stats */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Activity</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsContainer}>
          <StatCard
            icon="👁️"
            label="Profile Views"
            value={userStats.views}
            color={colors.info}
            onPress={() => console.log('Views')}
          />
          <StatCard
            icon="❤️"
            label="Likes"
            value={userStats.likes}
            color={colors.error}
            onPress={() => console.log('Likes')}
          />
          <StatCard
            icon="💕"
            label="Matches"
            value={userStats.matches}
            color={colors.primary.main}
            onPress={() => console.log('Matches')}
          />
          <StatCard
            icon="💬"
            label="Messages"
            value={userStats.messages}
            color={colors.secondary.main}
            onPress={() => console.log('Messages')}
          />
        </ScrollView>

        {/* Recommended Matches */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All →</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={recommendedProfiles}
          renderItem={({ item }) => (
            <ProfileCard
              profile={item}
              onPress={() => handleViewProfile(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.profilesContainer}
        />

        {/* Premium Banner */}
        {!currentUser.premium && (
          <Card style={styles.premiumBanner}>
            <View style={styles.premiumContent}>
              <Text style={styles.premiumIcon}>👑</Text>
              <View style={styles.premiumText}>
                <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                <Text style={styles.premiumSubtitle}>
                  Get unlimited likes, see who liked you, and more!
                </Text>
              </View>
            </View>
            <Button
              title="Upgrade Now"
              onPress={handleUpgradePremium}
              size="sm"
              style={styles.premiumButton}
            />
          </Card>
        )}

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activitiesContainer}>
          {recentActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              onPress={() => handleActivityPress(activity.id)}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔍</Text>
            <Text style={styles.actionText}>Advanced Search</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>⭐</Text>
            <Text style={styles.actionText}>My Shortlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👤</Text>
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.neutral.white,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
  completionCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: colors.primary.lighter,
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  completionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  completionSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  completionIcon: {
    fontSize: 32,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.neutral.gray200,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 4,
  },
  completionMessage: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  completionButton: {
    alignSelf: 'flex-start',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.main,
  },
  statsContainer: {
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  profilesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  premiumBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: colors.premium + '15',
    borderWidth: 2,
    borderColor: colors.premium,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  premiumText: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  premiumButton: {
    backgroundColor: colors.premium,
    alignSelf: 'flex-start',
  },
  activitiesContainer: {
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    marginTop: 8,
  },
  actionButton: {
    width: '48%',
    backgroundColor: colors.neutral.white,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 40,
  },
});

export default HomeScreen;