import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function createResume() {
  const pdfDoc = await PDFDocument.create();

  // Set standard PDF metadata
  pdfDoc.setTitle("Prince Chauhan - Resume");
  pdfDoc.setAuthor("Prince Chauhan");
  pdfDoc.setSubject("Software Developer / Python Developer Intern Resume");
  pdfDoc.setKeywords([
    "Prince Chauhan",
    "Resume",
    "Python Developer",
    "Software Developer",
    "B.Tech CSE",
    "AI & ML",
  ]);
  pdfDoc.setProducer("PDF-Lib");
  pdfDoc.setCreator("Prince Chauhan");

  // Standard US Letter (612 x 792 pt)
  const pageWidth = 612;
  const pageHeight = 792;
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const marginX = 38;
  const contentWidth = pageWidth - marginX * 2; // 536 pt
  let cursorY = pageHeight - 34; // Start near top

  const colorBlack = rgb(0.08, 0.08, 0.08);
  const colorGray = rgb(0.2, 0.2, 0.2);
  const colorRule = rgb(0.35, 0.35, 0.35);

  // Helper to center text
  function drawCenteredText(text, font, size, color, offsetY = 0) {
    const textWidth = font.widthOfTextAtSize(text, size);
    const x = (pageWidth - textWidth) / 2;
    page.drawText(text, {
      x,
      y: cursorY - offsetY,
      size,
      font,
      color,
    });
  }

  // --- HEADER ---
  drawCenteredText("PRINCE CHAUHAN", fontBold, 17, colorBlack);
  cursorY -= 19;

  drawCenteredText(
    "B.Tech CSE (AI & ML) | Software Developer / Python Developer Intern",
    fontBold,
    9.5,
    colorBlack,
  );
  cursorY -= 13;

  drawCenteredText(
    "Ghaziabad, Uttar Pradesh, India | +91-7042481850 | ps06222005@gmail.com",
    fontRegular,
    8.5,
    colorGray,
  );
  cursorY -= 12;

  drawCenteredText(
    "LinkedIn: linkedin.com/in/prince-chauhan-3418a328 | GitHub: github.com/ps06222005-oss | Portfolio: princechauhan.lovable.app",
    fontRegular,
    8.5,
    colorGray,
  );
  cursorY -= 11;

  // Horizontal divider rule
  page.drawLine({
    start: { x: marginX, y: cursorY },
    end: { x: pageWidth - marginX, y: cursorY },
    thickness: 0.6,
    color: colorRule,
  });
  cursorY -= 12;

  // Helper to draw section heading
  function drawSectionHeading(title) {
    page.drawText(title, {
      x: marginX,
      y: cursorY,
      size: 9.5,
      font: fontBold,
      color: colorBlack,
    });
    cursorY -= 12;
  }

  // Helper to wrap and draw paragraph text
  function drawParagraph(text, font, size, color, lineHeight = 11, indent = 0) {
    const words = text.split(" ");
    let currentLine = "";
    const maxWidth = contentWidth - indent;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && currentLine) {
        page.drawText(currentLine, {
          x: marginX + indent,
          y: cursorY,
          size,
          font,
          color,
        });
        cursorY -= lineHeight;
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, {
        x: marginX + indent,
        y: cursorY,
        size,
        font,
        color,
      });
      cursorY -= lineHeight;
    }
  }

  // Helper for bullet item with hanging indent
  function drawBullet(text, font, size, color, lineHeight = 11) {
    const bulletSymbol = "• ";
    const bulletWidth = font.widthOfTextAtSize(bulletSymbol, size);
    page.drawText(bulletSymbol, {
      x: marginX + 4,
      y: cursorY,
      size,
      font: fontBold,
      color,
    });

    const indent = 4 + bulletWidth + 2;
    const maxWidth = contentWidth - indent;
    const words = text.split(" ");
    let currentLine = "";
    let isFirst = true;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && currentLine) {
        page.drawText(currentLine, {
          x: marginX + indent,
          y: cursorY,
          size,
          font,
          color,
        });
        cursorY -= lineHeight;
        currentLine = words[i];
        isFirst = false;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, {
        x: marginX + indent,
        y: cursorY,
        size,
        font,
        color,
      });
      cursorY -= lineHeight;
    }
  }

  // Helper for inline styled segments on one or more lines
  // segments: [{ text: "Programming: ", font: fontBold }, { text: "Python...", font: fontRegular }]
  function drawMixedLine(segments, size, color, lineHeight = 11, indent = 0) {
    let currentX = marginX + indent;
    const maxWidth = marginX + contentWidth;

    for (const seg of segments) {
      const segWords = seg.text.split(" ");
      for (let i = 0; i < segWords.length; i++) {
        const word = segWords[i];
        const isLastInSeg = i === segWords.length - 1;
        const toMeasure = word + (isLastInSeg && !seg.text.endsWith(" ") ? "" : " ");
        const wordWidth = seg.font.widthOfTextAtSize(toMeasure, size);

        if (currentX + wordWidth > maxWidth && currentX > marginX + indent) {
          cursorY -= lineHeight;
          currentX = marginX + indent;
        }

        page.drawText(word, {
          x: currentX,
          y: cursorY,
          size,
          font: seg.font,
          color,
        });
        currentX += seg.font.widthOfTextAtSize(word + " ", size);
      }
    }
    cursorY -= lineHeight;
  }

  // 1. PROFESSIONAL SUMMARY
  drawSectionHeading("PROFESSIONAL SUMMARY");
  drawParagraph(
    "B.Tech CSE (AI & ML) student with hands-on experience in Python applications, automation, and responsive web development. Built and published a Python voice assistant and developed automation projects while strengthening software development, AI/ML, and problem-solving fundamentals. Seeking Software Development, Python, Backend, or Full Stack internship opportunities.",
    fontRegular,
    8.5,
    colorBlack,
    11.5,
  );
  cursorY -= 4;

  // 2. EDUCATION
  drawSectionHeading("EDUCATION");
  page.drawText(
    "B.Tech – Computer Science & Engineering (AI & ML) | Sunderdeep Global University, Ghaziabad | 2024–2028 (Expected)",
    {
      x: marginX,
      y: cursorY,
      size: 8.5,
      font: fontBold,
      color: colorBlack,
    },
  );
  cursorY -= 15;

  // 3. TECHNICAL SKILLS
  drawSectionHeading("TECHNICAL SKILLS");
  drawMixedLine(
    [
      { text: "Programming: ", font: fontBold },
      { text: "Python, JavaScript (Fundamentals), HTML, CSS | ", font: fontRegular },
      { text: "Libraries: ", font: fontBold },
      { text: "SpeechRecognition, pyttsx3, Requests, Pandas", font: fontRegular },
    ],
    8.5,
    colorBlack,
    11.5,
  );

  drawMixedLine(
    [
      { text: "Tools: ", font: fontBold },
      { text: "Git, GitHub, VS Code, Google Colab, Jupyter Notebook | ", font: fontRegular },
      { text: "Concepts: ", font: fontBold },
      {
        text: "OOP, Data Structures, DBMS, Computer Networks, ML/NLP Fundamentals",
        font: fontRegular,
      },
    ],
    8.5,
    colorBlack,
    11.5,
  );

  drawMixedLine(
    [
      { text: "Development: ", font: fontBold },
      {
        text: "Python Automation, API Fundamentals, Responsive Web Development",
        font: fontRegular,
      },
    ],
    8.5,
    colorBlack,
    11.5,
  );
  cursorY -= 4;

  // 4. PROJECTS
  drawSectionHeading("PROJECTS");

  // Project 1: JARVIS
  page.drawText("JARVIS – Python Voice Assistant | Python, SpeechRecognition, pyttsx3, Requests", {
    x: marginX,
    y: cursorY,
    size: 8.5,
    font: fontBold,
    color: colorBlack,
  });
  cursorY -= 11;
  drawBullet(
    "Developed a desktop voice assistant for voice-controlled interaction; implemented speech recognition and text-to-speech.",
    fontRegular,
    8.5,
    colorBlack,
    10.5,
  );
  drawBullet(
    "Added application launching, web search, and date/time utilities; organized functionality into modular Python components.",
    fontRegular,
    8.5,
    colorBlack,
    10.5,
  );
  drawBullet("Published the project on GitHub.", fontRegular, 8.5, colorBlack, 10.5);
  cursorY -= 3;

  // Project 2: AI Automation Scripts
  page.drawText("AI Automation Scripts | Python, Pandas, Requests", {
    x: marginX,
    y: cursorY,
    size: 8.5,
    font: fontBold,
    color: colorBlack,
  });
  cursorY -= 11;
  drawBullet(
    "Built Python scripts for repetitive productivity tasks and CSV data processing using Pandas.",
    fontRegular,
    8.5,
    colorBlack,
    10.5,
  );
  drawBullet(
    "Practiced file handling, data transformation, reusable scripting, and automation workflows.",
    fontRegular,
    8.5,
    colorBlack,
    10.5,
  );
  cursorY -= 3;

  // Project 3: Personal Portfolio Website
  page.drawText(
    "Personal Portfolio Website | React, Vite, Tailwind CSS, JavaScript, Framer Motion",
    {
      x: marginX,
      y: cursorY,
      size: 8.5,
      font: fontBold,
      color: colorBlack,
    },
  );
  cursorY -= 11;
  drawBullet(
    "Developed and deployed a responsive portfolio showcasing projects, skills, certifications, GitHub, and professional profiles.",
    fontRegular,
    8.5,
    colorBlack,
    10.5,
  );
  drawBullet(
    "Implemented interactive sections, responsive layouts, project navigation, and contact functionality.",
    fontRegular,
    8.5,
    colorBlack,
    10.5,
  );
  cursorY -= 4;

  // 5. CERTIFICATIONS
  drawSectionHeading("CERTIFICATIONS");
  drawParagraph(
    "Prompt Engineering Masterclass – Great Learning (2026) | AI & Cybersecurity Awareness – TCS iON (2026) | SDE Unlocked – Brain Mentors (2026) | Full Stack Development Workshop – GUVI (2026) | Data Analytics Workshop – Ducat (2025) | AI Tools Workshop – Be10x (2025)",
    fontRegular,
    8.5,
    colorBlack,
    11.5,
  );
  cursorY -= 4;

  // 6. ACHIEVEMENTS & ACTIVITIES
  drawSectionHeading("ACHIEVEMENTS & ACTIVITIES");
  drawParagraph(
    "• Published JARVIS on GitHub. • Participated in the AI For All Guinness World Record initiative. • Active member of the university Computer Club. • Participated in AI/ML workshops.",
    fontRegular,
    8.5,
    colorBlack,
    11.5,
  );
  cursorY -= 4;

  // 7. LANGUAGES & CAREER INTERESTS
  drawSectionHeading("LANGUAGES & CAREER INTERESTS");
  drawMixedLine(
    [
      { text: "Languages: ", font: fontBold },
      { text: "Hindi (Native), English (Professional Working Proficiency) | ", font: fontRegular },
      { text: "Interests: ", font: fontBold },
      { text: "Software Development, Python, Backend, Full Stack, AI/ML", font: fontRegular },
    ],
    8.5,
    colorBlack,
    11.5,
  );

  const pdfBytes = await pdfDoc.save();

  // Write to public/resume.pdf
  const publicPath = path.resolve("public/resume.pdf");
  fs.writeFileSync(publicPath, pdfBytes);
  console.log(`Successfully generated valid PDF at ${publicPath} (${pdfBytes.length} bytes)`);

  // If .output/public exists, also copy it there
  const outputPath = path.resolve(".output/public/resume.pdf");
  if (fs.existsSync(path.dirname(outputPath))) {
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`Copied to ${outputPath}`);
  }
}

createResume().catch((err) => {
  console.error("Failed to create resume:", err);
  process.exit(1);
});
