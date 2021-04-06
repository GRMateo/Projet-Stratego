class Game {

    constructor(game, name) { // Default constructor
        this.name = name;
        this.game = game;
        this.click1 = [];
        this.click2 = [];
        this.tab_size = [1,1,1,2,3,4,4,4,5,8,1,6];
        this.grid = new Array(12);
        this.arrayPlayer = new Array(4);
        this.fulfillGrid();
        this.listeneur(); // We call the listeners
    }

    fulfillGrid(){
        for(let i=0;i<12;i++)
        {
            this.grid = i;
            if(i<4)
            {
                this.arrayPlayer[i] = new Array(10);
            }
        }
    }

    listeneur(){
        let tab = document.getElementById("plateau");
        let tab1 = document.getElementById("plateau1");

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 10; j++) {
                tab.rows[i].cells[j].addEventListener('click', () => {
                    if(this.verifCase(this.click1[0])==true && this.caseEmpty(i, j)==true)
                    {
                        this.click2 = [i, j];
                        this.placeCase();
                    }
                });
            }
        }
        for (let j = 0; j < 12; j++) {
            tab1.rows[0].cells[j].addEventListener('click', () => {   
                if(this.verifCase(j)==true)
                {
                    this.click1[0] = j;
                }
            });
        }
    }

    caseEmpty(i, j)
    {
        if(this.game.array1[i][j] != undefined) return false;
        else return true;
    }

    verifCase(x){
        if(x>-1)
        {
            if(this.tab_size[x]>0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }

    }

    placeCase(){
        let i=this.click1[0];
        let x=this.click2[0];
        let y=this.click2[1];
        if(i==0) this.game.array1[x][y] = new Pions(1, 1, "drapeau", 0, 1, 0, 1, 1, 1);
        else if(i==1) this.game.array1[x][y] = new Pions(2, 1, "maréchal", 10, 1, 0, 1, 1, 0);
        else if(i==2) this.game.array1[x][y] = new Pions(3, 1, "général", 9, 1,0, 1, 1, 0);
        else if(i==3) this.game.array1[x][y] = new Pions(4, 2, "colonel", 8, 1, 0, 1, 1, 0);
        else if(i==4) this.game.array1[x][y] = new Pions(5, 3, "commandant", 7, 1, 0, 1, 1, 0);
        else if(i==5) this.game.array1[x][y] = new Pions(6, 4, "capitaine", 6, 1, 0, 1, 1, 0);
        else if(i==6) this.game.array1[x][y] = new Pions(7, 4, "lieutenant", 5, 1, 0, 1, 1, 0);
        else if(i==7) this.game.array1[x][y] = new Pions(8, 4, "sergent", 4, 1, 0, 1, 1, 0);
        else if(i==8) this.game.array1[x][y] = new Pions(9, 5, "démineur", 3, 1, 0, 1, 1, 0);
        else if(i==9) this.game.array1[x][y] = new Pions(10, 8, "éclaireur", 2, 1, 0, 1, 1, 0);
        else if(i==10) this.game.array1[x][y] = new Pions(11, 1, "espion", 1, 1, 0, 1, 1, 0);
        else if(i==11) this.game.array1[x][y] = new Pions(12, 6, "bombe", 11, 1, 0, 1, 1, 1);
        
        let tab = document.getElementById("plateau");
        tab.rows[x].cells[y].className = "terre"+this.game.array1[x][y].Id;

        this.tab_size[i] -=1;
        if(this.tab_size[i]==0)
        {
            let tab1 = document.getElementById("plateau1");
            tab1.rows[0].cells[i].className = "terre";
        }
        this.click2 = [-3, -3];
    }

}