/**
 * Scott's Ice Cream Landing Page - Interactive JavaScript
 *
 * Features:
 * - Intersection Observer for scroll-triggered animations
 * - Smooth scroll behavior for anchor links
 * - Kinetic typography for hero headline
 * - Button morphing states
 * - Mobile menu toggle
 * - Prefers-reduced-motion detection
 * - Performance optimized with requestAnimationFrame
 */

(function() {
  'use strict';

  // ============================================================================
  // Configuration & State
  // ============================================================================

  const CONFIG = {
    INTERSECTION_THRESHOLD: 0.7,
    STAGGER_DELAY: 125,
    ANIMATION_CLASS: 'reveal-active',
    REDUCED_MOTION_CLASS: 'reduced-motion'
  };

  const state = {
    prefersReducedMotion: false,
    observerInitialized: false,
    animationFrame: null
  };

  // ============================================================================
  // Browser Compatibility & Feature Detection
  // ============================================================================

  /**
   * Check if browser supports required features
   * @returns {Object} Feature support status
   */
  function checkBrowserSupport() {
    try {
      return {
        intersectionObserver: 'IntersectionObserver' in window,
        requestAnimationFrame: 'requestAnimationFrame' in window,
        matchMedia: 'matchMedia' in window,
        querySelectorAll: 'querySelectorAll' in document
      };
    } catch (error) {
      console.error('Error checking browser support:', error);
      return {
        intersectionObserver: false,
        requestAnimationFrame: false,
        matchMedia: false,
        querySelectorAll: false
      };
    }
  }

  // ============================================================================
  // Reduced Motion Detection
  // ============================================================================

  /**
   * Detect and respond to prefers-reduced-motion setting
   */
  function detectReducedMotion() {
    const support = checkBrowserSupport();

    if (!support.matchMedia) {
      return;
    }

    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      state.prefersReducedMotion = mediaQuery.matches;

      if (state.prefersReducedMotion) {
        document.documentElement.classList.add(CONFIG.REDUCED_MOTION_CLASS);
      }

      // Listen for changes
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', function(event) {
          state.prefersReducedMotion = event.matches;
          if (event.matches) {
            document.documentElement.classList.add(CONFIG.REDUCED_MOTION_CLASS);
          } else {
            document.documentElement.classList.remove(CONFIG.REDUCED_MOTION_CLASS);
          }
        });
      }
    } catch (error) {
      console.error('Error detecting reduced motion preference:', error);
    }
  }

  // ============================================================================
  // Intersection Observer - Scroll-Triggered Reveals
  // ============================================================================

  /**
   * Initialize Intersection Observer for scroll animations
   */
  function initScrollAnimations() {
    const support = checkBrowserSupport();

    if (!support.intersectionObserver) {
      console.warn('IntersectionObserver not supported. Scroll animations disabled.');
      // Fallback: show all elements immediately
      const elements = document.querySelectorAll('.flavor-card, .info-card, .testimonial-card');
      elements.forEach(function(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
      return;
    }

    try {
      // Set initial state for animated elements
      const animatedElements = document.querySelectorAll('.flavor-card, .info-card, .testimonial-card');

      if (!state.prefersReducedMotion) {
        animatedElements.forEach(function(element) {
          element.style.opacity = '0';
          element.style.transform = 'translateY(30px)';
          element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
      }

      // Create Intersection Observer
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: CONFIG.INTERSECTION_THRESHOLD
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !entry.target.classList.contains(CONFIG.ANIMATION_CLASS)) {
            handleIntersection(entry.target);
          }
        });
      }, observerOptions);

      // Observe all animated elements
      animatedElements.forEach(function(element) {
        observer.observe(element);
      });

      state.observerInitialized = true;
    } catch (error) {
      console.error('Error initializing scroll animations:', error);
    }
  }

  /**
   * Handle element intersection with viewport
   * @param {Element} target - The intersecting element
   */
  function handleIntersection(target) {
    try {
      if (state.prefersReducedMotion) {
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
        target.classList.add(CONFIG.ANIMATION_CLASS);
        return;
      }

      // Get parent container to calculate stagger timing
      const container = target.closest('.flavors-grid, .info-grid, .testimonials-grid');

      if (container) {
        const siblings = Array.from(container.children);
        const index = siblings.indexOf(target);
        const delay = index * CONFIG.STAGGER_DELAY;

        setTimeout(function() {
          if (checkBrowserSupport().requestAnimationFrame) {
            requestAnimationFrame(function() {
              target.style.opacity = '1';
              target.style.transform = 'translateY(0)';
              target.classList.add(CONFIG.ANIMATION_CLASS);
            });
          } else {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
            target.classList.add(CONFIG.ANIMATION_CLASS);
          }
        }, delay);
      } else {
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
        target.classList.add(CONFIG.ANIMATION_CLASS);
      }
    } catch (error) {
      console.error('Error handling intersection:', error);
      // Fallback: show element immediately
      target.style.opacity = '1';
      target.style.transform = 'translateY(0)';
    }
  }

  // ============================================================================
  // Kinetic Typography - Hero Headline Animation
  // ============================================================================

  /**
   * Animate hero headline with letter-by-letter reveal
   */
  function initKineticTypography() {
    if (state.prefersReducedMotion) {
      return;
    }

    try {
      const heroTitle = document.querySelector('.hero-content h1');

      if (!heroTitle) {
        return;
      }

      const originalText = heroTitle.textContent;
      heroTitle.textContent = '';
      heroTitle.setAttribute('aria-label', originalText);

      const letters = originalText.split('');
      const fragment = document.createDocumentFragment();

      letters.forEach(function(letter, index) {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.setAttribute('aria-hidden', 'true');

        if (letter === ' ') {
          span.style.width = '0.3em';
        }

        fragment.appendChild(span);
      });

      heroTitle.appendChild(fragment);

      // Animate letters
      const letterElements = heroTitle.querySelectorAll('span');
      letterElements.forEach(function(letter, index) {
        setTimeout(function() {
          if (checkBrowserSupport().requestAnimationFrame) {
            requestAnimationFrame(function() {
              letter.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
              letter.style.opacity = '1';
              letter.style.transform = 'translateY(0)';
            });
          } else {
            letter.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
          }
        }, index * 50);
      });
    } catch (error) {
      console.error('Error initializing kinetic typography:', error);
    }
  }

  // ============================================================================
  // Smooth Scroll - Anchor Links
  // ============================================================================

  /**
   * Initialize smooth scrolling for anchor links
   */
  function initSmoothScroll() {
    try {
      const anchorLinks = document.querySelectorAll('a[href^="#"]');

      anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
          const href = this.getAttribute('href');

          // Skip empty or invalid anchors
          if (!href || href === '#' || href.length <= 1) {
            return;
          }

          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            event.preventDefault();

            try {
              if ('scrollIntoView' in targetElement) {
                targetElement.scrollIntoView({
                  behavior: state.prefersReducedMotion ? 'auto' : 'smooth',
                  block: 'start'
                });

                // Update focus for accessibility
                if (targetElement.hasAttribute('tabindex')) {
                  targetElement.focus();
                } else {
                  targetElement.setAttribute('tabindex', '-1');
                  targetElement.focus();
                  targetElement.addEventListener('blur', function() {
                    this.removeAttribute('tabindex');
                  }, { once: true });
                }

                // Update URL without triggering scroll
                if (window.history && window.history.pushState) {
                  window.history.pushState(null, '', href);
                }
              } else {
                // Fallback for old browsers
                window.location.hash = href;
              }
            } catch (error) {
              console.error('Error during smooth scroll:', error);
              window.location.hash = href;
            }
          }
        });
      });
    } catch (error) {
      console.error('Error initializing smooth scroll:', error);
    }
  }

  // ============================================================================
  // Button Morphing States
  // ============================================================================

  /**
   * Initialize interactive button states
   */
  function initButtonMorphing() {
    try {
      const ctaButtons = document.querySelectorAll('.cta-button');

      ctaButtons.forEach(function(button) {
        // Mouse enter
        button.addEventListener('mouseenter', function() {
          if (!state.prefersReducedMotion) {
            this.classList.add('button-hover');
          }
        });

        // Mouse leave
        button.addEventListener('mouseleave', function() {
          this.classList.remove('button-hover');
        });

        // Focus
        button.addEventListener('focus', function() {
          if (!state.prefersReducedMotion) {
            this.classList.add('button-focus');
          }
        });

        // Blur
        button.addEventListener('blur', function() {
          this.classList.remove('button-focus');
        });

        // Click animation
        button.addEventListener('click', function() {
          if (!state.prefersReducedMotion) {
            this.classList.add('button-clicked');

            setTimeout(function() {
              button.classList.remove('button-clicked');
            }, 300);
          }
        });
      });
    } catch (error) {
      console.error('Error initializing button morphing:', error);
    }
  }

  // ============================================================================
  // Mobile Menu Toggle
  // ============================================================================

  /**
   * Initialize mobile menu functionality
   * Note: This is prepared for future hamburger menu implementation
   */
  function initMobileMenu() {
    try {
      const hamburgerButton = document.querySelector('.hamburger-button');
      const mobileNav = document.querySelector('nav ul');

      // Only initialize if hamburger button exists
      if (!hamburgerButton || !mobileNav) {
        return;
      }

      // Set initial ARIA attributes
      hamburgerButton.setAttribute('aria-expanded', 'false');
      hamburgerButton.setAttribute('aria-controls', 'mobile-menu');
      mobileNav.id = 'mobile-menu';

      // Toggle menu on click
      hamburgerButton.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        this.setAttribute('aria-expanded', !isExpanded);
        this.classList.toggle('active');
        mobileNav.classList.toggle('mobile-nav-open');

        // Trap focus in menu when open
        if (!isExpanded) {
          trapFocus(mobileNav);
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';

          if (isExpanded) {
            hamburgerButton.setAttribute('aria-expanded', 'false');
            hamburgerButton.classList.remove('active');
            mobileNav.classList.remove('mobile-nav-open');
            hamburgerButton.focus();
          }
        }
      });

      // Close menu when clicking nav links
      const navLinks = mobileNav.querySelectorAll('a');
      navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          hamburgerButton.setAttribute('aria-expanded', 'false');
          hamburgerButton.classList.remove('active');
          mobileNav.classList.remove('mobile-nav-open');
        });
      });
    } catch (error) {
      console.error('Error initializing mobile menu:', error);
    }
  }

  /**
   * Trap focus within an element
   * @param {Element} element - Container element to trap focus in
   */
  function trapFocus(element) {
    try {
      const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      element.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      });
    } catch (error) {
      console.error('Error trapping focus:', error);
    }
  }

  // ============================================================================
  // Performance Monitoring
  // ============================================================================

  /**
   * Log performance metrics (development only)
   */
  function logPerformanceMetrics() {
    if (!window.performance || !window.performance.measure) {
      return;
    }

    try {
      if (performance.getEntriesByType) {
        const navigationTiming = performance.getEntriesByType('navigation')[0];

        if (navigationTiming) {
          const domContentLoaded = navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart;
          const loadComplete = navigationTiming.loadEventEnd - navigationTiming.loadEventStart;

          console.log('Performance Metrics:');
          console.log('- DOM Content Loaded:', Math.round(domContentLoaded), 'ms');
          console.log('- Load Complete:', Math.round(loadComplete), 'ms');
        }
      }
    } catch (error) {
      // Silent fail for performance logging
    }
  }

  // ============================================================================
  // Error Boundary
  // ============================================================================

  /**
   * Global error handler
   */
  function initErrorHandling() {
    window.addEventListener('error', function(event) {
      console.error('Global error caught:', event.error);
      // Prevent errors from breaking user experience
      event.preventDefault();
    });

    window.addEventListener('unhandledrejection', function(event) {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    });
  }

  // ============================================================================
  // Initialization
  // ============================================================================

  /**
   * Initialize all features when DOM is ready
   */
  function init() {
    try {
      // Check browser support
      const support = checkBrowserSupport();

      if (!support.querySelectorAll) {
        console.error('Browser does not support required features');
        return;
      }

      // Initialize error handling first
      initErrorHandling();

      // Detect reduced motion preference
      detectReducedMotion();

      // Initialize features
      initScrollAnimations();
      initKineticTypography();
      initSmoothScroll();
      initButtonMorphing();
      initMobileMenu();

      // Log performance metrics
      logPerformanceMetrics();

      console.log('Scott\'s Ice Cream interactive features initialized successfully');
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  // ============================================================================
  // DOM Ready Detection
  // ============================================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already ready
    init();
  }

  // Clean up on page unload
  window.addEventListener('beforeunload', function() {
    if (state.animationFrame) {
      cancelAnimationFrame(state.animationFrame);
    }
  });

})();
