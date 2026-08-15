import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { ContactForm } from "@/components/contact/ContactForm";
import { baseURL, contact, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(contact.title)}`,
    path: contact.path,
  });
}

export default function Contact() {
  return (
    <Column maxWidth="s" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={contact.title}
        description={contact.description}
        path={contact.path}
        image={`/api/og/generate?title=${encodeURIComponent(contact.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${contact.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column gap="8">
        <Heading variant="display-strong-s">{contact.headline}</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          {contact.subline}
        </Text>
      </Column>
      <ContactForm />
    </Column>
  );
}
