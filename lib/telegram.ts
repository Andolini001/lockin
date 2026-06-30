type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

type TelegramWebApp = {
  initDataUnsafe?: {
    user?: TelegramUser;
  };
  HapticFeedback?: {
    impactOccurred: (style: "light" | "medium" | "heavy") => void;
  };
  openTelegramLink?: (url: string) => void;
};

type TelegramWindow = Window & {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
};

export function detectTelegramWebApp(): TelegramWebApp | null {
  if (typeof window === "undefined") {
    return null;
  }

  // TODO: when Telegram Mini App SDK is added, replace this with official SDK init.
  return (window as TelegramWindow).Telegram?.WebApp ?? null;
}

export function getTelegramUser(): TelegramUser | null {
  return detectTelegramWebApp()?.initDataUnsafe?.user ?? null;
}

export function hapticFeedback(style: "light" | "medium" | "heavy" = "light"): void {
  detectTelegramWebApp()?.HapticFeedback?.impactOccurred(style);
}

export function shareInvite(inviteCode: string): void {
  const text = encodeURIComponent(
    `Я закрыл день в LOCKIN. Сможешь повторить мой streak? Код: ${inviteCode}`,
  );
  const telegram = detectTelegramWebApp();

  if (telegram?.openTelegramLink) {
    telegram.openTelegramLink(`https://t.me/share/url?url=https://lockin.app&text=${text}`);
    return;
  }

  if (typeof navigator !== "undefined" && navigator.share) {
    void navigator.share({
      title: "LOCKIN",
      text: decodeURIComponent(text),
      url: "https://lockin.app",
    });
  }
}
