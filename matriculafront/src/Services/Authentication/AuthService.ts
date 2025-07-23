import axios from "axios";

const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL; // ej. http://localhost:8383
const realm = import.meta.env.VITE_KEYCLOAK_REALM;     // ej. matricula
const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;
const clientSecret = import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET;

const tokenEndpoint = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`;

export interface KeycloakTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export const getKeycloakToken = async (
  username: string,
  password: string
): Promise<KeycloakTokenResponse | null> => {
  console.log(clientId)
  console.log(clientSecret)
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "password");
  params.append("client_secret", clientSecret);
  params.append("username", username);
  params.append("password", password);

  try {
    const response = await axios.post<KeycloakTokenResponse>(
      tokenEndpoint,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error al obtener token de Keycloak:", error.response?.data || error);
    return null;
  }
};
