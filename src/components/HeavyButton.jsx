import { memo } from 'react';

// 'memo' wraps the component
// It performs a shallow comparison of props: (prevProps, nextProps) => boolean
const HeavyButton = memo(function HeavyButton({ onClick, label }) {

    // This log proves when it renders
    console.log(`Rendering HeavyButton: "${label}" at ${new Date().toLocaleTimeString()}`);

    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200 hover:bg-indigo-100"
        >
            {label}
        </button>
    );
});

export default HeavyButton;