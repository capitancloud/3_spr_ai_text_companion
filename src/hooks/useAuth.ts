import { useState, useEffect, useCallback } from 'react';

// SHA-256 hash del codice corretto (pre-calcolato)
// Codice originale: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
const CORRECT_CODE_HASH = '8f9b5c3a2d1e4f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a';

// Funzione per calcolare l'hash SHA-256
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Hash pre-calcolato del codice corretto
// Per generarlo: console.log(await sha256("gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E"))
const STORED_HASH = "a1b2c3d4e5f6"; // Placeholder - verrà calcolato dinamicamente al primo avvio

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [correctHash, setCorrectHash] = useState<string>('');

  // Calcola l'hash del codice corretto all'avvio
  useEffect(() => {
    const initHash = async () => {
      const hash = await sha256("gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E");
      setCorrectHash(hash);
    };
    initHash();
  }, []);

  // Controlla se l'utente è già autenticato
  useEffect(() => {
    const checkAuth = () => {
      const authToken = sessionStorage.getItem('edu_auth_token');
      if (authToken && correctHash && authToken === correctHash) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    
    if (correctHash) {
      checkAuth();
    }
  }, [correctHash]);

  const login = useCallback(async (code: string): Promise<{ success: boolean; error?: string }> => {
    if (!code.trim()) {
      return { success: false, error: 'Inserisci il codice di accesso' };
    }

    try {
      const inputHash = await sha256(code);
      
      if (inputHash === correctHash) {
        sessionStorage.setItem('edu_auth_token', inputHash);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: 'Codice di accesso non valido' };
      }
    } catch (error) {
      return { success: false, error: 'Errore durante la verifica' };
    }
  }, [correctHash]);

  const logout = useCallback(() => {
    sessionStorage.removeItem('edu_auth_token');
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}
