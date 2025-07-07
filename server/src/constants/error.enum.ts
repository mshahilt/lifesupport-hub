export enum AuthErrors {
  EMAIL_EXISTS = 'Email already registered',
  INVALID_CREDENTIALS = 'Invalid credentials',
  USER_NOT_FOUND = 'User not found, please create an account',
  WEAK_PASSWORD = 'Password is too small',
}

export enum CategoryErrors {
  CATEGORY_EXISTS = 'Category already exists',
  NAME_EMPTY = 'name is empty',
}