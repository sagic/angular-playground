const { exec } = require("child_process");

/* 
========================================================================================
========================================================================================

    Hi UiPath-ians,

    I had some fun playing with "ng generate" to plan and scaffold the app's structure 
    before starting to code so I decided to dedicate a script file for that.
    Ofcourse, it's useless and needs a lot of love to be useful in real cases.

    I'm pushing it with the project in case you would like to see the code.
    The code can be improved but it's clear enough to understand.

========================================================================================
========================================================================================
*/

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry");

if (isDryRun) {
  console.log("\nrunning dry!\n\n");
}

// a great name for a turkish shawarma restaurant with a french twist
const pascalToKebab = (str) =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const scaffoldCustomComponents = () => {
  const componentDefaults = `--standalone --change-detection="OnPush" --display-block --prefix="uipath"`;
  const components = [
    { directory: "common/ui", name: "Button" },
    { directory: "common/ui", name: "Link" },
    { directory: "common/ui", name: "Input" },
    { directory: "common/ui", name: "Select" },
    { directory: "common/ui", name: "DataGrid" },
    { directory: "common/ui", name: "ProgressCircular" },
    { directory: "common/ui/data-grid", name: "DataGridColumn" },
    { directory: "features/nba", name: "NBAPlayersReport" },
    { directory: "features/nobel", name: "NobelPrizesReport" },
  ];

  components.forEach((component) => {
    console.log(`generating custom component: ${component.name}`);
    if (!isDryRun) {
      exec(
        `npx ng g c ${component.directory}/${component.name} ${componentDefaults}`
      );
    }
  });
};

const scaffoldPages = () => {
  const pagesDefaults = `--standalone --change-detection="OnPush" --display-block --prefix="app-page"`;
  const pages = [
    { directory: "pages", name: "HomePage" },
    { directory: "pages/stories", name: "DataGridStoryPage" },
    { directory: "pages/stories", name: "ProgressStoryPage" },
  ];

  const forRoutesTemplate = pages.map((page) => {
    console.log(`generating page component: ${page.name}`);
    if (!isDryRun) {
      exec(`npx ng g c ${page.directory}/${page.name} ${pagesDefaults}`);
    }
    const kebabName = pascalToKebab(page.name);
    let cleanDirectory = page.directory
      .replace("pages/", "")
      .replace("pages", "");
    cleanDirectory = cleanDirectory ? `${cleanDirectory}/${kebabName}` : "";
    return `{path: '${cleanDirectory}',loadComponent: () => import('./${page.directory}/${kebabName}/${kebabName}.component').then((mod) => mod.${page.name}Component)}`;
  });

  const routesTemplate = `
    export const appRoutes: Routes = [
      ${forRoutesTemplate.map((def) => `  ${def}`).join(",\n")}
    ];
  `;
  console.log("\nroutes to paste in app/app-routes.ts:", routesTemplate);
};

scaffoldCustomComponents();
scaffoldPages();
