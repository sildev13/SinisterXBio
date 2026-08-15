"use client";

import { useState } from "react";

import { Button, Column, Feedback, Input, Row, Textarea } from "@once-ui-system/core";

type Status = "idle" | "sending" | "sent" | "error";

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "", // honeypot – hidden from real users
};

export const ContactForm = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field: keyof typeof emptyForm) => (event: { target: { value: string } }) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "sending") return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setForm(emptyForm);
      setStatus("sent");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit} noValidate>
      <Column fillWidth gap="16">
        <Row fillWidth gap="16" s={{ direction: "column" }}>
          <Input
            id="contact-name"
            name="name"
            label="Name"
            value={form.name}
            onChange={update("name")}
            required
            maxLength={80}
          />
          <Input
            id="contact-email"
            name="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={update("email")}
            maxLength={120}
          />
        </Row>
        <Input
          id="contact-subject"
          name="subject"
          label="Subject"
          value={form.subject}
          onChange={update("subject")}
          maxLength={120}
        />
        <Textarea
          id="contact-message"
          name="message"
          label="Message"
          lines={8}
          value={form.message}
          onChange={update("message")}
          required
          maxLength={2000}
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={form.website}
          onChange={update("website")}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        {status === "sent" && (
          <Feedback
            variant="success"
            icon
            title="Message sent"
            description="Thanks for reaching out – I'll get back to you soon."
          />
        )}
        {status === "error" && (
          <Feedback variant="danger" icon title="Not sent" description={errorMessage} />
        )}
        <Row horizontal="end" fillWidth>
          <Button
            type="submit"
            variant="primary"
            size="m"
            suffixIcon="arrowRight"
            loading={status === "sending"}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending" : "Send message"}
          </Button>
        </Row>
      </Column>
    </form>
  );
};
