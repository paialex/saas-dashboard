import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // 1. Update state so next render shows fallback
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    // 2. Log the error (e.g., to Sentry/Datadog)
    componentDidCatch(error, errorInfo) {
        console.error("🔥 UI CRASH:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center">
                    <h2 className="text-xl font-bold text-red-700 mb-2">Something went wrong</h2>
                    <p className="text-red-600 mb-4">We're sorry, but the dashboard encountered an unexpected error.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Reload Application
                    </button>

                    {/* Only show technical details in Dev */}
                    <details className="mt-4 text-left text-xs text-red-800 font-mono bg-red-100 p-2 rounded">
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;