export class FetchDebugger {
  private static calls: Array<{
    timestamp: number;
    caller: string;
    stack: string;
    params?: any;
  }> = [];

  static logFetch(caller: string, params?: any) {
    const stack = new Error().stack || '';
    const timestamp = Date.now();

    this.calls.push({ timestamp, caller, stack, params });

    if (this.calls.length > 200) {
      this.calls.shift();
    }

    const recentCalls = this.calls.filter(
      c => timestamp - c.timestamp < 1000 && c.caller === caller
    );

    if (recentCalls.length > 3) {
      console.warn(`⚠️ Multiple fetches: "${caller}"`, {
        count: recentCalls.length,
        calls: recentCalls
      });
    }

    console.log(`📞 [Fetch] ${caller}`, {
      totalCalls: this.calls.filter(c => c.caller === caller).length,
      recentCalls: recentCalls.length,
      params
    });
  }

  static getReport() {
    const callerStats: Record<string, { count: number; firstCall: number; lastCall: number }> = {};

    this.calls.forEach(call => {
      if (!callerStats[call.caller]) {
        callerStats[call.caller] = {
          count: 0,
          firstCall: call.timestamp,
          lastCall: call.timestamp
        };
      }
      callerStats[call.caller].count++;
      callerStats[call.caller].lastCall = Math.max(callerStats[call.caller].lastCall, call.timestamp);
    });

    return { totalCalls: this.calls.length, callers: callerStats };
  }

  static reset() {
    this.calls = [];
  }
}