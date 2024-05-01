# ![logo](Frogger-logo.svg)  Frogger ISEN

Jeux vidéo Frogger en HTML CSS Javascript cf [wikipedia](https://fr.wikipedia.org/wiki/Frogger)

# Développement

## Codification du décor

⭐ Le décors est géré dans une matrice de 13 lignes et 14 colones.

``` javascript
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

```
Codification du décors : 
* F : Falaise, la grenouille est morte. 
* N : Nénuphare, point d'arrivée de la grenouille.
* E : Eau, la grenouille est morte, elle ne sait pas nager.
* B : Berge, la grenouille est en sécurité, aucun énemis peut l'atteindre ici.


## Codification des animations
De même que pour le décor, nous utilisons une matrice pour gérer l'affichage des objets animés. 

Codification des objets animés : 
* L : Symbolise un **tronc** qui se déplace vers la gauche.
* R : Symbolise un **tronc** qui se déplace vers la droite.
* M : Symbolise un **camion** qui se déplace lentement vers la gauche.
* S : Symbolise une **voiture Sportive** qui se déplace rapidement vers la droite.








