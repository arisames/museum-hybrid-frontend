// Accessibility Audit and Monitoring Utilities
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Initialize accessibility monitoring in development
export const initializeAccessibilityMonitoring = () => {
  if (process.env.NODE_ENV === 'development') {
    // Initialize axe-core for development accessibility testing
    import('@axe-core/react').then((axe) => {
      axe.default(React, ReactDOM, 1000);
    });
  }
};

// Web Vitals Performance Monitoring
export const initializePerformanceMonitoring = () => {
  // Core Web Vitals monitoring
  getCLS((metric) => {
    console.log('CLS (Cumulative Layout Shift):', metric);
    sendToAnalytics('CLS', metric);
  });

  getFID((metric) => {
    console.log('FID (First Input Delay):', metric);
    sendToAnalytics('FID', metric);
  });

  getFCP((metric) => {
    console.log('FCP (First Contentful Paint):', metric);
    sendToAnalytics('FCP', metric);
  });

  getLCP((metric) => {
    console.log('LCP (Largest Contentful Paint):', metric);
    sendToAnalytics('LCP', metric);
  });

  getTTFB((metric) => {
    console.log('TTFB (Time to First Byte):', metric);
    sendToAnalytics('TTFB', metric);
  });
};

// Send performance metrics to analytics service
const sendToAnalytics = (metricName, metric) => {
  // In production, send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics, SigNoz, or custom analytics
    if (window.gtag) {
      window.gtag('event', metricName, {
        event_category: 'Web Vitals',
        event_label: metricName,
        value: Math.round(metricName === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
    
    // Example: Send to custom analytics endpoint
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metricName,
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(console.error);
  }
};

// Accessibility Audit Functions
export const runAccessibilityAudit = async () => {
  if (typeof window === 'undefined') return;

  try {
    const axe = await import('axe-core');
    const results = await axe.run();
    
    if (results.violations.length > 0) {
      console.group('🚨 Accessibility Violations Found');
      results.violations.forEach((violation) => {
        console.group(`${violation.impact?.toUpperCase()} - ${violation.help}`);
        console.log('Description:', violation.description);
        console.log('Help URL:', violation.helpUrl);
        console.log('Affected elements:', violation.nodes.length);
        violation.nodes.forEach((node, index) => {
          console.log(`Element ${index + 1}:`, node.html);
          console.log('Target:', node.target);
          if (node.failureSummary) {
            console.log('Failure:', node.failureSummary);
          }
        });
        console.groupEnd();
      });
      console.groupEnd();
    } else {
      console.log('✅ No accessibility violations found');
    }

    return results;
  } catch (error) {
    console.error('Error running accessibility audit:', error);
    return null;
  }
};

// Color Contrast Checker
export const checkColorContrast = (foreground, background) => {
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (rgb) => {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const getContrastRatio = (lum1, lum2) => {
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);

  if (!fgRgb || !bgRgb) {
    throw new Error('Invalid color format. Please use hex colors.');
  }

  const fgLuminance = getLuminance(fgRgb);
  const bgLuminance = getLuminance(bgRgb);
  const contrastRatio = getContrastRatio(fgLuminance, bgLuminance);

  return {
    ratio: contrastRatio,
    AA: contrastRatio >= 4.5,
    AAA: contrastRatio >= 7,
    AALarge: contrastRatio >= 3,
  };
};

// Focus Management Utilities
export const focusManagement = {
  // Trap focus within an element
  trapFocus: (element) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  // Restore focus to previous element
  restoreFocus: (previousElement) => {
    if (previousElement && typeof previousElement.focus === 'function') {
      previousElement.focus();
    }
  },

  // Announce to screen readers
  announce: (message, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },
};

// Keyboard Navigation Utilities
export const keyboardNavigation = {
  // Handle arrow key navigation
  handleArrowKeys: (elements, currentIndex, event) => {
    let newIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % elements.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = elements.length - 1;
        break;
      default:
        return currentIndex;
    }
    
    event.preventDefault();
    elements[newIndex].focus();
    return newIndex;
  },

  // Handle escape key
  handleEscape: (callback) => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        callback();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },
};

// Screen Reader Utilities
export const screenReader = {
  // Hide element from screen readers
  hide: (element) => {
    element.setAttribute('aria-hidden', 'true');
  },

  // Show element to screen readers
  show: (element) => {
    element.removeAttribute('aria-hidden');
  },

  // Set accessible name
  setAccessibleName: (element, name) => {
    element.setAttribute('aria-label', name);
  },

  // Set accessible description
  setAccessibleDescription: (element, description) => {
    const descId = `desc-${Math.random().toString(36).substr(2, 9)}`;
    const descElement = document.createElement('div');
    descElement.id = descId;
    descElement.className = 'sr-only';
    descElement.textContent = description;
    
    document.body.appendChild(descElement);
    element.setAttribute('aria-describedby', descId);
    
    return () => {
      document.body.removeChild(descElement);
      element.removeAttribute('aria-describedby');
    };
  },
};

// Accessibility Testing Utilities
export const accessibilityTesting = {
  // Test component accessibility
  testComponent: async (component) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    try {
      // Render component for testing
      const results = await runAccessibilityAudit();
      return results;
    } finally {
      document.body.removeChild(container);
    }
  },

  // Generate accessibility report
  generateReport: (results) => {
    if (!results) return null;

    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      violations: results.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.length,
      })),
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      inapplicable: results.inapplicable.length,
    };

    return report;
  },
};

export default {
  initializeAccessibilityMonitoring,
  initializePerformanceMonitoring,
  runAccessibilityAudit,
  checkColorContrast,
  focusManagement,
  keyboardNavigation,
  screenReader,
  accessibilityTesting,
};

