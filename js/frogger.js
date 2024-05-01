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
const animation = [
  //     1    2    3    4    5    6    7    8    9   10   11   12   13
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "], //nenuphare
  ["R", "R", "R", "R", " ", " ", " ", " ", " ", "R", "R", "R", " ", " "],
  [" ", " ", "L", "L", "L", "L", " ", " ", "L", "L", "L", " ", " ", " "],
  [" ", " ", "R", "R", "R", "R", "R", " ", " ", " ", "R", "R", "R", " "],
  [" ", " ", " ", "L", "L", "L", "L", " ", " ", " ", "L", "L", "L", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "], //berge
  [" ", " ", " ", "D", "D", "D", " ", " ", " ", "D", "D", "D", " ", " "],
  [" ", " ", "S", "S", " ", " ", "S", "S", " ", "S", "S", " ", " ", " "],
  [" ", "M", "M", "M", "M", " ", " ", " ", " ", "M", "M", "M", "M", " "],
  ["S", " ", " ", " ", "S", "S", " ", " ", "S", "S", " ", " ", " ", "S"],
  ["D", " ", "D", "D", "D", " ", " ", "D", "D", "D", " ", " ", "D", "D"],
  [" ", "S", "S", " ", " ", " ", "S", "S", " ", " ", " ", "S", "S", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "], //berge
];
const X_MAX = 13;
const Y_MAX = 12;

let joueur = { x: 6, y: 12, vivant: true, yMinAtteint: 12 };
let delaiAnimationRapideDroite = 0;
let delaiAnimationMoyen = 0;
let delaiAnimationLentGauche = 0;
let delaiAnimationMoyenVoiture = 0;
let message = "";
let score = 0;

// Fonction pour générer le décor en HTML
function genererDecorHTML() {
  const decorContainer = document.getElementById("contenu");
  // Vérifie s'il y a un tableau existant dans la div
  if (decorContainer.firstChild) {
    decorContainer.removeChild(decorContainer.firstChild);
  }
  const table = document.createElement("table");
  table.setAttribute("id", "tableau");
  table.classList.add("tableau");
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
        case "M":
          cell.classList.add("camion");
          break;
        case "S":
          cell.classList.add("sportive");
          break;
        case "D":
          cell.classList.add("voiture");
          break;
        case "B":
          cell.classList.add("berge");
          break;
        case "V":
          cell.classList.add("victoire");
          const texte = document.createTextNode("🐸");
          cell.appendChild(texte);
          break;
        default:
          cell.classList.add("berge");
      }
      cell.setAttribute("id", "cell-" + y + "-" + x);
      if (x == joueur.x && y == joueur.y) {
        const texte = document.createTextNode("🐸");
        cell.appendChild(texte);
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  document.getElementById("contenu").appendChild(table);
}

function deplacerAnimation() {
  for (let y = 0; y < animation.length; y++) {
    for (let x = 0; x < animation[y].length; x++) {
      let cell = document.getElementById("cell-" + y + "-" + x);
      if (animation[y][x] == "L") {
        cell.classList.add("tronc");
      } else if (animation[y][x] == "R") {
        cell.classList.add("tronc");
      } else if (animation[y][x] == "M") {
        cell.classList.add("camion");
      } else if (animation[y][x] == "S") {
        cell.classList.add("sportive");
      } else if (animation[y][x] == "D") {
        cell.classList.add("voiture");
      }
    }
  }

  delaiAnimationRapideDroite++;
  if (delaiAnimationRapideDroite == 50) {
    moveDroite("S", false);
    delaiAnimationRapideDroite = 0;
  }

  delaiAnimationLentGauche++;
  if (delaiAnimationLentGauche == 120) {
    moveGauche("M", false);
    delaiAnimationLentGauche = 0;
  }

  delaiAnimationMoyenVoiture++;
  if (delaiAnimationMoyenVoiture == 90) {
    moveGauche("D", false);
    delaiAnimationMoyenVoiture = 0;
  }

  delaiAnimationMoyen++;
  if (delaiAnimationMoyen == 120) {
    moveGauche("L", true);
    moveDroite("R", true);
    delaiAnimationMoyen = 0;
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
      if (nouveauY < joueur.yMinAtteint) {
        joueur.yMinAtteint = nouveauY;
        updateScore(10);
      }
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
  if (nouveauX >= 0 && nouveauX <= X_MAX) {
    joueur.x = nouveauX;
  }
  if (nouveauY >= 0 && nouveauY <= Y_MAX) {
    joueur.y = nouveauY;
  }
  let cell = document.getElementById("cell-" + joueur.y + "-" + joueur.x);

  if (cell.classList.contains("nenuphare")) {
    decor[0][joueur.x] = "V";
    let nombreDeVictoire = 0;
    for (let x = 0; x < decor[0].length; x++) {
      if (decor[0][x] == "V") {
        nombreDeVictoire++;
      }
    }
    if (nombreDeVictoire == 4) {
      message = "Bravo c'est une Victoire !!!";
      joueur.vivant = false;
    } else {
      joueur.x = 6;
      joueur.y = 12;
      joueur.yMinAtteint = 12;
    }
  } else if (
    (cell.classList.contains("eau") && !cell.classList.contains("tronc")) ||
    cell.classList.contains("victoire") ||
    cell.classList.contains("falaise") ||
    cell.classList.contains("camion") ||
    cell.classList.contains("sportive") ||
    cell.classList.contains("voiture")
  ) {
    joueur.vivant = false;
    message = "Dommage, c'est perdu...";
  }
}

// Fonction pour gérer les entrées clavier
function gestionTouches(event) {
  if (joueur.vivant) {
    const touche = event.key;
    // console.log("gestionTouches", touche);
    deplacerJoueur(touche);
    // console.log("gestionTouches", joueur);
  }
}

// Boucle de jeu
function boucleDeJeu() {
  genererDecorHTML();
  deplacerAnimation();
  // On détecte l'action des touches du clavier
  window.addEventListener("keydown", gestionTouches);
  if (joueur.vivant) {
    // permet de synchroniser l'affichage avec le taux de rafraîchissement
    requestAnimationFrame(boucleDeJeu);
  } else {
    console.log("Fin de partie...");
    requestAnimationFrame(finDeJeu);
    let messageDiv = document.getElementById("partie");
    messageDiv.innerHTML = message;
  }
}
function finDeJeu() {
  genererDecorHTML();
  deplacerAnimation();
}

// Appeler la fonction pour générer le décor au chargement de la page
window.onload = function () {
  boucleDeJeu();
};

function moveGauche(codeObjet, isTronc) {
  let goToEnd = false;
  for (let y = 0; y < animation.length; y++) {
    goToEnd = false;
    for (let x = 0; x < animation[y].length; x++) {
      if (animation[y][x] == codeObjet) {
        if (x > 0) {
          animation[y][x - 1] = codeObjet;
          if (!isTronc && joueur.x == x - 1 && joueur.y == y) {
            joueur.vivant = false;
            message = "Perdu, la grenouille c'est faite écrasée.";
          }
        } else {
          goToEnd = true;
        }
        animation[y][x] = " ";
        if (isTronc && joueur.x == x && joueur.y == y) {
          joueur.x = joueur.x - 1;
          if (joueur.x < 0) {
            joueur.vivant = false;
            message = "Perdu, la grenouille a quitté le jeu.";
          }
        }
      }
    }
    if (goToEnd) {
      animation[y][X_MAX] = codeObjet;
    }
  }
}

function moveDroite(codeObjet, isTronc) {
  let goToStart = false;
  for (let y = 0; y < animation.length; y++) {
    goToStart = false;
    for (let x = X_MAX; x >= 0; x--) {
      if (animation[y][x] == codeObjet) {
        if (x < X_MAX) {
          animation[y][x + 1] = codeObjet;
          if (!isTronc && joueur.x == x + 1 && joueur.y == y) {
            joueur.vivant = false;
            message = "Perdu, la grenouille c'est faite écrasée.";
          }
        } else {
          goToStart = true;
        }
        animation[y][x] = " ";
        if (isTronc && joueur.x == x && joueur.y == y) {
          joueur.x = joueur.x + 1;
          if (joueur.x > X_MAX) {
            joueur.vivant = false;
            message = "Perdu, la grenouille a abandonné la partie.";
          }
        }
      }
    }
    if (goToStart) {
      animation[y][0] = codeObjet;
    }
  }
}

function updateScore(points) {
  score += points;
  document.getElementById("score").innerHTML = "score :" + score;
}
