
var story = {
    currentScene: "attack",
    attack: {
        title: "Thank you, your name is now \"The Genie!\"",
        story: "You are walking through the woods and meet a nice old man. He says \"Hi Genie. Would you like to come home with me?\" How do you reply?",
        image: "attackpic.png",
        choices: [
            {
                choice: "\"No thank you.\"",
                destination: 'insists'
            },
            {
                choice: "\"Uh I don't think that's such a good idea...\"",
                destination: 'insists'
            }
        ]
    },
    insists: {
        title: "But the old man insists. \"No, you should come home with me!\"",
        story: "He grabs your arm and starts rubbing it seductively. \"You know,\" he says, \"You are one of the sexiest Genies I\'ve ever seen.\"",
        image: "insistspic.png",
        choices: [
            {
                choice: "Run away!",
                destination: 'van'
            },
            {
                choice: "Call the police on your 2009 Motorola fliphone.",
                destination: 'van'
            }
        ]
    },
    van: {
        title: "Too slow! The old man shoves you in his van.",
        story: "You\'re tied up in the back as the van rattles away. What do you do?",
        image: "vanpic.png",
        choices: [
            {
                choice: "The back door is loose - kick it open!",
                destination: 'arrival'
            },
            {
                choice: "Scream for help!",
                destination: 'arrival'
            }
        ]
    },
    arrival: {
        title: "Your attempt to escape doesn\'t work!",
        story: "The old man drags you out of the van towards his shed in a backwoods area of Schaghticoke, NY. \"Time to get in the shed!\" he screams. This is your last chance to escape - what do you do?",
        image: "arrivalpic.png",
        choices: [
            {
                choice: "Kick the old man and bolt into the woods!",
                destination: 'conclusion'
            },
            {
                choice: "Grab a tree branch lying next to you and stab him in the throat!",
                destination: 'conclusion'
            }
        ]
    },
    conclusion: {
        title: "It didn\'t work. You were brought into the shed.",
        story: "Inside, the old man ties you up and spends 6 hours showing you his vintage Felix the Cat comics collection from the 1930s. He also puts you in a pit and does the Buffalo Bill dance for you. <br /><br /> You go home and your girlfriend yells at you for missing her improv show. What do you do?",
        image: "conclusionpic.png",
        choices: [
            {
                choice: "Kill yourself.",
                destination: 'resolution1'
            },
            {
                choice: "Go into the den and watch the latest episode of \"Father Knows Best.\"",
                destination: 'resolution2'
            }
        ]
    },
    resolution1: {
        title: "Unfortunately you survived your suicide attempt. You broke your neck trying to hang yourself and now live in a special help home.",
        story: "THE END",
        image: "resolution1.png",
        defaultDestination: "attack",
        buttonText: "Play Again!"
    },
    resolution2: {
        title: "Unfortunately your 1952 Philco television overheated and exploded. You died in the blast.",
        story: "THE END",
        image: "resolution2.png",
        defaultDestination: "attack",
        buttonText: "Play Again!"
    },
}

document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector(`#start-button`);
    var input = document.querySelector('#name-input');
    var content = document.querySelector('#content');

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            var submitButton = document.querySelector("#submit-button");
            submitButton.click();
        }
    });

    button.addEventListener('click', function() {
        renderScene();
})

function renderScene() {
    var text = "Next"
    var image = "";
    if (story[story.currentScene].image) {
        image = `<img src="./img/${story[story.currentScene].image}" />`;
    } else {
        image= "";
    }
    if (story[story.currentScene].buttonText) {
        text = story[story.currentScene].buttonText;
    }
    content.innerHTML = `
        <div class="center-container">
            <h1>${story[story.currentScene].title}</h1>
            <p class="center story-text">${story[story.currentScene].story}</p>
            ${image}
            ${getInputs()}
            <button id="submit-button">${text}</button>
        </div>
`;

    if (story[story.currentScene]) {
        document.querySelector("img").src = `./img/${story[story.currentScene].image}`;
    }

    window.scrollTo(0, 0);

    var button = document.querySelector("#submit-button");

    button.removeEventListener('click', getInputValue);

    button.addEventListener('click', function() {
        if (text === "Play Again!") {
            story.currentScene = "attack";
            renderScene();
        } else if (story[story.currentScene].defaultDestination) {
            story.currentScene = story[story.currentScene].defaultDestination;
            renderScene();
        } else if (!story[story.currentScene].choices) {
            story.currentScene = "attack";
            renderScene();
        } else {
            getInputValue();
        }
    });
}

function getInputValue() {
    var inputs = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            story.currentScene = inputs[i].getAttribute('data-destination');

            var button = document.querySelector("#submit-button");
            button.removeEventListener('click', getInputValue);

            renderScene();
            return;
        }
    }
    if (!story[story.currentScene].choices) {
        story.currentScene = "attack";
    }

    var button = document.querySelector("#submit-button");
    button.removeEventListener('click', getInputValue);

    renderScene()
}

function getInputs() {
    var input = ""
    if (!story[story.currentScene].choices) {
        return input;
    }
    for(var i = 0; i < story[story.currentScene].choices.length; i++) {
        input += `
        <div>
                <input data-destination=${story[story.currentScene].choices[i].destination} id="radio${i}" type="radio" name="choices" />
                <label for="radio${i}" class="choice-text">${story[story.currentScene].choices[i].choice}</label>
        </div>
        `;
    }
    return input;
}

});