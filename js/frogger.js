const decor = [
  //     2    3    4    5    6    7    8    9   10   11   12   13   14
  ["F", "N", "F", "F", "F", "N", "F", "F", "F", "N", "F", "F", "F", "N"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
];
const tronc = [
  //     2    3    4    5    6    7    8    9   10   11   12   13   14
  ["R", "R", "R", "R", " ", " ", " ", " ", " ", "R", "R", "R", " ", " "],
  ["L", "L", "L", "L", " ", " ", " ", " ", " ", "L", "L", "L", " ", " "],
  [" ", " ", "R", "R", "R", "R", "R", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", "L", "L", "L", "L", " ", " ", "L", "L", "L", " ", " "],
];

let joueur = { x: 6, y: 5 };

// Fonction pour générer le décor en HTML
function genererDecorHTML() {
  const decorContainer = document.getElementById("contenu");
  // Vérifie s'il y a un tableau existant dans la div
  if (decorContainer.firstChild) {
    decorContainer.removeChild(decorContainer.firstChild);
  }
  let decorHTML = "";
  let classe = "";
  const table = document.createElement("table");
  for (let y = 0; y < decor.length; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < decor[y].length; x++) {
      const cell = document.createElement("td");
      switch (decor[y][x]) {
        case "F":
          cell.classList.add("falaise");
          break;
        case "N":
          cell.classList.add("nenuphare");
          break;
        case "E":
          cell.classList.add("eau");
          break;
        case "B":
          cell.classList.add("berge");
          break;
        default:
          cell.classList.add("berge");
      }
      if (x == joueur.x && y == joueur.y) {
        const texte = document.createTextNode("X");
        cell.appendChild(texte);
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  // console.log("table = ", table);
  document.getElementById("contenu").appendChild(table);
}

function deplacerTroncs() {
  // console.log("déplacement enemis");
  // const decorContainer = document.getElementById("contenu");
  // let classe = "";
  // const table = document.createElement("table");
  // for (let y = 0; y < decor.length; y++) {
  //   const row = document.createElement("tr");
  //   for (let x = 0; x < decor[y].length; x++) {
  //     const cell = document.createElement("td");
  //   }
  // }
}

// Fonction pour gérer les mouvements du joueur
function deplacerJoueur(direction) {
  let nouveauX = joueur.x;
  let nouveauY = joueur.y;

  // Déplacement du joueur en fonction de la direction
  switch (direction) {
    case "ArrowUp":
      nouveauY--;
      break;
    case "ArrowDown":
      nouveauY++;
      break;
    case "ArrowLeft":
      nouveauX--;
      break;
    case "ArrowRight":
      nouveauX++;
      break;
    default:
      return;
  }
  joueur.x = nouveauX;
  joueur.y = nouveauY;
}

// Fonction pour gérer les entrées clavier
function gestionTouches(event) {
  const touche = event.key;
  console.log("gestionTouches", touche);
  deplacerJoueur(touche);
  console.log("gestionTouches", joueur);
}

// Boucle de jeu
function boucleDeJeu() {
  genererDecorHTML();
  deplacerTroncs();

  // Ici vous pourriez ajouter d'autres fonctionnalités de jeu

  // Attacher l'événement pour les touches du clavier
  window.addEventListener("keydown", gestionTouches);

  // Répéter la boucle de jeu en utilisant requestAnimationFrame
  requestAnimationFrame(boucleDeJeu);
}

// Appeler la fonction pour générer le décor au chargement de la page
window.onload = function () {
  boucleDeJeu();
};
