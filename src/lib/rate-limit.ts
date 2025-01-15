interface RateLimitOptions {
  interval: number;  // Time window in milliseconds
  maxRequests: number;  // Maximum number of requests allowed in the interval
}

interface RateLimiter {
  tryRequest: () => boolean;
  reset: () => void;
}

interface RequestRecord {
  timestamp: number;
}

export function rateLimit({ interval, maxRequests }: RateLimitOptions): RateLimiter {
  const requests: RequestRecord[] = [];

  const cleanup = () => {
    const now = Date.now();
    const cutoff = now - interval;
    while (requests.length > 0 && requests[0].timestamp < cutoff) {
      requests.shift();
    }
  };

  return {
    tryRequest: () => {
      cleanup();
      if (requests.length >= maxRequests) {
        return false;
      }
      requests.push({ timestamp: Date.now() });
      return true;
    },
    reset: () => {
      requests.length = 0;
    },
  };
}
