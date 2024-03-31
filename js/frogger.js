const decor = [
  //  1    2    3    4    5    6    7    8    9   10   11   12   13   14
  ["F", "N", "F", "F", "F", "N", "F", "F", "F", "N", "F", "F", "F", "N"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
  ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
];

// Fonction pour générer le décor en HTML
function genererDecorHTML() {
  const decorContainer = document.getElementById("contenu");
  let decorHTML = "";
  let classe = "";

  for (let y = 0; y < decor.length; y++) {
    decorHTML += '<div class="' + classe + '">';
    for (let x = 0; x < decor[y].length; x++) {
      decorHTML += decor[y][x] + " ";

      switch (decor[y][x]) {
        case "F":
          classe = "falaise";
          break;
        case "N":
          classe = "nenuphare";
          break;
        case "E":
          classe = "eau";
          break;
        case "B":
          classe = "berge";
          break;
        default:
          classe = "berge";
      }
    }
    decorHTML += "</div>";
  }

  decorContainer.innerHTML = decorHTML;
}

// Appeler la fonction pour générer le décor au chargement de la page
window.onload = function () {
  genererDecorHTML();
};
