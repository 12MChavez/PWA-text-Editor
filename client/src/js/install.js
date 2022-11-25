const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA

// event handler for the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // this prevents the prompt from being displayed immediately
  event.preventDefault();

  // click event handler on the `butInstall` element
  butInstall.addEventListener("click", async (event) => {
    event.prompt();
  });

  butInstall.hidden = false;
});

// handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  butInstall.hidden = true;
  console.log("App was installed");
});
