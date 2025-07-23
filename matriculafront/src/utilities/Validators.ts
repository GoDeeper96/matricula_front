export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'El usuario es requerido';
  if (!emailRegex.test(email)) return 'Ingresa un usuario válido';
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return 'La contraseña es requerida';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return '';
};