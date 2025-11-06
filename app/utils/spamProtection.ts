'use client';

// Spam protection utilities
export interface SpamProtectionConfig {
  maxSubmissionsPerHour: number;
  maxSubmissionsPerDay: number;
  minTimeBetweenSubmissions: number; // in milliseconds
  honeypotFieldName: string;
}

export const defaultSpamConfig: SpamProtectionConfig = {
  maxSubmissionsPerHour: 5,
  maxSubmissionsPerDay: 10,
  minTimeBetweenSubmissions: 30000, // 30 seconds
  honeypotFieldName: 'website_url' // Hidden field name
};

export interface SubmissionRecord {
  timestamp: number;
  ip?: string;
  userAgent?: string;
}

class SpamProtectionService {
  private config: SpamProtectionConfig;
  private storageKey = 'ecomsharks_submissions';

  constructor(config: SpamProtectionConfig = defaultSpamConfig) {
    this.config = config;
  }

  // Check if submission is allowed based on rate limiting
  public canSubmit(): { allowed: boolean; reason?: string; waitTime?: number } {
    const now = Date.now();
    const submissions = this.getSubmissionHistory();
    
    // Filter submissions from last hour
    const lastHour = submissions.filter(
      sub => now - sub.timestamp < 60 * 60 * 1000
    );
    
    // Filter submissions from last day
    const lastDay = submissions.filter(
      sub => now - sub.timestamp < 24 * 60 * 60 * 1000
    );

    // Check hourly limit
    if (lastHour.length >= this.config.maxSubmissionsPerHour) {
      const oldestSubmission = Math.min(...lastHour.map(s => s.timestamp));
      const waitTime = (oldestSubmission + 60 * 60 * 1000) - now;
      return {
        allowed: false,
        reason: `Too many submissions. Please wait ${Math.ceil(waitTime / 60000)} minutes.`,
        waitTime
      };
    }

    // Check daily limit
    if (lastDay.length >= this.config.maxSubmissionsPerDay) {
      const oldestSubmission = Math.min(...lastDay.map(s => s.timestamp));
      const waitTime = (oldestSubmission + 24 * 60 * 60 * 1000) - now;
      return {
        allowed: false,
        reason: `Daily submission limit reached. Please try again tomorrow.`,
        waitTime
      };
    }

    // Check minimum time between submissions
    if (submissions.length > 0) {
      const lastSubmission = Math.max(...submissions.map(s => s.timestamp));
      const timeSinceLastSubmission = now - lastSubmission;
      
      if (timeSinceLastSubmission < this.config.minTimeBetweenSubmissions) {
        const waitTime = this.config.minTimeBetweenSubmissions - timeSinceLastSubmission;
        return {
          allowed: false,
          reason: `Please wait ${Math.ceil(waitTime / 1000)} seconds before submitting again.`,
          waitTime
        };
      }
    }

    return { allowed: true };
  }

  // Record a submission
  public recordSubmission(): void {
    const now = Date.now();
    const submissions = this.getSubmissionHistory();
    
    // Add new submission
    submissions.push({ timestamp: now });
    
    // Keep only last 24 hours of submissions
    const cutoff = now - (24 * 60 * 60 * 1000);
    const filteredSubmissions = submissions.filter(sub => sub.timestamp > cutoff);
    
    // Store updated history
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(filteredSubmissions));
    } catch (error) {
      console.warn('Could not save submission history to localStorage:', error);
    }
  }

  // Get submission history from localStorage
  private getSubmissionHistory(): SubmissionRecord[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Could not read submission history from localStorage:', error);
      return [];
    }
  }

  // Validate honeypot field (should be empty for humans)
  public validateHoneypot(formData: any): boolean {
    const honeypotValue = formData[this.config.honeypotFieldName];
    return !honeypotValue || honeypotValue.trim() === '';
  }

  // Get remaining submissions for current period
  public getRemainingSubmissions(): { hourly: number; daily: number } {
    const now = Date.now();
    const submissions = this.getSubmissionHistory();
    
    const lastHour = submissions.filter(
      sub => now - sub.timestamp < 60 * 60 * 1000
    );
    
    const lastDay = submissions.filter(
      sub => now - sub.timestamp < 24 * 60 * 60 * 1000
    );

    return {
      hourly: Math.max(0, this.config.maxSubmissionsPerHour - lastHour.length),
      daily: Math.max(0, this.config.maxSubmissionsPerDay - lastDay.length)
    };
  }

  // Clear submission history (for testing or admin use)
  public clearHistory(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.warn('Could not clear submission history:', error);
    }
  }
}

// Create singleton instance
export const spamProtection = new SpamProtectionService();

// Utility function to generate random honeypot field name
export const generateHoneypotFieldName = (): string => {
  const prefixes = ['website', 'url', 'homepage', 'site'];
  const suffixes = ['url', 'link', 'address', 'page'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${prefix}_${suffix}`;
};

// Utility function to detect suspicious patterns
export const detectSuspiciousActivity = (formData: any): boolean => {
  const suspiciousPatterns = [
    /test.*test/i,
    /spam/i,
    /fake/i,
    /bot/i,
    /automated/i,
    /script/i
  ];

  const textToCheck = `${formData.name} ${formData.email} ${formData.message}`.toLowerCase();
  
  return suspiciousPatterns.some(pattern => pattern.test(textToCheck));
};
