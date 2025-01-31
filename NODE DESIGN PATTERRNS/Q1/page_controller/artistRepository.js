const Artist= require('./domain/artist');


class ArtistRepository{
    constructor(){
        this.artistDB={
            'Pink Floyd': ['Wish You Were Here', 'Dark Side Of The Moon', 'The Wall'],
            'The Beatles': ['Abbey Road', 'Let it be', 'Help!', 'Please Please Me', ' Yellow Submaring'],
            'Billie Eilish': ['dont smile at me', 'WHEN WE ALL FALL ASLEEP WHERE DO WE GO?','Happier Than Ever', 'Hit Me Hard and Soft']
        };
    }

queryArtist(artistName){

    if(this.artistDB[artistName]){
        return new Artist(artistName, this.artistDB[artistName]);
    }
        return null;
    }
}
module.exports = ArtistRepository