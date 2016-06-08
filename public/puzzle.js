(function() {

  var board = document.querySelector('.board');

  board.innerHTML = '';
  board.style.backgroundColor = 'red';

  var dimension = 5;

  for (var x = 0; x < dimension; x++) {
    for (var y = 0; y < dimension; y++) {
      var spot = document.createElement('span');
      spot.className = 'spot';
      spot.setAttribute('x', x);
      spot.setAttribute('y', y);

      spot.onclick = function () {
        this.className = 'spot spot-on';
      };

      board.appendChild(spot);
    }
  }

})();
