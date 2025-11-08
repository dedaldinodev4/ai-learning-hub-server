import bcrypt from 'bcrypt'

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
}

export const checkUnEncryptedPasswordIsValid =
  (unEncryptedPassword: string, password: string): boolean => {
    return bcrypt.compareSync(unEncryptedPassword, password);
  }