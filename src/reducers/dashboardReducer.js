export const initialFilterState = {
    nameFilter: '',
    emailFilter: '',
    companyFilter: '',
    cityFilter: '',
    isDirty: false
};

export function dashboardReducer(state, action) {
    switch (action.type) {
        case 'SET_NAME_FILTER':
            return { ...state, nameFilter: action.payload, isDirty: true };
        case 'SET_EMAIL_FILTER':
            return { ...state, emailFilter: action.payload, isDirty: true };
        case 'SET_COMPANY_FILTER':
            return { ...state, companyFilter: action.payload, isDirty: true };
        case 'SET_CITY_FILTER':
            return { ...state, cityFilter: action.payload, isDirty: true };
        case 'RESET':
            return initialFilterState;
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}