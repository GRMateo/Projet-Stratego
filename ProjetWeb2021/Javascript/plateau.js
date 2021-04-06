class plateau{
    constructor(){
        this.currentPlayer = 0; // Who is currently playing
        this.nbMoves=0;
        this.array1 = new Array(10); // As we need a 10*10 grid we create 10 columns
        this.createGrid();// Then we created 10 lines to have the 10*10 grid
        this.placePions();
    }

    getRandomInt(min,max){
        return Math.trunc(Math.random() * (max - min) + min);
    }

    createGrid(){ // We create a grid of 10*10
        for (let i = 0; i < 10; ++i)
        {
            this.array1[i] = new Array(10);
        }
    }

    placePions(){

        let tab_size = [1,1,1,2,3,4,4,4,5,8,1,6];

        for(let x = 0; x < 4; x++)
        {
            for(let y = 0; y < 10; y++)
            {
                let i;
                do{
                    i = this.getRandomInt(1,13);
                    if(i==1) this.array1[x][y] = new Pions(1, 1, "drapeau", 0, 1, 0, 1, 1, 1);
                    else if(i==2) this.array1[x][y] = new Pions(2, 1, "maréchal", 10, 1, 0, 1, 1, 0);
                    else if(i==3) this.array1[x][y] = new Pions(3, 1, "général", 9, 1,0, 1, 1, 0);
                    else if(i==4) this.array1[x][y] = new Pions(4, 2, "colonel", 8, 1, 0, 1, 1, 0);
                    else if(i==5) this.array1[x][y] = new Pions(5, 3, "commandant", 7, 1, 0, 1, 1, 0);
                    else if(i==6) this.array1[x][y] = new Pions(6, 4, "capitaine", 6, 1, 0, 1, 1, 0);
                    else if(i==7) this.array1[x][y] = new Pions(7, 4, "lieutenant", 5, 1, 0, 1, 1, 0);
                    else if(i==8) this.array1[x][y] = new Pions(8, 4, "sergent", 4, 1, 0, 1, 1, 0);
                    else if(i==9) this.array1[x][y] = new Pions(9, 5, "démineur", 3, 1, 0, 1, 1, 0);
                    else if(i==10) this.array1[x][y] = new Pions(10, 8, "éclaireur", 2, 1, 0, 1, 1, 0);
                    else if(i==11) this.array1[x][y] = new Pions(11, 1, "espion", 1, 1, 0, 1, 1, 0);
                    else if(i==12) this.array1[x][y] = new Pions(12, 6, "bombe", 11, 1, 0, 1, 1, 1);
                    tab_size[i-1]-=1;
                }
                while(tab_size[i-1] < 0)
            }
        }

        // Middle
        for(let x = 4; x < 6; x++)
        {
            for(let y = 0; y < 10; y++)
            {
                this.array1[x][y] = new Pions(0, -1, "Satan", -1, -1, -1, -1, -1, -1);
            }
        }
        // Second Player's pawns
        tab_size = [1,1,1,2,3,4,4,4,5,8,1,6];
        for(let x = 6; x < 10; x++)
        {
            for(let y = 0; y < 10; y++)
            {
                let i;
                do{
                    i = this.getRandomInt(1,13);
                    if(i==1) this.array1[x][y] = new Pions(1, 1, "drapeau", 0, 0, 1, 1, 1, 1);
                    else if(i==2) this.array1[x][y] = new Pions(2, 1, "maréchal", 10, 0, 1, 1, 1, 0);
                    else if(i==3) this.array1[x][y] = new Pions(3, 1, "général", 9, 0, 1, 1, 1, 0);
                    else if(i==4) this.array1[x][y] = new Pions(4, 2, "colonel", 8, 0, 1, 1, 1, 0);
                    else if(i==5) this.array1[x][y] = new Pions(5, 3, "commandant", 7, 0, 1, 1, 1, 0);
                    else if(i==6) this.array1[x][y] = new Pions(6, 4, "capitaine", 6, 0, 1, 1, 1, 0);
                    else if(i==7) this.array1[x][y] = new Pions(7, 4, "lieutenant", 5, 0, 1, 1, 1, 0);
                    else if(i==8) this.array1[x][y] = new Pions(8, 4, "sergent", 4, 0, 1, 1, 1, 0);
                    else if(i==9) this.array1[x][y] = new Pions(9, 5, "démineur", 3, 0, 1, 1, 1, 0);
                    else if(i==10) this.array1[x][y] = new Pions(10, 8, "éclaireur", 2, 0, 1, 1, 1, 0);
                    else if(i==11) this.array1[x][y] = new Pions(11, 1, "espion", 1, 0, 1, 1, 1, 0);
                    else if(i==12) this.array1[x][y] = new Pions(12, 6, "bombe", 11, 0, 1, 1, 1, 1);
                    tab_size[i-1]-=1;
                }
                while(tab_size[i-1] < 0)
            }
        }
        let plateau=document.getElementById("plateau");
        let tr, td;
        for(let i = 0; i < 10;i++){
            for (let j = 0; j < 10;j++)
            {
                if((i==4 || i ==5) && (j == 2 || j == 3 || j == 6 || j == 7)) {
                    td = tr.appendChild(document.createElement('td'));
                    td.className="eau";
                    td.value="0";
                }
                else{
                    if(this.array1[i][j].Id == 0)
                    {
                        if(j==0) 
                        {
                            plateau=document.getElementById("plateau");
                            tr = plateau.appendChild(document.createElement('tr'));
                            td = tr.appendChild(document.createElement('td'));
                            td.className="terre";
                            td.value="1";
                        }
                        else
                        {
                            td = tr.appendChild(document.createElement('td'));
                            td.className="terre";
                            td.value="1";
                        }
                    }
                    else
                    {
                        for(let z=1;z<13;z++){
                            if(j==0) {
                                if(this.array1[i][j].Id == z){
                                    plateau=document.getElementById("plateau");
                                    tr = plateau.appendChild(document.createElement('tr'));
                                    td = tr.appendChild(document.createElement('td'));
                                    td.className="terre"+z;
                                    td.value="1";
                                }
                            }
                            else{
                                if(this.array1[i][j].Id == z){
                                    td = tr.appendChild(document.createElement('td'));
                                    td.className="terre"+z;
                                    td.value="1";
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    getCaseState(x,y){ // Check if it's 'water' or 'terre'
        let grille = document.getElementById("plateau");
        if( grille.rows[x].cells[y].className != "eau")
        {
            return true;
        }
        return false;
    }

    getCurrentPlayer(){ // As we have only 2 players, by knowing who played first we know who is playing next
        return (this.nbMoves % 2);
    }


}