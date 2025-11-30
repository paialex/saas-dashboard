// 1. Define the specific shape of your state
export const initialFilterState = {
    searchQuery: '',
    statusFilter: 'all', // 'all' | 'active' | 'inactive'
    sortBy: 'newest',    // 'newest' | 'oldest'
    isDirty: false       // Track if filters have changed from default
};

// 2. The Reducer Function
// This is a PURE function. It takes (OldState, Action) -> NewState
export function dashboardReducer(state, action) {
    switch (action.type) {
        case 'SET_SEARCH':
            return {
                ...state,
                searchQuery: action.payload,
                isDirty: true
            };

        case 'SET_STATUS':
            // Business Logic: If status is 'inactive', force sort to 'oldest'
            if (action.payload === 'inactive') {
                return {
                    ...state,
                    statusFilter: action.payload,
                    sortBy: 'oldest',
                    isDirty: true
                };
            }
            return {
                ...state,
                statusFilter: action.payload,
                isDirty: true
            };

        case 'RESET':
            return initialFilterState;

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}