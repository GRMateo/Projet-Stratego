class Game {

    constructor(game, name) { // Default constructor
        this.name = name;
        this.game = game;
        this.click1 = [];
        this.click2 = [];
        this.pawnsEaten = [];
        this.listeneur(); // We call the listeners
    }

    listeneur(){
        let tab = document.getElementById("plateau");
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                tab.rows[i].cells[j].addEventListener('click', () => {
                    if ((this.click1[0] > -1) && (this.click1[1] > -1)){
                        this.click2 = [i, j];
                        let player = this.game.getCurrentPlayer();
                        if (this.game.getCaseState(i, j) && (this.isImo()==false) && (this.column() || this.line()) && this.verifCase(player))
                        {
                            this.game.nbMoves++;
                        }
                        else{
                            this.click1 = [-3, -3];
                            this.click2 = [-3, -3];
                        }
                    }
                    else{
                        this.click1 = [i, j]; 
                    }
                });
            }
        }
    }     

    isImo(){
        let x=this.click1[0];
        let y=this.click1[1];
        if(this.game.array1[x][y].Imo==1) return true;
        else return false;
    }

    column(){
        if(((this.click2[0]==this.click1[0]-1) || (this.click2[0]==this.click1[0]+1)) && (this.click2[1]==this.click1[1])){
            return true;
        }
        return false;
    }

    line(){
        if(((this.click2[1]==this.click1[1]-1) || (this.click2[1]==this.click1[1]+1)) && (this.click2[0]==this.click1[0])){
            return true;
        }
        return false;
    }

    deleteCase(param){
        let x=this.click1[0];
        let y=this.click1[1];
        let a=this.click2[0];
        let b=this.click2[1];
        let tab = document.getElementById("plateau");
        if(param==0){
            tab.rows[a].cells[b].className = "terre"+this.game.array1[x][y].Id;
            tab.rows[x].cells[y].className = "terre";
            this.game.array1[a][b] = this.game.array1[x][y];
            this.game.array1[x][y] = new Pions(0, -1, "Satan", -1, -1, -1, -1, -1, -1);
        }
        else if(param==1){
            tab.rows[x].cells[y].className = "terre";
            this.pawnsEaten.push(this.game.array1[x][y]);
            this.game.array1[x][y] = new Pions(0, -1, "Satan", -1, -1, -1, -1, -1, -1);
        }
        else if(param==2){
            if (this.game.array1[a][b].Name == "drapeau"){
                if (this.game.array1[a][b].Player1 == 1) {
                    console.log("Joueur 2 a gagné");
                }
                else if (this.game.array1[a][b].Player2 == 1) {
                    console.log("Joueur 1 a gagné");
                }
            }
            tab.rows[a].cells[b].className = "terre"+this.game.array1[x][y].Id;
            tab.rows[x].cells[y].className = "terre";
            this.pawnsEaten.push(this.game.array1[a][b]);
            this.game.array1[a][b] = this.game.array1[x][y];
            this.game.array1[x][y] = new Pions(0, -1, "Satan", -1, -1, -1, -1, -1, -1);
        }
        else if(param==3){
            tab.rows[a].cells[b].className = "terre";
            tab.rows[x].cells[y].className = "terre";
            this.pawnsEaten.push(this.game.array1[x][y]);
            this.pawnsEaten.push(this.game.array1[a][b]);
            this.game.array1[x][y] = new Pions(0, -1, "Satan", -1, -1, -1, -1, -1, -1);
            this.game.array1[a][b] = new Pions(0, -1, "Satan", -1, -1, -1, -1, -1, -1);
        }
        this.click1 = [-3, -3];
        this.click2 = [-3, -3];
    }

    verifCase(player){
        let x=this.click1[0];
        let y=this.click1[1];
        let a=this.click2[0];
        let b=this.click2[1];
        if(((this.game.array1[x][y].Player1 == 1 && player == 0) && ((this.game.array1[a][b].Player2 == 1 && player == 0) || this.game.array1[a][b].Name==("Satan"))) || ((this.game.array1[x][y].Player2 == 1 && player == 1) && ((this.game.array1[a][b].Player1 == 1 && player == 1) || this.game.array1[a][b].Name==("Satan"))))
        {   
            if(this.game.array1[a][b].Name==("Satan"))
            {
                this.deleteCase(0);
                return true;
            }
            else{
                if(this.game.array1[x][y].Grade < this.game.array1[a][b].Grade)
                {
                    if(this.game.array1[a][b].Name=="bombe")
                    {
                        if(this.game.array1[x][y].Name=="démineur")
                        {
                            this.deleteCase(2);
                            return true;
                        }
                        else
                        {
                            this.deleteCase(3);
                            return true;
                        }
                    }
                    else
                    {
                        this.deleteCase(1);
                    }
                    return true;
                }
                else if(this.game.array1[x][y].Grade > this.game.array1[a][b].Grade)
                {
                    this.deleteCase(2);
                    return true;
                }
                else
                {
                    this.deleteCase(3);
                    return true;                
                } 
            }
        }
        else {
            return false;
        }
    }

}