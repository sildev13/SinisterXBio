import { Column, Heading, Row, Text, Media } from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import React from "react";

export default function Certificates() {
    // ข้อมูลใบเซอร์ (อนาคตย้ายไปไว้ใน content.tsx ได้)
    const certs = [
        {
            title: "Chinese Speech Geade 4-6",
            description: "รางวัลชนะเลิศ การแข่งขันพูดภาษาจีน ป5 โรงเรียนอนุบาลไทรโยค",
            date: "25 December 2023",
            image: "/images/certificates/Card1.png",
        },
        {
            title: "การแข่งขันพูดภาษาจีน ป.6",
            description: "รางวัลเหรียญทอง การแข่งขันพูดภาษาจีน ป6 โรงเรียนอนุบาลไทรโยคระดับเครือข่ายท่าเสา-วังกระแจะ",
            date: "18 พฤศจิกายน 2568",
            image: "/images/certificates/Card2.png",
        },
        {
            title: "การแข่งขัน Spelling Bee ป.6",
            description: "รางวัลรองชนะเลิศอันดับที่1 การแข่งขัน Spelling Bee ป6 โรงเรียนไทรโยคน้อยวิทยา Open House",
            date: "11 กุมภาพันธ์ 2569",
            image: "/images/certificates/Card3.png",
        },
        {
            title: "โครงการสอบ Top Test Center",
            description: "ระดับชั้น ป.3 ทำคะแนนได้ 104 คะแนน จาก 150 คะแนน เป็น อันดับที่ 180 จาก 268 คน",
            date: "10 มีนาคม 2566",
            image: "/images/certificates/Card4.png",
        },
        {
            title: "กิจกรรม การแข่งขัน Tiktok",
            description: "กิจกรรม การแข่งขัน Tiktok วรรคทองวรรณคดีสุนทรภู่ ยอดไลก์สูงสุด",
            date: "26 มิถุนายน 2567",
            image: "/images/certificates/Card5.png",
        },
        {
            title: "การแข่งขันพูดภาษาจีน ป.4",
            description: "รางวัลชนะเลิศ การแข่งขันพูดภาษาจีน ป4 โรงเรียนอนุบาลไทรโยคระดับ เขตพื่นที่การศึกษากาญจนบุรีเขต 3",
            date: "9 ธันวาคม 2566",
            image: "/images/certificates/Card6.png",
        },
        {
            title: "โครงการสอบ Top Test Center",
            description: "ระดับชั้น ป.3 ทำคะแนนได้ 305 คะแนน จาก 500 คะแนน เป็น อันดับที่ 68 จาก 91 คน วิชา ภาษาอังกฤษ",
            date: "10 มีนาคม 2566",
            image: "/images/certificates/Card7.png",
        },
        {
            title: "การแข่งขันเปืดพจนานุกรม ป.6",
            description: "ได้เข้ารวมกิจกรรมการแข่งขันเปิดพจนานุกรม ใน วันภาษาไทยแห่งชาติ",
            date: "2 มกราคม 2568",
            image: "/images/certificates/Card8.png",
        },
        {
            title: "โครงการสอบ Top Test Center",
            description: "ระดับชั้น ป.3 ทำคะแนนได้ 140 คะแนน จาก 200 คะแนน เป็น อันดับที่ 124 จาก 176 คน วิชา วิทยาศาสตร์",
            date: "10 มีนาคม 2566",
            image: "/images/certificates/Card9.png",
        },
    ];

    return (
        <Column maxWidth="m">
            <Heading variant="display-strong-s" marginBottom="xl">
                Certificates – {person.name}
            </Heading>
            <Column gap="32" fillWidth>
                {certs.map((cert, index) => (
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