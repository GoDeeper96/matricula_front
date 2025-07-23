import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Stack,
  TextField,
  PrimaryButton,
  Text,
  MessageBar,
  MessageBarType,

} from '@fluentui/react';
import { ResizableSplit, ResizablePane } from '../../Components/ResizableSplit';
import { fieldStackTokens, formCardClass, formContainerClass, stackTokens, textFieldStyles } from './LoginStyles';
import LeftSectionImage from './Components/LeftSectionImage';
import { useLogin } from '../../hooks/Auth/useLogin';
import { validatePassword } from '../../utilities/Validators';
import { PrivateRoutes } from '../../routes/PrivateRoutes/Private';
import { useAuthStore } from '../../hooks/Auth/useAuthContext';

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const {
    login,
    isLoading,
    loginError,
    showSuccess,
    isAuthenticated,
    setShowSuccess
  } = useAuthStore();
 const handleEmailChange = (
  event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  newValue?: string
) => {
  const value = newValue || '';
  setEmail(value);
  // const error = validateEmail(value);
  // setEmailError(error);
};

const handlePasswordChange = (
  event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  newValue?: string
) => {
  const value = newValue || '';
  setPassword(value);
  const error = validatePassword(value);
  setPasswordError(error);
};

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  console.log('qwdqwdqwdqw')
  const emailErrorMsg = ''
  const passwordErrorMsg = validatePassword(password);
  setEmailError(emailErrorMsg);
  setPasswordError(passwordErrorMsg);
  console.log(emailErrorMsg)
  console.log(passwordErrorMsg)
  if (emailErrorMsg || passwordErrorMsg) return;

  const success = await login(email, password);
if (success) {
      navigate(PrivateRoutes.PORTAL_GENERAL); // <-- Redirección aquí
      return;
    }

    setPasswordError("Credenciales inválidas");

};

  const handleResize = (leftWidth: number) => {
    console.log(`Panel izquierdo: ${leftWidth.toFixed(1)}%, Panel derecho: ${(100 - leftWidth).toFixed(1)}%`);
  };
  if(isAuthenticated)
  {
    return <Navigate to={PrivateRoutes.PORTAL_GENERAL}/>
  }
  return (
    <ResizableSplit
      initialLeftWidth={60}
      minLeftWidth={25}
      maxLeftWidth={75}
      onResize={handleResize}
    >
      {/* Panel de imagen */}
      <LeftSectionImage />

      {/* Panel del formulario */}
      <ResizablePane>
        <div className={formContainerClass}>
          <div className={formCardClass}>
            <form onSubmit={handleSubmit}>
              <Stack tokens={stackTokens}>
                {/* Header */}
                <Stack horizontalAlign="center" tokens={{ childrenGap: 8 }}>
                  <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: '#323130' } }}>
                    Iniciar Sesión
                  </Text>
                  <Text variant="small" styles={{ root: { color: '#605e5c', textAlign: 'center' } }}>
                    Ingresa tus credenciales
                  </Text>
                </Stack>

                {/* Mensajes */}
                {showSuccess && (
                  <MessageBar
                    messageBarType={MessageBarType.success}
                    isMultiline={false}
                    onDismiss={() => setShowSuccess(false)}
                    dismissButtonAriaLabel="Cerrar"
                  >
                    ¡Login exitoso!
                  </MessageBar>
                )}

                {loginError && (
                  <MessageBar
                    messageBarType={MessageBarType.error}
                    isMultiline={false}
                    dismissButtonAriaLabel="Cerrar"
                  >
                    {loginError}
                  </MessageBar>
                )}

                {/* Formulario */}
                <Stack tokens={fieldStackTokens}>
                  <TextField
                    label="Usuario"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    // onBlur={() => validateEmail(email)}
                    errorMessage={emailError}
                    styles={textFieldStyles}
                    placeholder="Tu usuario"
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
                    placeholder="Tu contraseña"
                    canRevealPassword
                    revealPasswordAriaLabel="Mostrar contraseña"
                    required
                  />
                </Stack>

                {/* Botón de envío */}
                <PrimaryButton
                  text={isLoading ? "Iniciando..." : "Iniciar Sesión"}
                  type="submit"
                  disabled={isLoading}
                  styles={{
                    root: {
                      height: 40,
                      fontSize: 14,
                      fontWeight: 600,
                      borderRadius: 4
                    }
                  }}
                />

                {/* Footer Links */}
                <Stack horizontalAlign="center" tokens={{ childrenGap: 8 }}>
                  <Text
                    variant="small"
                    styles={{
                      root: {
                        color: '#0078d4',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontSize: '12px'
                      }
                    }}
                    onClick={() => console.log('Recuperar contraseña')}
                  >
                    ¿Olvidaste tu contraseña?
                  </Text>
                  <Text variant="small" styles={{ root: { color: '#605e5c', textAlign: 'center', fontSize: '12px' } }}>
                    ¿No tienes cuenta?{' '}
                    <span
                      style={{
                        color: '#0078d4',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                      onClick={() => console.log('Crear cuenta')}
                    >
                      Regístrate
                    </span>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </div>
        </div>
      </ResizablePane>
    </ResizableSplit>
  );
};

export default LoginForm;
