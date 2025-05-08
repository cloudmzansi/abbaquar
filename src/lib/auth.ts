// This is a simple authentication system. In production, use a more secure approach
const ADMIN_PASSWORD = 'admin123'; // Change this to a secure password

export const authenticate = (password: string): boolean => {
    return password === ADMIN_PASSWORD;
};

export const isAuthenticated = (): boolean => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
};

export const login = (): void => {
    localStorage.setItem('isAdminAuthenticated', 'true');
};

export const logout = (): void => {
    localStorage.removeItem('isAdminAuthenticated');
}; 