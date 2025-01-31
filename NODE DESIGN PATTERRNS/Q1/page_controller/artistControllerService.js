const express=require('express');
const path=require('path');
const ArtistRepository=require('./artistRepository');


const app=express();
app.set('view engine', 'ejs');
const port=3000;


const artistRepo= new ArtistRepository();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/artistController', (req,res) =>{
        const artistName=req.query.name || 'default name';

        const artist= artistRepo.queryArtist(artistName);

        if(!artist){
            return res.render('missingdataView');
        }

        res.render('artistView', {artist});
       }
);

app.get('/', (req, res) => {
    res.redirect('/artistQuery.html');
});

app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
})