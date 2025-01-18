
import { HeroUIProvider } from "@heroui/system";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {IntlProvider, MessageFormatElement} from 'react-intl'
import "./globals.css";

export const Provider = ({ messages, children }: { messages?: Record<string, string> | Record<string, MessageFormatElement[]>, children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <IntlProvider defaultLocale="en" locale="en" messages={messages}>
          {children}
        </IntlProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
