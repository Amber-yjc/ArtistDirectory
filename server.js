let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json()) 

app.use(express.static(path.join(__dirname)));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));    
});

//-----------------------these are used in fetch on clientside-------------------------

app.post('/addArtist', (req,res) => {
    fs.readFile('artists.json', function read(err, data) {
        if (err)
            throw err;

        let artists = JSON.parse(data);
        //req.body: name attributes in form is query 
        let newArtist = req.body;
        //give newArtist an id
        if(artists.length == 0)
            newArtist.id = 0;
        else    
            newArtist.id = artists[artists.length-1].id +1;
        //add to list
        artists.push(newArtist);
        //write the list to json file
        fs.writeFile('artists.json', JSON.stringify(artists), 'utf8', (err) =>{if (err) throw err;});
        //refresh the page, so it will load getArtist again
        res.redirect(301, "/");
    });
});

app.get('/getArtists', (req, res) => {
    fs.readFile('artists.json', function read(err,data){
        if (err)
            throw err;
        
        str = req.query.name;
        artistsList = JSON.parse(data);
        for (let i = 0; i<artistsList.length;)
            // if artist name in json is not in req.query.name, remove the artist from list
            if(artistsList[i].name.toLowerCase().indexOf(str.toLowerCase()) == -1)
                artistsList.splice(i, 1);
            else    
                ++i;
        //respond with artists with name = query.name
        res.send(artistsList);
    });
});

app.get('/deleteArtist', (req,res) => {
    //let content;   
    fs.readFile('artists.json', function read(err,data) {
        if(err)
            throw err;

        let id = req.query.id;
        let artists = JSON.parse(data);
        //if found id that needs to be delete, del then break
        for (let i = 0; i < artists.length; i++)
            if (artists[i].id == id)
                artists.splice(i,1);
                
        //rewrite the json file with updated list (with no deleted artist)
        fs.writeFile('artists.json', JSON.stringify(artists), 'utf8', (err) =>{if (err) throw err;});        
        res.send(artists);
    });
});


app.listen(process.env.PORT || 3000, 
    () => console.log("Express server listening on port %d", process.env.PORT || 3000));

