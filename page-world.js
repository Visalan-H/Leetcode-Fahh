const _originalFetch = window.fetch;

window.fetch = async function (...args) {
  const response = await _originalFetch.apply(this, args);

  try {
    const url = typeof args[0] === "string" ? args[0] : args[0]?.url ?? "";

    if (url.includes("/check/")) {
      const cloned = response.clone();
      const data = await cloned.json();

      // Submit fails:  status_code !== 10
      // Run fails:     correct_answer === false
      if (data.state === "SUCCESS") {
        const submitFailed = data.status_code !== undefined && data.status_code !== 10;
        const runFailed = data.correct_answer !== undefined && data.correct_answer === false;

        if (submitFailed || runFailed) {
          window.dispatchEvent(new CustomEvent("leetcode-fah"));
        }
      }
    }
  } catch {
    // ignore Non JSON or irrelevant requests
  }

  return response;
};