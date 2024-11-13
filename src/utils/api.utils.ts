
export function setPolling<T>(
  apiCall: () => Promise<T>,
  callback: (result: T) => void,
  timeoutMs = 1000,
  errorCallback?: () => void,
): () => void {
  let apiRequestPollingTimeout: NodeJS.Timeout;
  let isCancelled = false;

  async function runApiCall() {
    try {
      const result = await apiCall();

      callback(result);
    } catch (error) {
      if (errorCallback) {
        errorCallback();
      }
    }
  }

  async function triggerRequest() {
    if (isCancelled) {
      return;
    }

    await runApiCall();

    apiRequestPollingTimeout = setTimeout(triggerRequest, timeoutMs);
  }

  triggerRequest();

  return () => {
    isCancelled = true;

    clearTimeout(apiRequestPollingTimeout);
  };
}
