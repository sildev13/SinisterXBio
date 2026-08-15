"use client";

import { useEffect, useRef, useState } from "react";

import { Column, IconButton, Input, Row, Text } from "@once-ui-system/core";

import { ai, person } from "@/resources";
import styles from "./AIChat.module.scss";

type Message = {
  role: "user" | "model";
  text: string;
};

const greeting: Message = { role: "model", text: ai.greeting };

/**
 * The bubbles render plain text, so tidy up any markdown the model still
 * reaches for despite being told not to.
 */
function stripMarkdown(text: string) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) =>
      // [/work](/work) collapses to /work, [see my work](/work) keeps both
      label.trim() === href.trim() ? label : `${label} (${href})`,
    )
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|\s)\*([^*\n]+)\*/g, "$1$2")
    .replace(/^#{1,6}\s+/gm, "");
}

export const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the newest message in view as it streams in
  useEffect(() => {
    const node = messagesRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const send = async () => {
    const text = draft.trim();
    if (!text || sending) return;

    const history = [...messages.filter((message) => message !== greeting), { role: "user" as const, text }];

    setMessages((previous) => [...previous, { role: "user", text }, { role: "model", text: "" }]);
    setDraft("");
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message ?? "The assistant is unavailable right now.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        answer += decoder.decode(value, { stream: true });
        setMessages((previous) => {
          const next = [...previous];
          next[next.length - 1] = { role: "model", text: answer };
          return next;
        });
      }

      if (!answer.trim()) {
        throw new Error("The assistant didn't have an answer for that. Try rephrasing?");
      }
    } catch (caught) {
      // Drop the empty placeholder so the panel doesn't show a blank bubble
      setMessages((previous) => {
        const next = [...previous];
        if (next[next.length - 1]?.role === "model" && !next[next.length - 1].text) next.pop();
        return next;
      });
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const reset = () => {
    setMessages([greeting]);
    setError("");
    setDraft("");
  };

  return (
    <>
      {open && (
        <Column
          className={styles.panel}
          background="page"
          border="neutral-alpha-medium"
          radius="l"
          shadow="xl"
          overflow="hidden"
          data-border="rounded"
        >
          <Row
            fillWidth
            paddingX="16"
            paddingY="12"
            gap="8"
            vertical="center"
            horizontal="between"
            borderBottom="neutral-alpha-weak"
          >
            <Row gap="8" vertical="center">
              <Text variant="label-strong-s">{ai.label}</Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {`about ${person.firstName}`}
              </Text>
            </Row>
            <Row gap="4" vertical="center">
              <IconButton
                icon="refresh"
                variant="tertiary"
                size="s"
                tooltip="New chat"
                onClick={reset}
              />
              <IconButton
                icon="close"
                variant="tertiary"
                size="s"
                tooltip="Close"
                onClick={() => setOpen(false)}
              />
            </Row>
          </Row>

          <Column ref={messagesRef} className={styles.messages} fillWidth padding="16" gap="12">
            {messages.map((message, index) => (
              <Row
                key={index}
                fillWidth
                horizontal={message.role === "user" ? "end" : "start"}
              >
                <Column
                  className={styles.bubble}
                  background={message.role === "user" ? "brand-alpha-weak" : "neutral-alpha-weak"}
                  border={
                    message.role === "user" ? "brand-alpha-medium" : "neutral-alpha-medium"
                  }
                  radius="m"
                  paddingX="12"
                  paddingY="8"
                >
                  <Text variant="body-default-s" onBackground="neutral-strong">
                    {message.role === "model"
                      ? stripMarkdown(message.text) ||
                        (sending && index === messages.length - 1 ? "Thinking…" : "")
                      : message.text}
                  </Text>
                </Column>
              </Row>
            ))}
            {error && (
              <Text variant="body-default-xs" onBackground="danger-weak">
                {error}
              </Text>
            )}
          </Column>

          <Row
            fillWidth
            padding="12"
            gap="8"
            vertical="center"
            borderTop="neutral-alpha-weak"
            background="surface"
          >
            <Input
              ref={inputRef}
              id="ai-chat-input"
              label={ai.placeholder}
              height="s"
              value={draft}
              maxLength={1000}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send();
                }
              }}
            />
            <IconButton
              icon="arrowRight"
              variant="primary"
              size="m"
              tooltip="Send"
              disabled={sending || !draft.trim()}
              onClick={() => void send()}
            />
          </Row>
        </Column>
      )}

      <Row className={styles.launcher}>
        <IconButton
          icon={open ? "close" : "sparkle"}
          variant="primary"
          size="l"
          tooltip={open ? "Close assistant" : ai.label}
          tooltipPosition="left"
          aria-label={open ? "Close assistant" : ai.label}
          aria-expanded={open}
          onClick={() => setOpen((previous) => !previous)}
        />
      </Row>
    </>
  );
};
