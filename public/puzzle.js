(function() {

  this.board = [];
  this.pieces = [];
  this.selectedPiece = '';
  this.score = 0;

  var board = document.querySelector('.game-board');
  var pieces = document.querySelector('.game-pieces');
  var counter = document.querySelector('.counter');

  var colors = ['blue', 'magenta', 'lawngreen', 'goldenrod', 'cyan'];

  var defaultBoardConfiguration = [4,2,4,1,3,1,3,0,2,0,2,1,1,4,3,0];
  var defaultPiecesDistribution = [3,3,3,4,3];

  this.setupBoard = function(board, configuration, dimension) {

    var game = this;
    board.innerHTML = '';
    var id = 0;

    for (var y = 0; y < dimension; y++) {
      var row = [];
      for (var x = 0; x < dimension; x++) {

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
          var x = parseInt(this.getAttribute('x'));
          var y = parseInt(this.getAttribute('y'));
          if (game.canPlacePiece(x,y)){

            // TODO: Check if legal to place

            var selectedPiece = game.selectedPiece;
            selectedPiece.className = 'piece-hidden';
            selectedPiece.setAttribute('isPlaced', true);

            var type = selectedPiece.getAttribute('type');
            var color = colors[type];
            this.setAttribute('isOpen', false);
            this.setAttribute('type', type);
            this.setAttribute('style', 'background:' + color);
            this.className += ' spot-on';

            game.selectedPiece = '';
            game.resetPieces();
            game.score++;
            game.updateCounter(game.score);
          }
        };

        if (x === 0){
          spot.className += ' spot-clear';
        }

        row.push(spot);
        board.appendChild(spot);
        id++;
      }
      this.board.push(row);
    }

  };

  this.resetPieces = function() {
    var game = this;

    for (var i = 0; i < game.pieces.length; i++){
      var piece = game.pieces[i];
      var isPlaced = piece.getAttribute('isPlaced');
      if (isPlaced === 'false'){
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

  this.canPlacePiece = function(x, y) {
    if (!this.selectedPiece)
      return false;

    var spot = this.board[y][x];
    if (spot.getAttribute('isOpen') === 'false')
      return false;

    var type = this.selectedPiece.getAttribute('type');
    var length = this.board.length;
    if (spot.getAttribute('type') === type)
      return false;
    if (y > 0 && this.board[y-1][x].getAttribute('type') === type)
      return false;
    if (y < length-1 && this.board[y+1][x].getAttribute('type') === type)
      return false;
    if (x > 0 && this.board[y][x-1].getAttribute('type') === type)
      return false;
    if (x < length-1 && this.board[y][x+1].getAttribute('type') === type)
      return false;
    if (x > 0 && y > 0 && this.board[y-1][x-1].getAttribute('type') === type)
      return false;
    if (x < length-1 && y > 0 && this.board[y-1][x+1].getAttribute('type') === type)
      return false;
    if (x > 0 && y < length-1 && this.board[y+1][x-1].getAttribute('type') === type)
      return false;
    if (x < length-1 && y < length-1 && this.board[y+1][x+1].getAttribute('type') === type)
      return false;

    return true;
  };

  this.updateCounter = function(score) {
    if (score === dimension * dimension)
      counter.innerHTML = score + ' Success!';
    else
      counter.innerHTML = score;
  };

  var dimension = 4;

  this.setupBoard(board, defaultBoardConfiguration, dimension);
  this.setupPieces(pieces, defaultPiecesDistribution);
  this.updateCounter(0);

})();
