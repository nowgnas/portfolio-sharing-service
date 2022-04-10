import { awardService } from "./awardService";
import { certificationService } from "./certificateService";
import { educationService } from "./educationService";
import { projectService } from "./projectService";
const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const moment = require("moment");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const compile = async function (templateName, data) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "templates",
    `${templateName}.hbs`
  );
  const html = await fs.readFile(filePath, `utf-8`);
  const insecureHandlebars = allowInsecurePrototypeAccess(hbs);
  return insecureHandlebars.compile(html)(data);
};

hbs.registerHelper("dataFormant", function (value, format) {
  return moment(value).format(format);
});

class pdfService {
  static async pdfConverter({ user_id, name, email, tel, description }) {
    const awards = await awardService.getAwards({ user_id });
    const certificates = await certificationService.returnAllCertificate({
      user_id,
    });
    const educations = await educationService.getEducations({ user_id });
    const projects = await projectService.projectList({ user_id });
    //required data has been set
    console.log(educations);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const filename = "myResume.pdf";
    const content = await compile("resume", {
      name,
      email,
      tel,
      awards,
      certificates,
      educations,
      projects,
      description,
    });
    await page.setContent(content);
    await page.emulateMediaType("screen");
    await page.pdf({
      path: "myResume.pdf",
      format: "A4",
      printBackground: true,
    });
    console.log("done");
    await browser.close();
    return filename;
  }
}

export { pdfService };
