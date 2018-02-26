//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var player;
var opponent;
var playerPoke1;
var playerPoke2;
var playerPoke3;
var compPoke1;
var compPoke2;
var compPoke3;
var activePlayerPoke;
var activeOpponentPoke;
var numChoice = 0;
var playerCard;
var opponentCard;
var alivePokemon = [];
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
            img: 'assets/images/totodile.jpg'
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
    }
]
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//resets game
function reset() {
    $('h2').html('Choose your <span id=\'trainer\'>trainer</span>');
    $(playerCard).css({
        'background-color': 'white'
    });
    $(opponentCard).css({
        'background-color': 'white'
    });
    $(playerCard).animate({
        'top': '0px'
    }, 250);
    $(opponentCard).animate({
        'top': '0px'
    }, 250);
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
    } else if (player === trainer[1].name) {
        player = trainer[1];
    } else if (player === trainer[2].name) {
        player = trainer[2];
    } else {
        player = trainer[3];
    }
    //set computer character object
    if (opponent === trainer[0].name) {
        opponent = trainer[0];
    } else if (opponent === trainer[1].name) {
        opponent = trainer[1];
    } else if (opponent === trainer[2].name) {
        opponent = trainer[2];
    } else {
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
        $(this).css({
            'background-color': 'yellow'
        });
        $(this).animate({
            top: '40px'
        }, 150);
    } else if (numChoice === 1 && $(this).data('name') !== player) {
        $(this).css({
            'background-color': '#e51640'
        });
        $(this).animate({
            top: '40px'
        }, 150);
    }
}

function hoverOffCSS() {
    if (numChoice === 0) {
        // change card background and animate
        $(this).css({
            'background-color': 'white'
        });
        $(this).stop(true, false).animate({
            top: '0px'
        }, 150);
    } else if (numChoice === 1 && $(this).data('name') !== player) {
        $(this).css({
            'background-color': 'white'
        });
        $(this).stop(true, false).animate({
            top: '0px'
        }, 150);
    }
}

function chooseRandomPokemon() {
    alivePokemon = [];
    //choose only alive pokemon
    for (var i = 0; i < opponent.pokemon.length; i++) {
        if (opponent.pokemon[i].hp > 0) {
            alivePokemon.push(opponent.pokemon[i]);
        } else {}
    }
    if (alivePokemon != 0) {
        activeOpponentPoke = alivePokemon[Math.floor(Math.random() * alivePokemon.length)];
    }
}

function setOppActivePoke() {
    $('#computerImg').attr('src', activeOpponentPoke.img);
    $('#computerhp').text('HP: ' + activeOpponentPoke.hp);
}

function setPlayerActivePoke() {
    $('#playerPokeImg').attr('src', activePlayerPoke.img);
    $('#playerhp').text('HP: ' + activePlayerPoke.hp);
}

function playerAttack() {
    var origHP = activeOpponentPoke.hp;
    // not very effective
    if ((activePlayerPoke.type === activeOpponentPoke.type) ||
        (activePlayerPoke.type === 'fire' && activeOpponentPoke.type === 'water') ||
        (activePlayerPoke.type === 'water' && activeOpponentPoke.type === 'grass') ||
        (activePlayerPoke.type === 'grass' && activeOpponentPoke.type === 'fire')) {

        activeOpponentPoke.hp -= Math.ceil(activePlayerPoke.attack / 2);
        $('h2').html('<span id="playerPoke">' + activePlayerPoke.name + '</span> attacks!');
        setTimeout(function () {
            $('h2').html('It\'s not very effective...');
        }, 2000);
        if (activeOpponentPoke.hp <= 0) {
            setTimeout(function () {
                compFaint();
            }, 4000);
        } else {
            setTimeout(function () {
                opponentAttack();
            }, 4000);
        }
    }
    // super effective
    else if ((activePlayerPoke.type === 'fire' && activeOpponentPoke.type === 'grass') ||
        (activePlayerPoke.type === 'water' && activeOpponentPoke.type === 'fire') ||
        (activePlayerPoke.type === 'grass' && activeOpponentPoke.type === 'water')) {

        activeOpponentPoke.hp -= (activePlayerPoke.attack * 2);
        $('h2').html('<span id="playerPoke">' + activePlayerPoke.name + '</span> attacks!');
        setTimeout(function () {
            $('h2').html('It\'s super effective!');
        }, 2000);
        if (activeOpponentPoke.hp <= 0) {
            setTimeout(function () {
                compFaint();
            }, 4000);
        } else {
            setTimeout(function () {
                opponentAttack();
            }, 4000);
        }
    }
    // normal effectiveness. cannot happen in this game.
    else {}
    $('#computerhp').html('HP: ' + activeOpponentPoke.hp + '<span style="color: #e51640"> (-' + (origHP - activeOpponentPoke.hp) + ')');
}

function opponentAttack() {
    var origHP = activePlayerPoke.hp;
    // not very effective
    if ((activeOpponentPoke.type === activePlayerPoke.type) ||
        (activeOpponentPoke.type === 'fire' && activePlayerPoke.type === 'water') ||
        (activeOpponentPoke.type === 'water' && activePlayerPoke.type === 'grass') ||
        (activeOpponentPoke.type === 'grass' && activePlayerPoke.type === 'fire')) {

        activePlayerPoke.hp -= Math.ceil(activeOpponentPoke.attack / 2);
        $('h2').html('The opposing <span id="compPoke">' + activeOpponentPoke.name + '</span> attacks!');
        setTimeout(function () {
            $('h2').html('It\'s not very effective...');
        }, 2000);
        //check if fainted    
        if (activePlayerPoke.hp <= 0) {
            setTimeout(function () {
                activeFaint();
            });
        } else {
            setTimeout(function () {
                $('h2').html('What will <span id="playerPoke">' + activePlayerPoke.name + '</span> do?');
                enableButtons();
            }, 4000);
        }
    }
    // super effective
    else if ((activeOpponentPoke.type === 'fire' && activePlayerPoke.type === 'grass') ||
        (activeOpponentPoke.type === 'water' && activePlayerPoke.type === 'fire') ||
        (activeOpponentPoke.type === 'grass' && activePlayerPoke.type === 'water')) {

        activePlayerPoke.hp -= (activeOpponentPoke.attack * 2);
        //check if fainted
        $('h2').html('The opposing <span id="compPoke">' + activeOpponentPoke.name + '</span> attacks!');
        setTimeout(function () {
            $('h2').html('It\'s super effective!');
        }, 2000);
        //check if fainted    
        if (activePlayerPoke.hp <= 0) {
            setTimeout(function () {
                activeFaint();
            });
        } else {
            setTimeout(function () {
                $('h2').html('What will <span id="playerPoke">' + activePlayerPoke.name + '</span> do?');
                enableButtons();
            }, 4000);
        }
    }
    // normal effectiveness. cannot happen in this game
    else {}
    $('#playerhp').html('HP: ' + activePlayerPoke.hp + '<span style="color: #e51640"> (-' + (origHP - activePlayerPoke.hp) + ')');
}

function activeFaint() {
    setTimeout(function () {
        $('h2').html('<span id="playerPoke">' + activePlayerPoke.name + '</span> fainted!')
    }, 4000);
    setTimeout(function () {
        enableButtons();
        changePokemon();
    }, 6000);
}

function compFaint() {
    activeOpponentPoke.hp = 0;
    setTimeout(function () {
        $('h2').html('<span id="compPoke">' + activeOpponentPoke.name + '</span> fainted!')
    }, 2000);
    setTimeout(function () {
        if (alivePokemon.length != 1) {
            chooseRandomPokemon();
            $('h2').html(opponent.name + ' sends out ' + '<span id="compPoke"> ' + activeOpponentPoke.name + '</span>!');
            $('#computerImg').attr('src', activeOpponentPoke.img);
            setTimeout(function () {
                $('h2').html('What will <span id="playerPoke">' + activePlayerPoke.name + '</span> do?');
                enableButtons();
            }, 2000);
        } else {
            $('h2').html('Trainer <span id="compPoke">' + opponent.name + '</span> has been defeated!')
        }
    }, 4000);

}

function changePokemon() {
    $('h2').html('What Pokemon will battle next?');
    setTimeout(function () {
        $('#attack').remove();
        $('#switch').remove();
        $('#giveUp').remove();
        $('#buttonHolder').append('<button>' + playerPoke1.name + '</button>');
        $('#buttonHolder').append('<button>' + playerPoke2.name + '</button>');
        $('#buttonHolder').append('<button>' + playerPoke3.name + '</button>');
    }, 200);
}

function disableButtons() {
    $('#attack').attr('disabled', true);
    $('#switch').attr('disabled', true);
    $('#giveUp').attr('disabled', true);
}

function enableButtons() {
    $('#attack').attr('disabled', false);
    $('#switch').attr('disabled', false);
    $('#giveUp').attr('disabled', false);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PAGE SCRIPT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

$('document').ready(function () {
    var containerClone = $('.container')[0].outerHTML;
    //♪♫♬♪♫♬
    var audio = new Audio('assets/audio/battle.mp3');
    audio.volume = 0.2;
    audio.play();

    //character card hover effects
    $(document).on('mouseenter', '.characters', hoverOnCSS)
    $(document).on('mouseleave', '.characters', hoverOffCSS)

    //user selects character
    $(document).on('click', '.characters', function () {
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
            $('#resetButton, #battleButton').css('opacity', '100');
            $('#buttonHolder').css('opacity', '100');
            numChoice++
        } else {}
    })

    // Choose Again button call reset() on click
    $(document).on('click', '#resetButton', reset);

    // Let's Battle button click
    $(document).on('click', '#battleButton', function () {
        //disable button so it cannot be clicked while fading out
        $('#battleButton').prop('disabled', true);
        //fade out all displayed elements
        $('.characters').animate({
            opacity: '0'
        }, 300);
        $('h2').animate({
            opacity: '0'
        }, 300);
        $('button').animate({
            opacity: '0'
        }, 300);
        $('h1').animate({
            opacity: '0'
        }, 300);
        //after fade out
        setTimeout(function () {
            // remove .characters, h2, and buttons after animation finishes. 
            $('.characters').remove();
            $('h2').remove();
            $('button').remove();
            // move chosen characters to new div .battleArena and update h1
            $('.container').after('<div class="battleArena"></div>');
            $('h1').html('BATTLE!');
            $('h1').css('font-size', '3em');
            $('h1').animate({
                opacity: '100'
            }, 2000);
            // move playerCard to .battleArena
            $(playerCard).appendTo('.battleArena');
            $(playerCard).animate({
                opacity: '100'
            }, 2000);
            $(playerCard).css('float', 'left');
            $(playerCard).attr('id', 'playerCharacter')
            // move opponentCard to .battleArena
            $(opponentCard).css('float', 'right');
            $(opponentCard).appendTo('.battleArena');
            $(opponentCard).animate({
                opacity: '100'
            }, 2000);
            $(opponentCard).attr('id', 'computer')
            // set character and pokemon variables
            setCharacters();
            setPokemon();
            activePlayerPoke = playerPoke1;
            chooseRandomPokemon();
            // create player pokemon image element
            $('.characters:first-of-type').append('<img id="playerPokeImg">');
            $('#playerPokeImg').css('opacity', '0');
            $('#playerPokeImg').animate({
                opacity: '100'
            }, 2000);
            $('#playerPokeImg').attr('src', playerPoke1.img);
            // show hp
            $('#playerPokeImg').after('<p id="playerhp">HP: <span id="playerhpSpan">' + player.pokemon[0].hp + '</span></p>')
            // create computer pokemon image element
            $('.characters:last-of-type').append('<img id="computerImg">');
            $('#computerImg').css('opacity', '0');
            $('#computerImg').animate({
                opacity: '100'
            }, 2000);
            $('#computerImg').after('<p id="computerhp">HP: <span id="computerhpSpan">HP: </span></p>');
            setOppActivePoke();
            $('#buttonHolder').before('<h2 id="navigation">What will <span id="playerPoke">' + activePlayerPoke.name + '</span> do?</h2');
            $('#buttonHolder').append('<button id="attack">Attack</button>');
            $('#buttonHolder').append('<button id="switch">Change Pokemon</button>');
            $('#buttonHolder').append('<button id="giveUp">Run</button>');

        }, 300);

    });

    $(document).on('click', '#attack', function () {
        disableButtons();
        playerAttack();
    });

    $(document).on('click', '#giveUp', function () {
        var input = confirm('Are you sure you want to leave this battle?')
        if (input === true) {
            $('.battleArena').animate({
                opacity: '0'
            }, 300);
            $('.container').animate({
                opacity: '0'
            }, 300);
            $('#attack').animate({
                opacity: '0'
            }, 300);
            $('h2').animate({
                opacity: '0'
            }, 300);
            $('#giveUp').animate({
                opacity: '0'
            }, 300);
            $('#switch').animate({
                opacity: '0'
            }, 300);
            $('div:last-of-type').animate({
                opacity: '0'
            }, 300);

            setTimeout(function () {
                //reset numChoice and hp of pokemon
                numChoice = 0;
                playerPoke1.hp = 100;
                playerPoke2.hp = 100;
                playerPoke3.hp = 100;
                compPoke1.hp = 100;
                compPoke2.hp = 100;
                compPoke3.hp = 100;
                //remove created elements
                $('.battleArena').remove();
                $('#attack').remove();
                $('#giveUp').remove();
                $('#switch').remove();
                $('#navigation').remove();
                //place back original elements
                $('.container').replaceWith(containerClone);
            }, 300);
        } else {}
    });

});