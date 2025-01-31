class Artist{
    constructor(name,albums){
        this.name=name;
        this.albums=albums;
    }

    static findName(name){
        return new Artist(name);
    }

    getName(){
        return this.name;
    }

    getAlbums(){
        if(!this.albums){
            this.albums= [];
        }
        return this.albums;
    }
}
module.exports=Artist;