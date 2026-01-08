/**
 * AJ+ State Management
 * Central store for all application data.
 */

export const state = {
    // CONFIG: REPLACE THIS WITH YOUR NEW DEPLOYMENT URL
    apiUrl: "https://script.google.com/macros/s/AKfycbx-vAlQvmM_P1gZv1XdiNVQwi2RFqd-7riRrM8JpBsiMOM00D2Q5o9WOmpzcrHfjBmb5Q/exec",

    // Data Stores
    transactions: [],
    bills: [],
    shoppingList: [],
    goals: [],

    user: { name: 'Dr. A' },
    mobileLayout: localStorage.getItem('mobileLayout') || 'bar', // 'bar', 'side', 'tabs'

    // UI State
    currentView: 'dashboard',
    isLoading: false,

    // Helpers
    setLoading(loading) {
        this.isLoading = loading;
        const main = document.getElementById('main-view');
        if (main) {
            if (loading) {
                main.style.opacity = '0.5';
                main.style.pointerEvents = 'none';
            } else {
                main.style.opacity = '1';
                main.style.pointerEvents = 'all';
            }
        }
    }
};

