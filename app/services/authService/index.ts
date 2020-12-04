class AuthService {
  public CUSTOMER_AUTH_TOKEN_KEY = "auth-token";
  public SPECIALIST_AUTH_TOKEN_KEY = "specialist-auth-token";
  public ADMIN_AUTH_TOKEN_KEY = "boss-auth-token";

  storeCustomerToken(token: string) {
    window.localStorage.setItem(this.CUSTOMER_AUTH_TOKEN_KEY, token);
  }

  getCustomerToken(): string | null {
    return window.localStorage.getItem(this.CUSTOMER_AUTH_TOKEN_KEY);
  }

  removeCustomerToken() {
    window.localStorage.removeItem(this.CUSTOMER_AUTH_TOKEN_KEY);
  }

  storeSpecialistToken(token: string) {
    window.localStorage.setItem(this.SPECIALIST_AUTH_TOKEN_KEY, token);
  }

  getSpecialistToken(): string | null {
    return window.localStorage.getItem(this.SPECIALIST_AUTH_TOKEN_KEY);
  }

  removeSpecialistToken() {
    window.localStorage.removeItem(this.SPECIALIST_AUTH_TOKEN_KEY);
  }

  storeAdminToken(token: string) {
    window.localStorage.setItem(this.ADMIN_AUTH_TOKEN_KEY, token);
  }

  getAdminToken(): string | null {
    return window.localStorage.getItem(this.ADMIN_AUTH_TOKEN_KEY);
  }

  removeAdminToken() {
    return window.localStorage.removeItem(this.ADMIN_AUTH_TOKEN_KEY);
  }

  getCurrentAuthToken(): string | null {
    return this.getCustomerToken() || this.getSpecialistToken();
  }

  public logout() {
    this.removeCustomerToken();
    this.removeAdminToken();
    this.removeSpecialistToken();
  }
}

export default new AuthService();
