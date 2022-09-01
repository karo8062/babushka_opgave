const url = "https://babushka-dd8a.restdb.io/rest/menu";
const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

//global variabel
let retter;

console.log("data");
async function hentData() {
  const respons = await fetch(url, options);
  retter = await respons.json();
  visRetter();
}

// defoult - så den starter med at vise alle personerne
let filter = "alle";

//ved brug af "filterKnapper" tager den fat i alle knapperne
const filterKnapper = document.querySelectorAll("nav button");
//ved click på en af knapperne, kalder vi på funktionerne filtrerretter som derefter kommer i brug
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerRetter));

const header = document.querySelector("header h2");

function filtrerRetter() {
  console.log("click");
  filter = this.dataset.kategori;
  //fjern classen "valgt" fra den der var valgt
  document.querySelector(".valgt").classList.remove("valgt");
  //marker knappen der bliver klikket på
  this.classList.add("valgt");
  visRetter();
  header.textContent = this.textContent;
}

const main = document.querySelector("main");
const template = document.querySelector("template").content;

function visRetter() {
  console.log(retter);
  main.textContent = "";
  retter.forEach((ret) => {
    console.log("kategori", ret.kategori);
    if (filter == ret.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("img").src = "billeder/" + ret.billednavn + "-md.jpg";
      klon.querySelector("img").alt = ret.billed;
      klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
      //klon.querySelector(".langbeskrivelse").textContent = ret.langbeskrivelse;

      klon.querySelector("article").addEventListener("click", () => visEnkeltRet(ret));

      klon.querySelector("article").style.borderRadius = "lem";
      main.appendChild(klon);
    }
  });
}
function visEnkeltRet(retData) {
  console.log(retData);
  const popop = document.querySelector("#popop");
  popop.style.display = "flex";
  popop.querySelector("img").src = "billeder/" + retData.billednavn + "-md.jpg";
  popop.querySelector("img").alt = retData.billednavn;
  popop.querySelector("p").textContent = retData.langbeskrivelse;
  popop.querySelector("h2").textContent = "Pris: " + retData.pris + "Kr. ";
}

//får knappen til at forsvinde når man trykker på den igen
document.querySelector("#luk").addEventListener("click", () => (popop.style.display = "none"));

hentData();
