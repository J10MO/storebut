export class PerformanceMonitor {
  private static timers: Map<string, number> = new Map();
  private static metrics: Array<{
    label: string;
    duration: number;
    timestamp: number;
  }> = [];

  static start(label: string) {
    this.timers.set(label, performance.now());
    console.log(`⏱️ [Performance] Started: ${label}`);
  }

  static end(label: string) {
    const startTime = this.timers.get(label);
    if (!startTime) return;

    const duration = performance.now() - startTime;
    this.timers.delete(label);

    this.metrics.push({ label, duration, timestamp: Date.now() });

    if (this.metrics.length > 100) {
      this.metrics.shift();
    }

    const emoji = duration < 100 ? '🚀' : duration < 500 ? '⚡' : '🐌';
    console.log(`${emoji} [Performance] ${label}: ${duration.toFixed(2)}ms`);

    if (duration > 1000) {
      console.warn(`⚠️ Slow: ${label} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  static report() {
    const report: Record<string, { count: number; avg: number; min: number; max: number }> = {};

    this.metrics.forEach(m => {
      if (!report[m.label]) {
        report[m.label] = { count: 0, avg: 0, min: Infinity, max: 0 };
      }
      report[m.label].count++;
      report[m.label].min = Math.min(report[m.label].min, m.duration);
      report[m.label].max = Math.max(report[m.label].max, m.duration);
    });

    Object.keys(report).forEach(label => {
      const metrics = this.metrics.filter(m => m.label === label);
      const total = metrics.reduce((sum, m) => sum + m.duration, 0);
      report[label].avg = total / metrics.length;
    });

    console.table(report);
    return report;
  }

  static reset() {
    this.timers.clear();
    this.metrics = [];
  }
}