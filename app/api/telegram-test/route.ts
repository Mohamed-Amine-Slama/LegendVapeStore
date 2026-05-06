import { NextResponse } from "next/server";

import { discoverChats, pingDiagnostic } from "@/lib/telegram-server";

/**
 * Diagnostic-only endpoint for Telegram bot setup.
 *
 *   - If TELEGRAM_BOT_TOKEN is set but TELEGRAM_CHAT_ID is not,
 *     this lists every chat the bot has heard from (via getUpdates)
 *     so the owner can copy the right chat_id into env.
 *   - Once both are set, it sends a one-line ping to confirm the
 *     bot can deliver to that chat.
 *
 * Disabled in production to avoid leaking the bot token's chat list.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { ok: false, error: "Diagnostic disabled in production." },
      { status: 404 },
    );
  }

  // Pass `?discover=1` to force chat-id discovery even when
  // TELEGRAM_CHAT_ID is already set (useful when re-pointing the bot
  // at a different chat — e.g. switching from a personal chat to a
  // group without temporarily clearing the env var).
  const url = new URL(req.url);
  const forceDiscover = url.searchParams.get("discover") === "1";
  const chatIdSet =
    !forceDiscover && Boolean((process.env.TELEGRAM_CHAT_ID ?? "").trim());

  if (!chatIdSet) {
    const out = await discoverChats();
    return NextResponse.json({
      step: "discover-chat-id",
      ok: out.ok,
      chats: out.chats,
      detail: out.detail ?? null,
      hint:
        out.hint ??
        "Set TELEGRAM_BOT_TOKEN, then send /start to your bot in Telegram and refresh this URL.",
      next: out.chats.length
        ? `Paste TELEGRAM_CHAT_ID=${out.chats[0].id} into vape-store-vitrine/.env.local, restart the dev server, then refresh this URL to send a test message.`
        : null,
    });
  }

  const ping = await pingDiagnostic();
  return NextResponse.json({
    step: "send-test-message",
    ok: ping.ok,
    chatId: ping.chatId,
    detail: ping.detail ?? null,
    hint: ping.ok
      ? "Check your Telegram — the diagnostic ping should be in the chat with your bot."
      : "Send failed. Common causes: (1) chat_id wrong (re-run discovery: clear TELEGRAM_CHAT_ID and refresh), (2) bot was never started by the user/group (open the bot and send /start), (3) bot token revoked.",
  });
}
