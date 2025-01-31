
class Artist{
    constructor(name= 'default name',albums){
        this.name=name;
        this.albums=albums;
    }

    
    //static method to createan instance of artist by name
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

    setName(str){
        this.name=str;
    }

    setAlbum(alb){
        this.albums.push(alb);
    }
}
module.exports=Artist;