import { ThemeSupa } from "@supabase/auth-ui-shared"
import type { Provider } from "@supabase/supabase-js"

export const oauthProviders = [] as Provider[]

// use the css variables from DaisyUI to style Supabase auth template
export const sharedAppearance = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brand: "oklch(var(--p))",
        brandAccent: "oklch(var(--p))",
        brandButtonText: "oklch(var(--pc))",
        defaultButtonBackground: "oklch(var(--p))",
        defaultButtonBackgroundHover: "oklch(var(--p))",
        defaultButtonBorder: 'transparent',
        defaultButtonText: "oklch(var(--pc))",
        dividerBackground: "oklch(var(--n))",
        inputBackground: 'transparent',
        inputBorder: "oklch(var(--n))",
        inputBorderHover: "oklch(var(--nc))",
        inputBorderFocus: "oklch(var(--nc))",
        inputText: "oklch(var(--bc))",
        inputLabelText: "oklch(var(--bc))",
        inputPlaceholder: "oklch(var(--n))",
        messageText: "oklch(var(--suc))",
        messageTextDanger: "oklch(var(--erc))",
        anchorTextColor: "oklch(var(--bc))",
        anchorTextHoverColor: "oklch(var(--bc))",
      },
      fontSizes: {
        baseInputSize: "16px",
      },
    },
  },
  className: {
    button: "authBtn",
  },
}
