import { defineStore } from 'pinia';
import type { AuthModel } from 'pocketbase';

interface AuthUser {
    id: string;
    email: string;
    name?: string;
    verified: boolean;
}

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
        isAuthenticated: false,
    }),

    getters: {
        currentUser: state => state.user,
        isLoggedIn: state => state.isAuthenticated && Boolean(state.user),
    },

    actions: {
        async login(email: string, password: string) {
            try {
                const pb = usePocketBase();
                const authData = await pb.collection('users').authWithPassword(email, password);

                this.setAuth(authData);
                return { success: true };
            }
            catch (error: any) {
                console.error('Login error:', error);
                return {
                    success: false,
                    error: error?.message || 'Login failed',
                };
            }
        },

        async register(email: string, password: string, passwordConfirm: string, name: string) {
            try {
                const pb = usePocketBase();

                // Create the user
                const userData = {
                    email,
                    password,
                    passwordConfirm,
                    name,
                };

                await pb.collection('users').create(userData);

                // Send verification email
                await pb.collection('users').requestVerification(email);

                // Auto-login after registration
                const authData = await pb.collection('users').authWithPassword(email, password);
                this.setAuth(authData);

                return { success: true };
            }
            catch (error: any) {
                console.error('Registration error:', error);
                return {
                    success: false,
                    error: error?.message || 'Registration failed',
                };
            }
        },

        async logout() {
            try {
                const pb = usePocketBase();
                pb.authStore.clear();
                this.clearAuth();
                return { success: true };
            }
            catch (error: any) {
                console.error('Logout error:', error);
                return {
                    success: false,
                    error: error?.message || 'Logout failed',
                };
            }
        },

        async refreshAuth() {
            try {
                const pb = usePocketBase();
                if (pb.authStore.isValid) {
                    await pb.collection('users').authRefresh();
                    this.setAuth({
                        token: pb.authStore.token,
                        record: pb.authStore.record as AuthModel,
                    });
                    return { success: true };
                }
                return { success: false, error: 'No valid token' };
            }
            catch (error: any) {
                console.error('Auth refresh error:', error);
                this.clearAuth();
                return {
                    success: false,
                    error: error?.message || 'Auth refresh failed',
                };
            }
        },

        setAuth(authData: { token: string; record: AuthModel }) {
            this.token = authData.token;
            this.user = {
                id: authData.record.id,
                email: authData.record.email,
                name: authData.record.name,
                verified: authData.record.verified,
            };
            this.isAuthenticated = true;
        },

        clearAuth() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
        },

        async initializeAuth() {
            try {
                const pb = usePocketBase();
                if (pb.authStore.isValid) {
                    this.setAuth({
                        token: pb.authStore.token,
                        record: pb.authStore.record as AuthModel,
                    });
                    // Try to refresh to ensure token is still valid
                    await this.refreshAuth();
                }
            }
            catch (error) {
                console.error('Auth initialization error:', error);
                this.clearAuth();
            }
        },
    },

    persist: {
        key: 'auth-store',
    },
});
