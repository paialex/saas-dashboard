export const initialFilterState = {
    searchQuery: '',
    statusFilter: 'all',
    sortBy: 'newest',
    isDirty: false
};

export function dashboardReducer(state, action) {
    switch (action.type) {
        case 'SET_SEARCH':
            return {
                ...state,
                searchQuery: action.payload,
                isDirty: true
            };

        case 'SET_STATUS':
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