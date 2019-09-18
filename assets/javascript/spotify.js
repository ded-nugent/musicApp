
    


$(".form-search").submit(function(e) {

        let search = $("#newArtist").val()
        
        e.preventDefault();
        $("#relatedBand").empty();
        $("#events").empty();
        var find = ' ';
        var re = new RegExp(find, 'g');

        search1 = search.replace(re, '+');
        
        let accessToken = "BQDwwLauFW_DjkaeAG7lyz-JcZCYeWpTTQWZ7Mbk36lnl-sYBi7n0YQByE7Sww7etXFUgAmv62UrHsi130U_ZfNiGjROV0uHgm69pRZXbIOH4GrZ2H3c2fWQjZl2wfYuwg-CYimQh37owtLg1lhV9-M6xD0eVRs"
        let spotifyApi = 'https://api.spotify.com/v1/search?query=' + search1 + '&type=artist'
        $.ajax({
            url: spotifyApi,
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + accessToken
            },
            success: function(data) {
                console.log(data)
            }
        })
            .then(function(response){
                let spotifyId = response.artists.items[0].id;
                
                $("#genres").html("Genres: " + response.artists.items[0].genres.join(', '));
                $("#artistImage").attr("src", response.artists.items[0].images[0].url)
                
                $("#spotifyPlayer").attr("src", "https://open.spotify.com/embed/artist/"+ spotifyId )
                
            })
      
            
                let testUrlEvents = 'https://rest.bandsintown.com/artists/' + search1 + '/events?app_id=1e140eabdce95250b1ad6075934a113d'
                $.ajax({
                    url: testUrlEvents,
                    method: 'GET',
                })
                    .then(function(response){
                      //   console.log(response) 
                            for (i = 0; i < response.length; i++){
                                let city = response[i].venue.city
                                // console.log (city)
                                let date = moment(response[i].datetime).format('MMM Do');
                                //console.log(response[i].datetime)
                                let event = $('<li>').text(date + " " + city) 
                                event.attr({
                                    src: response[i].offers[0].url,
                                    class: 'eventClass'
            
                                })   
                                $('#events').append(event) 
                            }
                        })
                        $(document).on('click', '.eventClass', move)
  
                        function move() {
                            console.log($(this).attr('src'))
                            window.open($(this).attr('src'))
                        }
            
          
          let lastFM_URL= "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + search1 + "&api_key=f917c10d1df728ef9f74047a980fb96b&format=json";        
          let x = "";
      
          $.ajax({
              url: lastFM_URL,
              method: 'GET',
          })
              .then(function(response){
                //   console.log(response);
                  //console.log (response.artist.bio.summary);
                  let lastFMsummary = response.artist.bio.summary;
                  $('#bio').html(lastFMsummary);
                  $("#artistName").text(response.artist.name);
                  
                  for (let i = 0; i < 5; i++){
                      //console.log(response.artist.similar.artist[i])
                      
                      let relatedBand = $('<div>');
                            relatedBand.attr('class', 'relatedArtist')
    
                      let relatedBandPic = $('<img>')
                            relatedBandPic.attr('class', 'relatedArtistPic')
                      let relatedBandName = $('<p>')
                      let band = response.artist.similar.artist[i].name
                     console.log(response.artist.similar.artist)
                      let testUrl = 'https://rest.bandsintown.com/artists/' + band + '?app_id=1e140eabdce95250b1ad6075934a113d'
                      let bandPic = ''
                          $.ajax({
                              url: testUrl,
                              method: 'GET',
                          })
                              .then(function(response){
                                //   console.log(response) 
                                  
                                          bandPic = response.thumb_url  
                                        //   console.log(bandPic) 
                                          relatedBandPic.attr('src', bandPic)
                                          relatedBandName.text(band)
                                          relatedBandName.attr({
                                              class: 'link',
                                              'bandName': band,
                                          })
                                          relatedBand.append(relatedBandPic)
                                          relatedBand.append(relatedBandName)
                                          $('#relatedBand').append(relatedBand)
                                          $(document).on('click', '.link', relatedMove)
                  
                                          //$('#relatedBand').attr('class', 'border')
                                  })
                          }
                          
                    
                  })    
           function relatedMove() {
                    //   console.log($(this).attr('bandName'))
                     
                      
                      
                      let storeArtist = $(this).attr('bandName')
                      localStorage.setItem('artist', JSON.stringify(storeArtist))
                      let relatedArtistLocal = storage.getItem(artist)
                      $(".form-search").submit(function(){
                          
                      })
                    //   console.log(newArtist)
                  
                      location.href = 'artistPage.html'   
                  }       
    })





    
