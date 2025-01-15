import { z } from 'zod';

// Environment types
type Environment = 'development' | 'production' | 'test';

// Config schema
const configSchema = z.object({
  googleMapsApiKey: z.string().min(1, 'Google Maps API key is required'),
  contactEmail: z.string().email('Invalid contact email format'),
  brevoApiKey: z.string().min(1, 'Brevo API key is required'),
  environment: z.enum(['development', 'production', 'test']).default('development'),
});

export type Config = z.infer<typeof configSchema>;

// Error messages
const ERROR_MESSAGES = {
  MISSING_VARS: 'Missing required environment variables:',
  INVALID_EMAIL: 'Invalid contact email format in environment variables',
  INVALID_API_KEY: 'Invalid API key format',
  ENV_LOAD_ERROR: 'Failed to load environment variables',
};

// Validation helper functions
function validateApiKey(key: string | undefined, name: string): string {
  if (!key) {
    throw new Error(`${name} is required`);
  }
  if (key.length < 10) {
    throw new Error(`${name} appears to be invalid`);
  }
  return key;
}

function validateEmail(email: string | undefined): string {
  if (!email) {
    throw new Error('Contact email is required');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
  }
  return email;
}

function validateEnvironment(env: string | undefined): Environment {
  if (!env || !['development', 'production', 'test'].includes(env)) {
    console.warn('Invalid environment specified, defaulting to development');
    return 'development';
  }
  return env as Environment;
}

// Load and validate config
function loadConfig(): Config {
  try {
    // Get environment variables
    const rawConfig = {
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      contactEmail: import.meta.env.VITE_CONTACT_EMAIL,
      brevoApiKey: import.meta.env.VITE_BREVO_API_KEY,
      environment: import.meta.env.MODE,
    };

    // Validate individual fields
    const validatedConfig = {
      googleMapsApiKey: validateApiKey(rawConfig.googleMapsApiKey, 'Google Maps API key'),
      contactEmail: validateEmail(rawConfig.contactEmail),
      brevoApiKey: validateApiKey(rawConfig.brevoApiKey, 'Brevo API key'),
      environment: validateEnvironment(rawConfig.environment),
    };

    // Validate entire config
    const result = configSchema.safeParse(validatedConfig);

    if (!result.success) {
      const errors = result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Config validation failed:\n${errors.join('\n')}`);
    }

    return result.data;
  } catch (error) {
    console.error('Failed to load config:', error);
    throw error;
  }
}

// Initialize config
export const config = loadConfig();

// Helper functions
export function isDevelopment(): boolean {
  return config.environment === 'development';
}

export function isProduction(): boolean {
  return config.environment === 'production';
}

export function isTest(): boolean {
  return config.environment === 'test';
}

export function getApiUrl(): string {
  switch (config.environment) {
    case 'production':
      return 'https://api.sweetandcomfyboston.com';
    case 'test':
      return 'http://localhost:3001';
    default:
      return 'http://localhost:3000';
  }
}

export function getMapsApiKey(): string {
  if (!config.googleMapsApiKey) {
    throw new Error('Google Maps API key is required');
  }
  return config.googleMapsApiKey;
}

export function getContactEmail(): string {
  if (!config.contactEmail) {
    throw new Error('Contact email is required');
  }
  return config.contactEmail;
}

// Security functions
export function sanitizeConfig(): Partial<Config> {
  return {
    environment: config.environment,
    contactEmail: config.contactEmail,
  };
}

// Logging helper
export function logConfig(includeSecrets = false): void {
  if (isDevelopment()) {
    console.log('Current configuration:', {
      environment: config.environment,
      contactEmail: config.contactEmail,
      ...(includeSecrets ? {
        googleMapsApiKey: '***' + config.googleMapsApiKey.slice(-4),
        brevoApiKey: '***' + config.brevoApiKey.slice(-4),
      } : {}),
    });
  }
}

// Export singleton
export default Object.freeze(config);
