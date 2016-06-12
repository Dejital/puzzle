(function() {

  this.board = [];
  this.pieces = [];
  this.selectedPiece = '';

  var board = document.querySelector('.game-board');
  var pieces = document.querySelector('.game-pieces');
  
  var colors = ['blue', 'magenta', 'lawngreen', 'goldenrod', 'cyan'];

  var defaultBoardConfiguration = [4,2,4,1,3,1,3,0,2,0,2,1,1,4,3,0];
  var defaultPiecesDistribution = [3,3,3,4,3];

  this.setupBoard = function(board, configuration, dimension) {

    var game = this;
    board.innerHTML = '';
    var id = 0;

    for (var x = 0; x < dimension; x++) {
      for (var y = 0; y < dimension; y++) {

        var type = configuration[id];
        var color = colors[type];

        spot = document.createElement('span');
        spot.className = 'spot';
        spot.setAttribute('x', x);
        spot.setAttribute('y', y);
        spot.setAttribute('isOpen', true);
        spot.setAttribute('type', type);
        spot.setAttribute('style', 'background:' + color);

        spot.onclick = function () {
          var isOpen = this.getAttribute('isOpen');
          debugger;
          if (isOpen === 'true' && game.selectedPiece){

            // TODO: Check if legal to place

            game.selectedPiece.className = 'piece-hidden';
            game.selectedPiece.setAttribute('isPlaced', true);

            var type = game.selectedPiece.getAttribute('type');
            var color = colors[type];
            this.setAttribute('isOpen', false);
            this.setAttribute('style', 'background:' + color);
            this.className += ' spot-on';

            game.selectedPiece = '';
            game.resetPieces();
          }
        };

        if (y === 0){
          spot.className += ' spot-clear';
        }

        this.board.push(spot);
        board.appendChild(spot);
        id++;
      }
    }

  };

  this.resetPieces = function() {
    var game = this;

    for (var i = 0; i < game.pieces.length; i++){
      var piece = game.pieces[i];
      var isPlaced = piece.getAttribute('isPlaced');
      if (isPlaced === false){
        piece.className = 'piece';
      }
    }
  };

  this.setupPieces = function(pieces, distribution) {

    var game = this;
    pieces.innerHTML = '';

    for (var i = 0; i < distribution.length; i++) {
      while (distribution[i] > 0){

        piece = document.createElement('span');
        piece.className = 'piece';
        piece.setAttribute('isPlaced', false);
        piece.setAttribute('type', i);
        piece.setAttribute('style', 'background:' + colors[i]);

        piece.onclick = function () {
          game.resetPieces();
          this.className = 'piece piece-selected';
          game.selectedPiece = this;
        };

        this.pieces.push(piece);
        pieces.appendChild(piece);
        distribution[i]--;
      }
    }

  };

  var dimension = 4;

  this.setupBoard(board, defaultBoardConfiguration, dimension);
  this.setupPieces(pieces, defaultPiecesDistribution);

})();
