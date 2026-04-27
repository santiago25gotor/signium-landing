// Wrapper de fetch que adjunta el ID token de Firebase automáticamente
// en Authorization: Bearer. Solo para endpoints protegidos con @require_auth.

import { getFirebaseAuth, API_URL } from "./firebase";

const TIMEOUT_MS = 15_000; // 15 s — si Railway tarda más, algo va mal

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function getIdToken(): Promise<string> {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new ApiError(401, "No autenticado");
  // forceRefresh=false: usa el token en caché si no ha expirado (~1 h)
  return await user.getIdToken(false);
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const { auth = true, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  if (auth) {
    finalHeaders["Authorization"] = `Bearer ${await getIdToken()}`;
  }

  // Timeout manual con AbortController para no quedarse colgado
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers: finalHeaders,
      signal:  controller.signal,
    });
    clearTimeout(timer);

    let data: any = null;
    try { data = await res.json(); } catch { /* sin body JSON */ }

    if (!res.ok) {
      throw new ApiError(res.status, data?.message ?? `Error ${res.status}`);
    }
    return data as T;

  } catch (err: any) {
    clearTimeout(timer);

    if (err instanceof ApiError) throw err;

    // AbortError = timeout superado
    if (err?.name === "AbortError") {
      throw new ApiError(0, "El servidor tardó demasiado. Comprueba tu conexión.");
    }

    // TypeError: Failed to fetch = backend inaccesible (URL mal, sin CORS, sin red)
    if (err instanceof TypeError) {
      throw new ApiError(
        0,
        `No se pudo conectar con el backend (${API_URL}). ` +
        "Comprueba que NEXT_PUBLIC_API_URL apunta a tu URL de Railway.",
      );
    }

    throw new ApiError(0, err?.message ?? "Error de red desconocido.");
  }
}
