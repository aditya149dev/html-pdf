import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

    let pdfPath = 'resume.pdf';
    let counter = 1;
    while (fs.existsSync(pdfPath)) {
        pdfPath = `resume (${counter}).pdf`;
        counter++;
    }

    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
    });
    await browser.close();
    console.log(`PDF generated: ${pdfPath}`);
})();
