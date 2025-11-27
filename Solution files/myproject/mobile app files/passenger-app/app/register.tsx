import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Link, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Validation helpers kept simple for now; they can be swapped for a dedicated form library later.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9]{5,}$/;

const loginRoute = '/'; // Update this path if/when a dedicated login screen is added.

type ValidationErrors = Partial<{
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}>;

export default function RegisterScreen() {
  const router = useRouter();

  // Local form state for controlled inputs.
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Request / UI state.
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const nextErrors: ValidationErrors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phone.trim())) {
      nextErrors.phone = 'Use digits and an optional + sign';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    return nextErrors;
  };

  // Validate whenever form values change so the UI can react immediately.
  useEffect(() => {
    setErrors(validateForm());
  }, [fullName, email, phone, password, confirmPassword]);

  const hasEmptyRequiredField = useMemo(
    () => !fullName.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword,
    [fullName, email, phone, password, confirmPassword]
  );

  const isSubmitDisabled = useMemo(
    () => hasEmptyRequiredField || Object.keys(errors).length > 0 || isSubmitting,
    [errors, hasEmptyRequiredField, isSubmitting]
  );

  // Submission handler posting to the Django backend.
  const handleSignUp = async () => {
    const currentErrors = validateForm();
    setErrors(currentErrors);
    setSuccessMessage('');
    setApiError('');

    if (Object.keys(currentErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/mobile/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          // Add any additional fields required by the backend model here.
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const message =
          (errorBody && (errorBody.detail || errorBody.message || errorBody.error)) ||
          'Registration failed, please try again';
        setApiError(message);
        return;
      }

      setSuccessMessage('Account created successfully');
      router.replace(loginRoute);
    } catch (error) {
      setApiError('Registration failed, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.headerContainer}>
            <ThemedText type="title">Create account</ThemedText>
            <ThemedText type="default">Register to use the TransLogix mobile app</ThemedText>
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Full name</ThemedText>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Jane Doe"
              style={styles.input}
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
            />
            {errors.fullName && <ThemedText style={styles.errorText}>{errors.fullName}</ThemedText>}
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="name@example.com"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
            />
            {errors.email && <ThemedText style={styles.errorText}>{errors.email}</ThemedText>}
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Phone number</ThemedText>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="+380..."
              style={styles.input}
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              returnKeyType="next"
            />
            {errors.phone && <ThemedText style={styles.errorText}>{errors.phone}</ThemedText>}
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              style={styles.input}
              secureTextEntry
              textContentType="password"
              returnKeyType="next"
            />
            {errors.password && <ThemedText style={styles.errorText}>{errors.password}</ThemedText>}
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Confirm password</ThemedText>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="********"
              style={styles.input}
              secureTextEntry
              textContentType="password"
              returnKeyType="done"
            />
            {errors.confirmPassword && (
              <ThemedText style={styles.errorText}>{errors.confirmPassword}</ThemedText>
            )}
          </View>

          {apiError ? <ThemedText style={styles.apiError}>{apiError}</ThemedText> : null}
          {successMessage ? <ThemedText style={styles.successText}>{successMessage}</ThemedText> : null}

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleSignUp}
              disabled={isSubmitDisabled}
              style={({ pressed }) => [
                styles.primaryButton,
                isSubmitDisabled && styles.buttonDisabled,
                pressed && !isSubmitDisabled ? styles.buttonPressed : null,
              ]}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                {isSubmitting ? 'Signing up…' : 'Sign up'}
              </ThemedText>
              {isSubmitting && <ActivityIndicator style={styles.spinner} />}
            </Pressable>
          </View>

          <View style={styles.footerRow}>
            <ThemedText>Already have an account? </ThemedText>
            <Link href={loginRoute} asChild>
              <ThemedText type="link">Log in</ThemedText>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    gap: 12,
  },
  headerContainer: {
    gap: 4,
    marginBottom: 8,
  },
  formGroup: {
    gap: 6,
  },
  label: {
    fontWeight: '600',
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#d83a52',
    fontSize: 14,
  },
  apiError: {
    color: '#d83a52',
    fontWeight: '600',
  },
  successText: {
    color: '#1b9c85',
    fontWeight: '600',
  },
  primaryButton: {
    marginTop: 8,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#0a7ea4',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
  },
  spinner: {
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
});
