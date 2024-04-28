const decor = [
  //     1    2    3    4    5    6    7    8    9   10   11   12   13
  ["F", "N", "F", "F", "F", "N", "F", "F", "F", "N", "F", "F", "F", "N"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
];
const tronc = [
  //     1    2    3    4    5    6    7    8    9   10   11   12   13
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["R", "R", "R", "R", " ", " ", " ", " ", " ", "R", "R", "R", " ", " "],
  [" ", " ", "L", "L", "L", "L", " ", " ", "L", "L", "L", " ", " ", " "],
  [" ", " ", "R", "R", "R", "R", "R", " ", " ", " ", "R", "R", "R", " "],
  [" ", " ", " ", "L", "L", "L", "L", " ", " ", " ", "L", "L", "L", " "],
];

let joueur = { x: 6, y: 5, vivant: true };
let delaiTronc = 0;

// Fonction pour générer le décor en HTML
function genererDecorHTML() {
  const decorContainer = document.getElementById("contenu");
  // Vérifie s'il y a un tableau existant dans la div
  if (decorContainer.firstChild) {
    decorContainer.removeChild(decorContainer.firstChild);
  }
  const table = document.createElement("table");
  table.setAttribute("id", "tableau");
  for (let y = 0; y < decor.length; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < decor[y].length; x++) {
      const cell = document.createElement("td");
      switch (decor[y][x]) {
        case "R":
          cell.classList.add("route");
          break;
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
      cell.setAttribute("id", "cell-" + y + "-" + x);
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
  for (let y = 0; y < tronc.length; y++) {
    for (let x = 0; x < tronc[y].length; x++) {
      if (tronc[y][x] == "L") {
        let cell = document.getElementById("cell-" + y + "-" + x);
        cell.classList.add("tronc");
      }
      if (tronc[y][x] == "R") {
        let cell = document.getElementById("cell-" + y + "-" + x);
        cell.classList.add("tronc");
      }
    }
  }
  delaiTronc++;
  if (delaiTronc == 90) {
    let goToEnd = false;
    for (let y = 0; y < tronc.length; y++) {
      goToEnd = false;
      for (let x = 0; x < tronc[y].length; x++) {
        if (tronc[y][x] == "L") {
          if (x > 0) {
            tronc[y][x - 1] = "L";
          } else {
            goToEnd = true;
          }
          tronc[y][x] = " ";
          if (joueur.x == x && joueur.y == y) {
            joueur.x = joueur.x - 1;
          }
        }
      }
      if (goToEnd) {
        tronc[y][13] = "L";
      }
    }
    let goToStart = false;
    for (let y = 0; y < tronc.length; y++) {
      goToStart = false;
      for (let x = 13; x >= 0; x--) {
        if (tronc[y][x] == "R") {
          if (x < 13) {
            tronc[y][x + 1] = "R";
          } else {
            goToStart = true;
          }
          tronc[y][x] = " ";
          if (joueur.x == x && joueur.y == y) {
            joueur.x = joueur.x + 1;
          }
        }
      }
      if (goToStart) {
        tronc[y][0] = "R";
      }
    }
    delaiTronc = 0;
  }
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
  let cell = document.getElementById("cell-" + nouveauY + "-" + nouveauX);
  if (cell.classList.contains("tronc") || cell.classList.contains("berge") || cell.classList.contains("route")) {
    joueur.vivant = true;
  } else {
    joueur.vivant = false;
    let messageDiv = document.getElementById("partie");
    if (cell.classList.contains("nenuphare")) {
      messageDiv.innerHTML = "Partie GAGNE!";
    } else {
      messageDiv.innerHTML = "Partie PERDU!";
    }
  }
  console.log("cell=", cell);
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
  if (joueur.vivant) {
    requestAnimationFrame(boucleDeJeu);
  } else {
    console.log("PERDU !");
  }
}

// Appeler la fonction pour générer le décor au chargement de la page
window.onload = function () {
  boucleDeJeu();
};
