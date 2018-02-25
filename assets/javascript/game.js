//declare variables
var player;
var opponent;
var playerPoke1;
var playerPoke2;
var playerPoke3;
var compPoke1;
var compPoke2;
var compPoke3;
var numChoice = 0;
var playerCard;
var opponentCard;
var trainer = [

    //index 0
    {
        name: 'Ash',
        pokemon: [{
                name: 'Charmander',
                type: 'fire',
                hp: 100,
                attack: 25,   
                img: 'assets/images/charmander.png'
                }, {
                name: 'Squirtle',
                type: 'water',
                hp: 100,
                attack: 25,
                img: 'assets/images/squirtle.png'
            }, {
                name: 'Bulbasaur',
                type: 'grass',
                hp: 100,
                attack: 25, 
                img: 'assets/images/bulbasaur.png'    
            }]
    }, 
    //index 1
    {
        name: 'Gary',
        pokemon: [{
            name: 'Cyndaquil',
            type: 'fire',
            hp: 100,
            attack: 25,        
            img: 'assets/images/cyndaquil.png'
        }, {
            name: 'Totodile',
            type: 'water',
            hp: 100,
            attack: 25,
            img: 'assets/images/totodile.png' 
        }, {
            name: 'Chikorita',
            type: 'grass',
            hp: 100,
            attack: 25,      
            img: 'assets/images/chikorita.png'       
        }]
    }, 
    //index 2
    {
        name: 'May',
        pokemon: [{
            name: 'Torchic',
            type: 'fire',
            hp: 100,
            attack: 25,  
            img: 'assets/images/torchic.png'       
        }, {
            name: 'Mudkip',
            type: 'water',
            hp: 100,
            attack: 25,
            img: 'assets/images/mudkip.png'
        }, {
            name: 'Treecko',
            type: 'grass',
            hp: 100,
            attack: 25,        
            img: 'assets/images/treecko.png'    
        }]
    }, 
    //index 3
    {
        name: 'Brock',
        pokemon: [{
            name: 'Chimchar',
            type: 'fire',
            hp: 100,
            attack: 25,
            img: 'assets/images/chimchar.png'      
        }, {
            name: 'Piplup',
            type: 'water',
            hp: 100,
            attack: 25,
            img: 'assets/images/piplup.png'
        }, {
            name: 'Turtwig',
            type: 'grass',
            hp: 100,
            attack: 25,
            img: 'assets/images/turtwig.png'          
        }]
    }]

$('document').ready(function() {
    $('.characters').hover(hoverOnCSS, hoverOffCSS);

    //user character choices
    $('.characters').on('click', function() {      
        // if (first choice) 
        if (numChoice === 0) { 
            // grab player html
            playerCard = $(this);
            $(this).prepend('<span id=\'player\'>Player</span>');     
            $('#trainer').text('opponent');
            $('#trainer').css('color', '#e51640');
            // set the chosen trainer to global var and increment numChoice
            player = $(this).data('name');
            numChoice++;
        }
        // else if (second choice && not player character)
        else if (numChoice === 1 && $(this).data('name') !== player) {
            // grab opponent html
            opponentCard = $(this);
            $('h2').text('Is this correct?');
            $(this).prepend('<span id=\'opponent\'>Opponent</span>');
            opponent = $(this).data('name'); 
            $('#buttonHolder').append('<button id=\'battleButton\'>Let\'s Battle!</button>');         
            $('#buttonHolder').append('<button id=\'resetButton\'>Choose Again</button>');
            numChoice++      
        }
        else{}
    })

    // Choose Again button call reset() on click
    $(document).on('click', '#resetButton', reset);

    // Let's Battle button click
    $(document).on('click', '#battleButton', function() {
        $('.characters').animate({opacity: '0'}, 200);
        $('h2').animate({opacity: '0'}, 300);
        $('button').animate({opacity: '0'}, 300);
        $('h1').animate({opacity: '0'}, 300);    
        setTimeout(function() {
            // remove .characters, h2, and buttons after animation finishes. 
            $('.characters').remove();
            $('h2').remove();
            $('button').remove();
            // update h1 and move chosen characters to .battleArena
            $('.container').after('<div class="battleArena"></div>');
            $('h1').html('BATTLE!');
            $('h1').css('font-size', '3em');
            $('h1').animate({opacity: '100'}, 2000);
            $(playerCard).appendTo('.battleArena');
            $(playerCard).animate({opacity: '100'}, 2000);
            $(playerCard).css('float', 'left');
            $(playerCard).attr('id', 'playerCharacter')
            $(opponentCard).css('float', 'right');
            $(opponentCard).appendTo('.battleArena');
            $(opponentCard).animate({opacity: '100'}, 2000);   
            $(opponentCard).attr('id', 'computer')
            // set character and pokemon variables
            setCharacters();
            setPokemon();
            // create player pokemon image element
            $('.characters:first-of-type').append('<img id="playerPokeImg">');
            $('#playerPokeImg').css('opacity', '0');
            $('#playerPokeImg').animate({opacity: '100'}, 2000);
            $('#playerPokeImg').attr('src', playerPoke1.img);
            // show hp
            $('#playerPokeImg').after('<p id="playerhp">HP: <span id="playerhpSpan">' + player.pokemon[0].hp + '</span></p>')
            // create computer pokemon image element
            $('.characters:last-of-type').append('<img id="computerImg">');
            $('#computerImg').css('opacity', '0');
            $('#computerImg').animate({opacity: '100'}, 2000);
            $('#computerImg').attr('src', compPoke1.img);
            $('#computerImg').after('<p id="computerhp">HP: <span id="computerhpSpan">' + opponent.pokemon[0].hp + '</span></p>')
        }, 500);

        // 

    });

    //resets game
    function reset() {
        $('h2').html('Choose your <span id=\'trainer\'>trainer</span>');
        $(playerCard).css({'background-color': 'white'});
        $(opponentCard).css({'background-color': 'white'});
        $(playerCard).animate({'top': '0px'}, 250);
        $(opponentCard).animate({'top': '0px'}, 250);
        $('#opponent').remove();
        $('#player').remove();
        $('#battleButton').remove();
        $('#resetButton').remove();
        numChoice = 0;
    } 

    //places player and computer objects to variables
    function setCharacters() {
        //set player character object
        if (player === trainer[0].name) {
            player = trainer[0];
        }
        else if (player === trainer[1].name) {
            player = trainer[1];
        }
        else if (player === trainer[2].name) {
            player = trainer[2];
        }
        else {
            player = trainer[3];
        }
        //set computer character object
        if (opponent === trainer[0].name) {
            opponent = trainer[0];
        }
        else if (opponent === trainer[1].name) {
            opponent = trainer[1];
        }
        else if (opponent === trainer[2].name) {
            opponent = trainer[2];
        }
        else {
            opponent = trainer[3];
        }        
    } 

    //places player and computer pokemon objects to variables
    function setPokemon() {
        //player pokemon
        playerPoke1 = player.pokemon[0];
        playerPoke2 = player.pokemon[1];
        playerPoke3 = player.pokemon[2];
        //computer pokemon
        compPoke1 = opponent.pokemon[0];
        compPoke2 = opponent.pokemon[1];
        compPoke3 = opponent.pokemon[2];
    }

    function hoverOnCSS() {
        if (numChoice === 0) { 
            // change card background and animate
            $(this).css({'background-color': 'yellow'});
            $(this).animate({top: '40px'}, 150);
        }
        else if (numChoice === 1 && $(this).data('name') !== player) {
            $(this).css({'background-color': '#e51640'}); 
            $(this).animate({top: '40px'}, 150);     
        }
    }

    function hoverOffCSS() {
        if (numChoice === 0) { 
            // change card background and animate
            $(this).css({'background-color': 'white'});
            $(this).animate({top: '0px'}, 150);
        }
        else if (numChoice === 1 && $(this).data('name') !== player) {
            $(this).css({'background-color': 'white'}); 
            $(this).animate({top: '0px'}, 150);     
        }       
    }
});

