//Collecting items
let next = $('#suivant');
let prev = $('#precedent');
let restart = $('#execute');

//Initializing boolean
let startQuiz = false;

//Initializing items
next.html("Commencer à jouer");
prev.hide();
restart.hide();
let questionCounter = 0;
let quiz = $('#quiz');

//Create array questions
let questions = [
    {
        question: "Comment s'appelle le meilleur système d'exploitation ?",
        choices: ['Linux', 'Windows', 'Mac', 'Microsoft'],
        correctAnswer: 0
    }, {
        question: "La formation se trouve où géographiquement parlant ?",
        choices: ["Wignehies", "Valras-Plage", "Fourmies", "Agde", "Hirson", "Narbonne", "Je ne sais pas"],
        correctAnswer: 2
    }, {
        question : "Quelle taille fait 1 octet ?",
        choices: [4, 8, 12, 16, 32],
        correctAnswer: 1
    }, {
        question : "Comment se nomme le composant qui permet de stocker des données ?",
        choices: ["Disque Dur", "Disque Vinile", "L'écran", "Carte réseaux", "Je ne sais pas"],
        correctAnswer: 0
    }, {
        question : "Comment se nomme le logiciel que l'on se sert pour discuter en formation chez Upto ?",
        choices: ["Facebook", "Snapchat", "Discord", "Aucun logiciel", "Je ne sais pas"],
        correctAnswer: 2
    }, {
        question : "A quel language de programmation allons-nous apprendre dans quelque décéni plus tard chez Upto ?",
        choices: ["PHP", "JS", "HTML", "CSS", "Boo", "Je ne sais pas"],
        correctAnswer: 0
    }
];

//Create Array selections response
let selections = [];

//Event click the next button
next.click(function (e) {
    if(startQuiz){
        e.preventDefault();
        selection();
        questionCounter++;
        displayNext();
    }else{
        next.html("Suivant");
        displayNext();
        startQuiz = true;
    }
});

//Event click the previous button
prev.click(function (e) {
    e.preventDefault();
    selection();
    questionCounter--;
    displayNext();
});

//Event click the restart button
restart.click(function (e) {
    e.preventDefault();
    $('h4').remove();
    questionCounter = 0;
    selections = [];
    displayNext();
    restart.hide();
});

//Function to create the elements that contain the questions
function createQuestionElement(index) {
    let qElement = $('<div>', {
        id: 'question'
    });

    let header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    let question = $('<p>').append(questions[index].question);
    qElement.append(question);

    let radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
}

//Function to create the radio which contains the answers to the questions
function createRadios(index) {
    let radioList = $('<ul>');
    let item;
    let input = '';
    for (let i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + '>';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
    }
    return radioList;
}

//Function that displays the questions and manages the whole process
function displayNext() {
    $('#question').remove();

    if(questionCounter < questions.length){
        let nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion);
        if(questionCounter === 0){
            prev.hide();
            next.show();
        }else if(questionCounter === 1){
            prev.show();
        }
        if (!(isNaN(selections[questionCounter]))) {
            $(`input[value=${selections[questionCounter]}]`).prop('checked', true);
        }
    }else {
        let scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        next.hide();
        prev.hide();
        restart.show();
    }
}

//Function that allows to retrieve the selected radio 
function selection() {
    selections[questionCounter] =+ $('input[name="answer"]:checked').val();
}

//Function that displays the score
function displayScore() {
    let score = $('<h4>');
    score.css({
        "color": "green",
        "background-color": "white",
        "text-align": "center",
        "margin-top": "1rem"
    });
    let numCorrect = 0;
    for (let i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
            numCorrect++;
        }
    }

    score.append("Tu as réussi " + numCorrect + ' question(s) sur ' + questions.length) + " !";

    return score;
}