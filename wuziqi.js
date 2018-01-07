function init() {

	setOnClickEvt();

	initBoardStatus();

};

//初始化棋盘状态
function initBoardStatus() {
	for (var y = 0; y <= model.boardMaxY; y++) {
		model.boardStatus[y] = [];
		for (var x = 0; x <= model.boardMaxX; x++) {
			model.boardStatus[y][x] = 0;
		}
	}

	//console.log(model.boardStatus);
};

//设置棋盘格子点击事件
function setOnClickEvt() {
	var tds = document.getElementsByTagName("td");
	for (var i = 0; i < tds.length; i++) {
		tds[i].onclick = function() {
			ctrl.chessPutted(this.id);
		}
		//console.log(tds[i].id);
		var coordinate = ctrl.transLocation(tds[i].id);
		model.boardMaxY = coordinate[0];
		model.boardMaxX = coordinate[1];
	}

	// console.log(model.boardMaxX);
	// console.log(model.boardMaxY);
};

window.onload = init;

var view = {
	whiteChessPutted: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class" , "whiteChess");
	},
	blackChessPutted: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class" , "blackChess");
	}
}


var ctrl = {

	transLocation: function (location) {
		var y = location.slice(0 , 2);
		var x = location.slice(2 , 4);
		var coordinate = [parseInt(x), parseInt(y)]
		return coordinate;
	},


	chessPutted: function (location) {

		if (model.isOver) {
			return false;
		}

		var coordinate = ctrl.transLocation(location);

 		var status = model.boardStatus[coordinate[1]][coordinate[0]];

 		// console.log(status);

 		if (status != 0) {
 			alert("请在空白处下子。");
 			return false;
 		}

		var chess = model.round % 2 + 1;

		model.boardStatus[coordinate[1]][coordinate[0]] = chess;
		model.round++;
 		
 		if(chess == model.blackChessColor){
			view.blackChessPutted(location);
 		} else if(chess == model.whiteChessColor) {
			view.whiteChessPutted(location);
 		}

 		if(this.judgeWin(coordinate, chess)) {
 			if(chess == model.blackChessColor) {
 				alert("黑子胜利！");
 			} else if(chess == model.whiteChessColor) {
 				alert("白子胜利！");
 			}
 			model.isOver = true;
 		}

	},

	judgeWin: function (coordinate, chess) {

		var _x = coordinate[0];
		var _y = coordinate[1];

		if(this.judgeXLine(_x, _y, chess) == model.targetCount 
		 	|| this.judgeYLine(_x, _y, chess) == model.targetCount 
		 	|| this.judgeXYLine(_x, _y, chess) == model.targetCount 
		 	|| this.judgeX_YLine(_x, _y, chess) == model.targetCount 
		 	) {
			return true;
		} else {
			return false;
		}

		// if(this.judgeXLine(_x, _y, chess) 
		//  	|| this.judgeYLine(_x, _y, chess) 
		//  	|| this.judgeXYLine(_x, _y, chess) 
		//  	|| this.judgeX_YLine(_x, _y, chess)
		//  	) {
		// 	return true;
		// } else {
		// 	return false;
		// }

	}, 

	judgeXLine: function (_x, _y, chess) {
		var count = 1;

		for (var x = _x + 1; x <= model.boardMaxX && x >= 0; x++) {
			if(model.boardStatus[_y][x] == chess) {
				count++;
			} else {
				break;
			}
		}

		for (var x = _x - 1; x <= model.boardMaxX && x >= 0; x--) {
			if(model.boardStatus[_y][x] == chess) {
				count++;
			} else {
				break;
			}
		}

		return count;

		// if(count == model.targetCount) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	},

	judgeYLine: function (_x, _y, chess) {
		var count = 1;

		for (var y = _y + 1; y <= model.boardMaxY && y >= 0; y++) {
			if(model.boardStatus[y][_x] == chess) {
				count++;
			} else {
				break;
			}
		}

		for (var y = _y - 1; y <= model.boardMaxY && y >= 0; y--) {
			if(model.boardStatus[y][_x] == chess) {
				count++;
			} else {
				break;
			}
		}

		return count;

		// if(count == model.targetCount) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	},

	judgeXYLine: function (_x, _y, chess) {
		var count = 1;

		for (var x = _x + 1, y = _y + 1; x <= model.boardMaxX && x >= 0 && y <= model.boardMaxY && y >= 0; x++,y++) {
			if(model.boardStatus[y][x] == chess) {
				count++;
			} else {
				break;
			}
		}

		for (var x = _x - 1, y = _y - 1; x <= model.boardMaxX && x >= 0 && y <= model.boardMaxY && y >= 0; x--,y--) {
			if(model.boardStatus[y][x] == chess) {
				count++;
			} else {
				break;
			}
		}

		return count;

		// if(count == model.targetCount) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	},

	judgeX_YLine: function (_x, _y, chess) {
		var count = 1;

		for (var x = _x + 1, y = _y - 1; x <= model.boardMaxX && x >= 0 && y <= model.boardMaxY && y >= 0; x++,y--) {
			if(model.boardStatus[y][x] == chess) {
				count++;
			} else {
				break;
			}
		}

		for (var x = _x - 1, y = _y + 1; x <= model.boardMaxX && x >= 0 && y <= model.boardMaxY && y >= 0; x--,y++) {
			if(model.boardStatus[y][x] == chess) {
				count++;
			} else {
				break;
			}
		}

		return count;

		// if(count == model.targetCount) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	}

}

var model = {

    // boardMaxX : 0,
    // boardMaxY : 0,

	blackChessColor: 1, //1黑2白
	whiteChessColor: 2,
	targetCount : 5,

	boardStatus : [],
	round : 0,
	isOver : false

}

