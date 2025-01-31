class Album {
    constructor(name, songs) {
        this.name = name;
        this.songs = songs; 
    }

    getName(){
        return this.name;
    }
    getSongs(){
        if(!this.songs){
            this.songs= [];
        }
        return this.songs;
    }
   
}

module.exports = Album;