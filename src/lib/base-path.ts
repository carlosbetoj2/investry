export const APP_BASE_PATH = import.meta.env.PROD ? "/investry" : "";

export function withAppBasePath(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!APP_BASE_PATH) {
    return normalizedPath;
  }

  if (normalizedPath === "/") {
    return `${APP_BASE_PATH}/`;
  }

  return `${APP_BASE_PATH}${normalizedPath}`;
}

export function appHomeHref() {
  return withAppBasePath("/");
}

export function toAppUrl(path = "/") {
  return new URL(withAppBasePath(path), window.location.origin).toString();
}
