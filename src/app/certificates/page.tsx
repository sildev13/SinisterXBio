import { Column, Heading, Row, Text, Media } from "@once-ui-system/core";
import { certificates, person } from "@/resources";
import React from "react";

export default function Certificates() {
    // ข้อมูลใบเซอร์อยู่ใน content.tsx แล้ว เพื่อให้ผู้ช่วย AI ใช้ข้อมูลชุดเดียวกัน
    const certs = certificates.items;

    return (
        <Column maxWidth="m">
            <Heading variant="display-strong-s" marginBottom="xl">
                Certificates – {person.name}
            </Heading>
            <Column gap="32" fillWidth>
                {certs.map((cert: (typeof certs)[number], index: number) => (
                    <Column key={index} fillWidth gap="12">
                        <Media src={cert.image} alt={cert.title} radius="l" aspectRatio="16 / 9" enlarge />
                        <Row horizontal="between" vertical="center" fillWidth>
                            <Column>
                                <Text variant="heading-strong-l">{cert.title}</Text>
                                <Text onBackground="neutral-weak">{cert.description}</Text>
                            </Column>
                            <Text variant="body-default-s" onBackground="brand-weak">{cert.date}</Text>
                        </Row>
                    </Column>
                ))}
            </Column>
        </Column>
    );
}
