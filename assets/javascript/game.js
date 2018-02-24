//declare variables
var player;
var opponent;
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
                hp: 50,
                attack: 20        
                }, {
                name: 'Squirtle',
                type: 'water',
                hp: 50,
                attack: 20
            }, {
                name: 'Bulbasaur',
                type: 'grass',
                hp: 50,
                attack: 20            
            }]
    }, 
    //index 1
    {
        name: 'Gary',
        pokemon: [{
            name: 'Cyndaquil',
            type: 'fire',
            hp: 50,
            attack: 20        
        }, {
            name: 'Totodile',
            type: 'water',
            hp: 50,
            attack: 20
        }, {
            name: 'Chikorita',
            type: 'grass',
            hp: 50,
            attack: 20            
        }]
    }, 
    //index 2
    {
        name: 'May',
        pokemon: [{
            name: 'Torchic',
            type: 'fire',
            hp: 50,
            attack: 20        
        }, {
            name: 'Mudkip',
            type: 'water',
            hp: 50,
            attack: 20
        }, {
            name: 'Treecko',
            type: 'grass',
            hp: 50,
            attack: 20            
        }]
    }, 
    //index 3
    {
        name: 'Brock',
        pokemon: [{
            name: 'Chimchar',
            type: 'fire'],
            hp: 1000,
            attack: 65       
        }, {
            name: 'Piplup',
            type: 'water',
            hp: 700,
            attack: 95
        }, {
            name: 'Turtwig',
            type: 'grass',
            hp: 850,
            attack: 80            
        }]
    }]

$('document').ready(function() {
    //user clicks on character
    $('.characters').on('click', function() {      
        // if (first choice) 
        if (numChoice === 0) { 
            // grab player html
            playerCard = $(this);
            // change card background and animate
            $(this).css({'background-color': 'yellow'});
            $(this).animate({top: '40px'}, 'fast');
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
            // change card background and animate
            $(this).css({'background-color': '#e51640'}); 
            $(this).animate({top: '40px'}, 'fast') ;      
            $('h2').text('Is this correct?');
            $(this).prepend('<span id=\'opponent\'>Opponent</span>');
            opponent = $(this).data('name'); 
            $('#buttonHolder').append('<button id=\'battleButton\'>Let\'s Battle!</button>');         
            $('#buttonHolder').append('<button id=\'resetButton\'>Choose Again</button>');
            numChoice++      
        }
        else{}
    })

    $(document).on('click', '#resetButton', reset);

    function reset() {
        $('h2').html('Choose your <span id=\'trainer\'>trainer</span>');
        $(playerCard).css({'background-color': 'white'});
        $(opponentCard).css({'background-color': 'white'});
        $(playerCard).animate({'top': '0px'});
        $(opponentCard).animate({'top': '0px'});
        $('#opponent').remove();
        $('#player').remove();
        $('#battleButton').remove();
        $('#resetButton').remove();
        numChoice = 0;
    }      
});