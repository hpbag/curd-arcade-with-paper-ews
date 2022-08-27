import { useSDK } from "@thirdweb-dev/react";

export default function useAuthenticate() {
  const domain = "curdinc.com";
  const sdk = useSDK();

  async function login() {
    const payload = await sdk?.auth.login(domain);
    const result = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });
    if (!result.ok) {
      return result.text();
    }
    return result.json();
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
