import React, { useState } from 'react';
import {
  Stack,
  TextField,
  PrimaryButton,
  Text,
  MessageBar,
  MessageBarType,
  IStackTokens,
  ITextFieldStyles,
  mergeStyles
} from '@fluentui/react';

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const stackTokens: IStackTokens = { childrenGap: 20 };
  const fieldStackTokens: IStackTokens = { childrenGap: 15 };

  const textFieldStyles: Partial<ITextFieldStyles> = {
    root: { width: '100%' },
    fieldGroup: { height: 40 }
  };

  const containerClass = mergeStyles({
    maxWidth: 400,
    margin: '0 auto',
    padding: '40px 30px',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e1e1e1'
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('El email es requerido');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Ingresa un email válido');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('La contraseña es requerida');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const value = newValue || '';
    setEmail(value);
    if (emailError) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const value = newValue || '';
    setPassword(value);
    if (passwordError) {
      validatePassword(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);
    setShowSuccess(false);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onLogin) {
        onLogin(email, password);
      }
      
      setShowSuccess(true);
      console.log('Login exitoso:', { email, password });
    } catch (error) {
      console.error('Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={containerClass}>
      <form onSubmit={handleSubmit}>
        <Stack tokens={stackTokens}>
          {/* Header */}
          <Stack horizontalAlign="center" tokens={{ childrenGap: 8 }}>
            <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: '#323130' } }}>
              Iniciar Sesión
            </Text>
            <Text variant="medium" styles={{ root: { color: '#605e5c' } }}>
              Ingresa tus credenciales para acceder
            </Text>
          </Stack>

          {/* Success Message */}
          {showSuccess && (
            <MessageBar
              messageBarType={MessageBarType.success}
              isMultiline={false}
              onDismiss={() => setShowSuccess(false)}
              dismissButtonAriaLabel="Cerrar"
            >
              ¡Login exitoso! Bienvenido de vuelta.
            </MessageBar>
          )}

          {/* Form Fields */}
          <Stack tokens={fieldStackTokens}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              errorMessage={emailError}
              styles={textFieldStyles}
              placeholder="ejemplo@correo.com"
              required
            />

            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => validatePassword(password)}
              errorMessage={passwordError}
              styles={textFieldStyles}
              placeholder="Ingresa tu contraseña"
              canRevealPassword
              revealPasswordAriaLabel="Mostrar contraseña"
              required
            />
          </Stack>

          {/* Submit Button */}
          <PrimaryButton
            text={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            type="submit"
            disabled={isLoading}
            styles={{
              root: {
                height: 44,
                fontSize: 16,
                fontWeight: 600
              }
            }}
          />

          {/* Footer Links */}
          <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }}>
            <Text 
              variant="small" 
              styles={{ 
                root: { 
                  color: '#0078d4', 
                  cursor: 'pointer',
                  textDecoration: 'underline'
                } 
              }}
              onClick={() => console.log('Recuperar contraseña')}
            >
              ¿Olvidaste tu contraseña?
            </Text>
            <Text variant="small" styles={{ root: { color: '#605e5c' } }}>
              ¿No tienes cuenta?{' '}
              <span 
                style={{ 
                  color: '#0078d4', 
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
                onClick={() => console.log('Crear cuenta')}
              >
                Regístrate aquí
              </span>
            </Text>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default LoginForm;