import { useSDK } from "@thirdweb-dev/react";

export default function useAuthenticate() {
  const domain = "curdinc.com";
  const sdk = useSDK();

  async function login() {
    const payload = await sdk?.auth.login(domain);
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });
  }

  async function authenticate() {
    return fetch("/api/authenticate", {
      method: "POST",
    });
  }

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });
  }

  return {
    login,
    authenticate,
    logout,
  };
}
