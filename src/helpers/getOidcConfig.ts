export const oidcEnabled = process.env.NEXT_PUBLIC_USE_OIDC === 'true'
export const oidcButtonLabel =
  process.env.NEXT_PUBLIC_OIDC_BUTTON_LABEL || 'Login with SSO'
