class plateau{
    constructor(){
        this.Player =1; // 0 = player 1 and 1 = player 2
        this.array1 = new Array(10); // As we need a 10*10 grid we create 10 columns
        this.createGrid();
        this.placePions();
    }

    createGrid(){ // We create a grid of 10*10
        for (let i = 0; i < 4; ++i)
        {
            this.array1[i] = new Array(10);
        }
    }

    placePions(){

        let plateau=document.getElementById("plateau");
        let tr, td;
        if(this.Player==0)
        {
            for(let i = 0; i < 4;i++)
            {
                for (let j = 0; j < 10;j++)
                {
                    plateau=document.getElementById("plateau");
                    if(j==0)
                    {
                        tr = plateau.appendChild(document.createElement('tr'));
                    }
                    
                    td = tr.appendChild(document.createElement('td'));
                    td.className="terre";
                    td.value="1";
                }
            }
            let plateau1=document.getElementById("plateau1");
            tr = plateau1.appendChild(document.createElement('tr'));
            for(let i = 0; i < 12;i++)
            {
                plateau1=document.getElementById("plateau1");
                td = tr.appendChild(document.createElement('td'));
                td.className="terre"+(i+1);
            }
        }
        else if(this.Player==1)
        {
            for(let i = 0; i < 4;i++)
            {
                for (let j = 0; j < 10;j++)
                {
                    plateau=document.getElementById("plateau");
                    if(j==0)
                    {
                        tr = plateau.appendChild(document.createElement('tr'));
                    }

                    td = tr.appendChild(document.createElement('td')); 
                    td.className="terre";
                    td.value="1";
                }
            }
            let plateau1=document.getElementById("plateau1");
            tr = plateau1.appendChild(document.createElement('tr'));
            for(let i = 0; i < 12;i++)
            {
                plateau1=document.getElementById("plateau1");
                td = tr.appendChild(document.createElement('td'));
                td.className="terre"+(i+1);
            }
        }
    }
}