export interface Utilisateur {
  id: number;
  name: string;
  email: string;
  role: 'client' | 'gestionnaire';
}

export interface LoginReponse {
  access_token: string;
  token_type: string;
  user: Utilisateur;
}
