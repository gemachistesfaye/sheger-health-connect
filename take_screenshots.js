const puppeteer = require('./frontend/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://sheger-health-connect.vercel.app';
const OUT_DIR = path.join(__dirname, 'docs', 'images');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const shot = async (page, filename) => {
  await new Promise(r => setTimeout(r, 3000)); // wait for animations
  const filepath = path.join(OUT_DIR, filename);
  await page.screenshot({ path: filepath, fullPage: false });
  console.log(`✅ Saved: ${filename}`);
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1440, height: 820 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    // 1. Landing Page
    console.log('📸 1. Landing Page...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2', timeout: 30000 });
    await shot(page, 'img2_landing.png');

    // 2. Login Page
    console.log('📸 2. Login Page...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2', timeout: 30000 });
    await shot(page, 'img1_login.png');

    // 3. Register Page
    console.log('📸 3. Register Page...');
    await page.goto(`${BASE_URL}/register`, { waitUntil: 'networkidle2', timeout: 30000 });
    await shot(page, 'img3_register.png');

    // 4. Admin Login → Dashboard
    console.log('📸 4. Admin Dashboard...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.type('input[type="text"], input[placeholder*="username" i], input[name="username"]', 'admin');
    await page.type('input[type="password"]', 'Admin@2026');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {});
    await shot(page, 'img7_admin_dashboard.png');

    // 5. Admin Doctors tab
    console.log('📸 5. Admin Doctors...');
    const links = await page.$$eval('a, button', els =>
      els.map(el => ({ text: el.textContent.trim(), href: el.href || '' }))
    );
    const doctorsLink = links.find(l => /doctor/i.test(l.text));
    if (doctorsLink?.href) {
      await page.goto(doctorsLink.href, { waitUntil: 'networkidle2', timeout: 15000 });
    } else {
      const btn = await page.$x("//a[contains(text(),'Doctor')] | //button[contains(text(),'Doctor')]");
      if (btn.length > 0) await btn[0].click();
    }
    await shot(page, 'img8_admin_doctors.png');

    // 6. Admin Messages tab
    console.log('📸 6. Admin Messages...');
    const msgLinks = await page.$$eval('a, button', els =>
      els.map(el => ({ text: el.textContent.trim(), href: el.href || '' }))
    );
    const msgLink = msgLinks.find(l => /message/i.test(l.text));
    if (msgLink?.href) {
      await page.goto(msgLink.href, { waitUntil: 'networkidle2', timeout: 15000 });
    }
    await shot(page, 'img6_admin_messages.png');

    // Logout
    console.log('🔓 Logging out admin...');
    const logoutBtn = await page.$x("//button[contains(text(),'Logout')] | //button[contains(text(),'Sign out')] | //button[contains(text(),'Log out')]");
    if (logoutBtn.length > 0) {
      await logoutBtn[0].click();
      await new Promise(r => setTimeout(r, 1500));
      // confirm modal if present
      const confirmBtn = await page.$x("//button[contains(text(),'Confirm')] | //button[contains(text(),'Yes')] | //button[contains(text(),'Log out')]");
      if (confirmBtn.length > 0) await confirmBtn[0].click();
      await new Promise(r => setTimeout(r, 2000));
    } else {
      await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    }

    // 7. Doctor Dashboard
    console.log('📸 7. Doctor Dashboard...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));
    const inputs = await page.$$('input');
    await inputs[0].click({ clickCount: 3 });
    await inputs[0].type('dr_abebe');
    await inputs[1].click({ clickCount: 3 });
    await inputs[1].type('Password@123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {});
    await shot(page, 'img4_doctor_dashboard.png');

    // 8. Doctor Appointments
    console.log('📸 8. Doctor Appointments...');
    const apptLinks = await page.$$eval('a', els =>
      els.map(el => ({ text: el.textContent.trim(), href: el.href || '' }))
    );
    const apptLink = apptLinks.find(l => /appointment/i.test(l.text));
    if (apptLink?.href) {
      await page.goto(apptLink.href, { waitUntil: 'networkidle2', timeout: 15000 });
    }
    await shot(page, 'img5_doctor_schedule.png');

    // 9. Doctor Messages
    console.log('📸 9. Doctor Messages...');
    const dMsgLinks = await page.$$eval('a', els =>
      els.map(el => ({ text: el.textContent.trim(), href: el.href || '' }))
    );
    const dMsgLink = dMsgLinks.find(l => /message/i.test(l.text));
    if (dMsgLink?.href) {
      await page.goto(dMsgLink.href, { waitUntil: 'networkidle2', timeout: 15000 });
    }
    await shot(page, 'img9_doctor_messages.png');

    console.log('\n🎉 ALL 9 SCREENSHOTS SAVED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await browser.close();
  }
})();
