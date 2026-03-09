const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Request failed: ${response.status}`);
    }

    return response.json().catch(() => ({}));
}

export const authApi = {
    login: (credentials: any) => apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
};

export const receptionistApi = {
    registerPatient: (patient: any) => apiRequest('/receptionist/register', {
        method: 'POST',
        body: JSON.stringify(patient),
    }),
    getTodaysVisits: () => apiRequest('/receptionist/todays-visits'),
    checkIn: (folderNumber: string) => apiRequest(`/receptionist/check-in/${folderNumber}`, {
        method: 'POST',
    }),
};

export const triageApi = {
    getWaitingPatients: () => apiRequest('/triage/queue'),
    saveVitals: (vitals: any) => apiRequest('/triage/capture-vitals', {
        method: 'POST',
        body: JSON.stringify(vitals),
    }),
};

export const doctorApi = {
    getQueue: () => apiRequest('/doctor/queue'),
    submitConsultation: (data: any) => apiRequest('/doctor/submit', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

export const analyticsApi = {
    getVisitVolume: () => apiRequest('/analytics/visit-volume'),
    getDiseaseStats: () => apiRequest('/analytics/disease-prevalence'),
    getFrequentVisitors: (threshold = 1) => apiRequest(`/analytics/frequent-visitors?threshold=${threshold}`),
};

export const pharmacyApi = {
    getPendingPrescriptions: () => apiRequest('/pharmacy/pending'),
    dispenseMedication: (id: number) => apiRequest(`/pharmacy/dispense/${id}`, { method: 'POST' }),
};

export const labApi = {
    getPendingRequests: () => apiRequest('/lab/pending'),
    submitResult: (id: number, results: string, techName: string) => apiRequest(`/lab/submit-result/${id}?results=${encodeURIComponent(results)}&techName=${encodeURIComponent(techName)}`, { method: 'POST' }),
};

export const cashierApi = {
    getInvoices: () => apiRequest('/cashier/invoices'),
    payInvoice: (id: number, paymentMethod: string) => apiRequest(`/cashier/pay/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ paymentMethod }),
    }),
};

export const historyApi = {
    getRecords: () => apiRequest('/history/records'),
};
