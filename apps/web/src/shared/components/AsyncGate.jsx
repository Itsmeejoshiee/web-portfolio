export function AsyncGate({ loading, error, loadingLabel = 'Loading…', errorLabel, children }) {
  if (loading) {
    return <p className="px-6 py-12 text-center font-mono text-sm text-faint">{loadingLabel}</p>;
  }
  if (error) {
    return (
      <p className="px-6 py-12 text-center font-mono text-sm text-faint">
        {errorLabel ?? "Couldn't load this — check the API is running."}
      </p>
    );
  }
  return children;
}
