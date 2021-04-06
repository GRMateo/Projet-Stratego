class plateauJoueur{
    constructor(player){
        this.Player = player; // 0 = player 1 and 1 = player 2
        this.array1 = new Array(4); // grid that will contain the pawns
        this.createGrid(); //  We create the columns of that grid
        this.placePions();
    }

    createGrid(){ // We create the grid that will contain the pawns : here we create the columns
        for (let i = 0; i < 4; ++i)
        {
            this.array1[i] = new Array(10);
        }
    }

    placePions(){
        let plateau=document.getElementById("plateau"); // We recover the informations of the plateau
        let tr, td;
        for(let i = 0; i < 4;i++) // Lines
        {
            for (let j = 0; j < 10;j++) // Columns
            {
                plateau=document.getElementById("plateau"); // We recover the informations of the plateau
                if(j==0)
                {
                    tr = plateau.appendChild(document.createElement('tr')); // If that's a new line then we change the line
                }
                
                td = tr.appendChild(document.createElement('td')); // We create a new case of the grid
                td.className="terre";
                td.value="1";
            }
        }
        let plateau1=document.getElementById("plateau1"); // Here we are dealing with the available pawns grid
        tr = plateau1.appendChild(document.createElement('tr'));
        for(let i = 0; i < 12;i++) // 12 different pawns
        {
            plateau1=document.getElementById("plateau1");
            td = tr.appendChild(document.createElement('td')); // Meaning 12 cases
            td.className="terre"+(i+1); // This is all about our css, we use terre + a number as a way to display our pawn
        }
    }
}