export const ROUTES = {
  home: "/",
  catalog: "/catalog",
  contacts: "/contacts",
  privacyPolicy: "/privacy-policy",
} as const;

export const getDoorRoute = (slug: string) => `${ROUTES.catalog}/${slug}`;
