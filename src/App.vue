<template>
  <div id="app">
	  <div class="hex-grid">
			<div class="row" v-for="(row, y) in ourState" :key="y">
				<div @click="select(col, x, y)" class="col" v-for="(col, x) in row" :key="x">
					<img :class="hexClasses(x,y)" src="hex.png" height="80px"/>
					<img :class="pieceClasses(col.owner, x, y)" :src="isLegalMove(x,y)? 'circle.png' : col.img" height="45px"/>
				</div>
			</div>
	  </div>
	  
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
	return {
		state:[
			[{}, {}, {}, {}, {
				type:"base",
				owner:1,
				hp:100
			}, {}, {}, {}, {}],
			[{}, {}, {
				type:"destroyer",
				owner:1,
				hp:100
			}, {
				type:"scout",
				owner:1,
				hp:100
			}, {
				type:"fighter",
				owner:1,
				hp:100
			}, {
				type:"carrier",
				owner:1,
				hp:100
			}, {
				type:"gunship",
				owner:1,
				hp:100
			}, {}, {}],
			[{}, {}, {}, {}, {}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}, {}, {}, {}, {}],
			[{}, {}, {
				type:"destroyer",
				owner:0,
				hp:100
			}, {
				type:"scout",
				owner:0,
				hp:100
			}, {
				type:"fighter",
				owner:0,
				hp:100
			}, {
				type:"carrier",
				owner:0,
				hp:100
			}, {
				type:"gunship",
				owner:0,
				hp:100
			}, {}, {}],
			[{}, {}, {}, {}, {
				type:"base",
				owner:0,
				hp:100
			}, {}, {}, {}, {}],	  
		],
		playerNumber: 0,
		selected:undefined
	}
  },
  computed:{
	  ourState () {
		  return this.state.map(row => {
			  return row.map(col => {
				if(col.type === "base") {
					col.img = "/base.png"
				}
				else if(col.type == "fighter") {
					col.img = "/fighter.png"
				}
				else if(col.type == "scout") {
					col.img = "/scout.png"
				}
				else if(col.type == "destroyer") {
					col.img = "/destroyer.png"
				}
				else if(col.type == "carrier") {
					col.img = "/carrier.png"
				}
				else if(col.type == "gunship") {
					col.img = "/gunship.png"
				}
				return col
			  })
		  })
	  },
	  legalMoves() {
		  if(!this.selected) {
			  return []
		  } else {
			  let x = this.selected.x
			  let y = this.selected.y
			  const isEven = y % 2  == 0
			  let legalMoves = [
				  { x, y: y - 1 },
				  { x: x + 1, y: y - 1 },
				  { x: x + 1, y },
				  { x: x + 1, y: y + 1 },
				  { x, y: y + 1 },
				  { x: x - 1, y } 
			  ]
			  if(isEven) {
				  legalMoves[0].x -= 1;
				  legalMoves[1].x -= 1;
				  legalMoves[3].x -= 1;
				  legalMoves[4].x -= 1;
			  }
			  return legalMoves
			  	.filter(move => {
				  const minX = 0
				  const minY = 0
				  const maxY = this.state.length-1
				  const maxX = this.state[0].length-1
				  return move.x >= minX && move.x <= maxX && move.y >= minY && move.y <= maxY
			  	})
				.filter(move => !this.isOccupied(move.x, move.y))
		  }
	  }
  },
  methods: {
	  isLegalMove(x,y) {
		  return this.legalMoves.filter(move => move.x === x && move.y === y).length > 0
	  },
	  pieceClasses(owner, x, y) {
		  let classes = "col-piece "
		  
		  if(owner && owner != this.playerNumber) {
			classes += "enemy "
		  }

		  return classes;
	  },
	  hexClasses(x,y) {
		let classes = "hex-parcel "

		if(this.selected && this.selected.x === x && this.selected.y === y) {
			classes += "selected "
		}

		return classes
	  },
	  select(piece, x, y) {
		  if(piece.type && piece.type != "base") {
			  if(piece.owner === this.playerNumber){
				if(this.selected && this.selected.x === x && this.selected.y === y) {
					this.selected = undefined
				} else {
					this.selected = {
						x,
						y
					}
				}
			  }
		  }  else if(this.isLegalMove(x,y)) {
			console.log(x,y)
			const newState = [...this.state]
			newState[y][x] = newState[this.selected.y][this.selected.x]
			newState[this.selected.y][this.selected.x] = {}
			this.state = newState
			this.selected = undefined
		}
	  },
	  isOccupied(x,y) {
		return this.ourState[y][x].type ? true : false
	  }
  }
}
</script>

<style>
body, html {
	margin: 0;
	padding: 0;
}
#app {
	background-color: black;
	margin: 0px;
	min-height: 100vh;
}
h1 {
	margin: 0;
}
.hex-grid {
	margin:0 auto;
}
.row {
	display: block;
}
.row:nth-child(even) {
	transform:translateX(35px);
	margin-top:-25px;
	margin-bottom:-25px;
}
.col {
	display: inline;
	position: relative;
	cursor: pointer;
	
}
.hex-parcel {
	filter:invert();
	opacity: 0.3;
}
.col:hover .hex-parcel {
	opacity: 1;
	
}
.col-piece {
	position: absolute;
	opacity: 1 !important;
	left: 12.5px;
	bottom: 17.5px;
}
.enemy {
	filter: sepia(1) hue-rotate(270deg) saturate(100);
}
.selected {
	opacity:1
}
</style>
