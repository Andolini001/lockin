export const LOCKIN_SHARE_TEXT = "Я закрыл день в LOCKIN. Сможешь повторить мой streak?";

export function buildSquadInviteText(inviteCode: string) {
  return `${LOCKIN_SHARE_TEXT}\nВступай в мой squad: ${inviteCode}`;
}
