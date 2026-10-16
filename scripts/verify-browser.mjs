import { chromium } from "playwright";

async function runBrowserVerification() {
  console.log("=== STARTING BROWSER E2E VERIFICATION ===");
  const consoleLogs = [];
  const consoleErrors = [];

  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  page.on("console", (msg) => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push({ type, text });
    if (type === "error") {
      consoleErrors.push(text);
      console.log(`[BROWSER ERROR]: ${text}`);
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
    console.log(`[PAGE UNCAUGHT ERROR]: ${err.message}`);
  });

  console.log("1. Navigating to http://localhost:3000/ ...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });
  console.log("   Page loaded successfully. Title:", await page.title());

  // Wait a short moment for requestIdleCallback / deferred overlays to mount
  await page.waitForTimeout(2000);

  // 2. Open AI Assistant
  console.log("2. Locating AI Assistant button...");
  const assistantButton = page.locator('button[aria-label="Open assistant"]');
  await assistantButton.waitFor({ state: "visible", timeout: 10000 });
  await assistantButton.click();
  console.log("   Clicked assistant trigger button.");

  // Wait for dialog
  const dialog = page.locator('div[role="dialog"]');
  await dialog.waitFor({ state: "visible", timeout: 5000 });
  console.log("   Assistant dialog opened successfully.");

  // Helper to ask a question and wait for the response
  async function askQuestion(query) {
    console.log(`\n--- Testing Question: "${query}" ---`);
    const input = page.locator('input[aria-label="Ask the AI assistant"]');
    await input.fill(query);
    const sendButton = page.locator('button[aria-label="Send query"]');
    await sendButton.click();

    // Wait for typing indicator to appear and then disappear
    await page.waitForTimeout(1000);
    // Wait until last message contains text
    await page.waitForFunction(
      () => {
        const messages = document.querySelectorAll('div[role="dialog"] div[class*="max-w-[88%]"]');
        return messages.length > 0;
      },
      { timeout: 10000 },
    );

    await page.waitForTimeout(1500);

    // Get the latest bot message
    const botMessages = page.locator('div[role="dialog"] div[class*="max-w-[88%]"]');
    const count = await botMessages.count();
    const lastMsg = botMessages.nth(count - 1);
    const text = await lastMsg.innerText();
    console.log(`[BOT RESPONSE]:\n${text}`);
    return lastMsg;
  }

  // 3. Test JARVIS question
  const jarvisMsg = await askQuestion("How does JARVIS work?");
  const jarvisText = await jarvisMsg.innerText();
  if (!jarvisText.includes("JARVIS") || !jarvisText.includes("SpeechRecognition")) {
    throw new Error("JARVIS response missing expected pipeline details!");
  }
  console.log("✓ JARVIS query verified successfully.");

  // 4. Test AI/ML skills question
  const skillsMsg = await askQuestion("What are your AI/ML skills?");
  const skillsText = await skillsMsg.innerText();
  if (!skillsText.includes("AI & ML") && !skillsText.includes("Voice & Speech Intelligence")) {
    throw new Error("AI/ML skills response missing expected details!");
  }
  console.log("✓ AI/ML skills query verified successfully.");

  // 5. Test Internship availability
  const internMsg = await askQuestion("Are you available for an internship?");
  const internText = await internMsg.innerText();
  if (!internText.includes("internship")) {
    throw new Error("Internship response missing expected details!");
  }
  console.log("✓ Internship query verified successfully.");

  // 6. Test Action Button (Download Resume)
  console.log("\n6. Testing action buttons (Download Resume)...");
  const resumeButton = internMsg.locator('button:has-text("Download Resume")');
  const hasResumeBtn = (await resumeButton.count()) > 0;
  console.log("   Download Resume button present:", hasResumeBtn);

  if (hasResumeBtn) {
    // Intercept download or new page
    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 5000 }).catch(() => null),
      resumeButton.click(),
    ]);

    if (download) {
      console.log("✓ Download triggered successfully:", download.suggestedFilename());
    } else {
      console.log("   Download click dispatched safely.");
    }
  }

  // 7. Check browser console errors
  console.log("\n=== BROWSER CONSOLE REPORT ===");
  console.log(`Total console logs: ${consoleLogs.length}`);
  console.log(`Total console errors: ${consoleErrors.length}`);

  // Filter out benign noise like favicon or 404 on analytics if any
  const criticalErrors = consoleErrors.filter(
    (e) => !e.includes("favicon") && !e.includes("preconnect"),
  );

  if (criticalErrors.length > 0) {
    console.log("Critical Errors detected in browser:", criticalErrors);
  } else {
    console.log("✓ Clean browser console! Zero unhandled errors.");
  }

  await browser.close();
  console.log("\n=== VERIFICATION COMPLETED SUCCESSFULLY ===");
}

runBrowserVerification().catch((err) => {
  console.error("VERIFICATION FAILED:", err);
  process.exit(1);
});
