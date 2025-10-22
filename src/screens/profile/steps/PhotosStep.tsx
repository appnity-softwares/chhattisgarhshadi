import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Button, Card } from '../../../components';
import { colors } from '../../../theme/colors';

interface PhotosStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const PhotosStep: React.FC<PhotosStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [photos, setPhotos] = useState<string[]>(data.photos || []);

  const handleAddPhoto = () => {
    if (photos.length >= 6) {
      Alert.alert('Maximum Photos', 'You can upload maximum 6 photos');
      return;
    }

    // Mock photo upload - In real app, use image picker
    Alert.alert(
      'Add Photo',
      'In production, this will open image picker. For now, we\'ll add a placeholder.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add Mock Photo',
          onPress: () => {
            const mockPhoto = `https://via.placeholder.com/400x400?text=Photo+${photos.length + 1}`;
            setPhotos([...photos, mockPhoto]);
          },
        },
      ]
    );
  };

  const handleRemovePhoto = (index: number) => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const newPhotos = photos.filter((_, i) => i !== index);
            setPhotos(newPhotos);
          },
        },
      ]
    );
  };

  const handleNext = () => {
    if (photos.length === 0) {
      Alert.alert(
        'No Photos',
        'Please add at least one photo to continue. You can add more photos later from your profile.',
        [
          { text: 'Add Photo', onPress: handleAddPhoto },
          {
            text: 'Skip for now',
            style: 'cancel',
            onPress: () => onNext({ photos: [] }),
          },
        ]
      );
      return;
    }

    onNext({ photos });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Instructions */}
        <Card style={styles.instructionCard}>
          <Text style={styles.instructionEmoji}>📸</Text>
          <Text style={styles.instructionTitle}>Add Your Photos</Text>
          <Text style={styles.instructionText}>
            Add at least 1 photo. You can upload up to 6 photos.
          </Text>
          <Text style={styles.instructionSubText}>
            Choose clear photos that show your face
          </Text>
        </Card>

        {/* Photo Guidelines */}
        <Card style={styles.guidelinesCard}>
          <Text style={styles.guidelinesTitle}>Photo Guidelines</Text>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineIcon}>✓</Text>
            <Text style={styles.guidelineText}>Clear face photos work best</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineIcon}>✓</Text>
            <Text style={styles.guidelineText}>Good lighting is important</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineIcon}>✓</Text>
            <Text style={styles.guidelineText}>Smile and look natural</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineIcon}>✗</Text>
            <Text style={styles.guidelineText}>No group photos</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineIcon}>✗</Text>
            <Text style={styles.guidelineText}>No blurry or filtered photos</Text>
          </View>
        </Card>

        {/* Photo Grid */}
        <Card style={styles.photoGrid}>
          <View style={styles.gridRow}>
            {[0, 1, 2].map((index) => (
              <View key={index} style={styles.photoSlot}>
                {photos[index] ? (
                  <TouchableOpacity
                    style={styles.photoContainer}
                    onPress={() => handleRemovePhoto(index)}>
                    <Image
                      source={{ uri: photos[index] }}
                      style={styles.photo}
                    />
                    <View style={styles.removeButton}>
                      <Text style={styles.removeIcon}>✕</Text>
                    </View>
                    {index === 0 && (
                      <View style={styles.primaryBadge}>
                        <Text style={styles.primaryText}>Primary</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.addPhotoButton}
                    onPress={handleAddPhoto}>
                    <Text style={styles.addPhotoIcon}>+</Text>
                    <Text style={styles.addPhotoText}>
                      {index === 0 ? 'Add Primary' : 'Add Photo'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          <View style={styles.gridRow}>
            {[3, 4, 5].map((index) => (
              <View key={index} style={styles.photoSlot}>
                {photos[index] ? (
                  <TouchableOpacity
                    style={styles.photoContainer}
                    onPress={() => handleRemovePhoto(index)}>
                    <Image
                      source={{ uri: photos[index] }}
                      style={styles.photo}
                    />
                    <View style={styles.removeButton}>
                      <Text style={styles.removeIcon}>✕</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.addPhotoButton}
                    onPress={handleAddPhoto}
                    disabled={photos.length === 0}>
                    <Text style={styles.addPhotoIcon}>+</Text>
                    <Text style={styles.addPhotoText}>Add Photo</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          <Text style={styles.photoCount}>
            {photos.length}/6 photos added
          </Text>
        </Card>

        {/* Info */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoText}>
            Your first photo will be your primary profile photo. Tap any photo to remove it.
          </Text>
        </Card>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <View style={styles.buttonRow}>
          <Button
            title="Back"
            onPress={onBack}
            variant="outline"
            style={styles.backButton}
            leftIcon={<Text style={styles.buttonIconOutline}>←</Text>}
          />
          <Button
            title="Complete Profile"
            onPress={handleNext}
            style={styles.nextButton}
            rightIcon={<Text style={styles.buttonIcon}>✓</Text>}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  instructionCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  instructionEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 4,
  },
  instructionSubText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  guidelinesCard: {
    marginBottom: 20,
    backgroundColor: colors.info + '10',
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  guidelineIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  guidelineText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  photoGrid: {
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  photoSlot: {
    flex: 1,
    aspectRatio: 1,
  },
  photoContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    fontSize: 16,
    color: colors.neutral.white,
    fontWeight: 'bold',
  },
  primaryBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    right: 4,
    backgroundColor: colors.primary.main,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  primaryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
  addPhotoButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral.gray300,
    borderStyle: 'dashed',
    backgroundColor: colors.neutral.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoIcon: {
    fontSize: 32,
    color: colors.text.disabled,
    marginBottom: 4,
  },
  addPhotoText: {
    fontSize: 11,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  photoCount: {
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '10',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  buttonIcon: {
    fontSize: 20,
    color: colors.neutral.white,
  },
  buttonIconOutline: {
    fontSize: 20,
    color: colors.primary.main,
  },
});

export default PhotosStep;