class AuthService {
  public STUDENT_AUTH_TOKEN_KEY = 'auth-token';
  public INSTRUCTOR_AUTH_TOKEN_KEY = 'author-auth-token';
  public ADMIN_AUTH_TOKEN_KEY = 'boss-auth-token';

  storeStudentToken(token: string) {
    window.localStorage.setItem(this.STUDENT_AUTH_TOKEN_KEY, token);
  }

  getStudentToken(): string | null {
    return window.localStorage.getItem(this.STUDENT_AUTH_TOKEN_KEY);
  }

  removeStudentToken() {
    window.localStorage.removeItem(this.STUDENT_AUTH_TOKEN_KEY);
  }

  storeInstructorToken(token: string) {
    window.localStorage.setItem(this.INSTRUCTOR_AUTH_TOKEN_KEY, token);
  }

  getInstructorToken(): string | null {
    return window.localStorage.getItem(this.INSTRUCTOR_AUTH_TOKEN_KEY);
  }

  removeInstructorToken() {
    window.localStorage.removeItem(this.INSTRUCTOR_AUTH_TOKEN_KEY);
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
    return this.getStudentToken() || this.getInstructorToken();
  }

  public logout() {
    console.log('Remiving...');
    this.removeStudentToken();
    this.removeAdminToken();
    this.removeInstructorToken();
  }
}

export default new AuthService();
