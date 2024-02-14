document.addEventListener("DOMContentLoaded", function() {
    const fighterSelection = document.getElementById("fighter-selection");
    const gameContainer = document.getElementById("game-container");
    const startBtn = document.getElementById("start-btn");

    startBtn.addEventListener("click", function() {
        const player1Type = document.querySelector('input[name="fighter1"]:checked').value;
        const player2Type = document.querySelector('input[name="fighter2"]:checked').value;

        const player1Name = prompt("Enter Player 1's name:");
        const player2Name = prompt("Enter Player 2's name:");

        const player1 = createFighter(player1Type, player1Name);
        const player2 = createFighter(player2Type, player2Name);

        startGame(player1, player2);
    });

    function createFighter(type, name) {
        if (type === "Warrior") {
            return new Warrior(name);
        } else if (type === "Mage") {
            return new Mage(name);
        } else {
            throw new Error("Invalid fighter type");
        }
    }

    function startGame(player1, player2) {
        fighterSelection.style.display = "none";
        gameContainer.style.display = "block";

        const player1NameElem = document.getElementById("player1-name");
        const player1HealthElem = document.getElementById("player1-health");
        const player1PointsElem = document.getElementById("player1-points");
        const player1AttackSelect = document.getElementById("player1-attack");
        const player1DamageElem = document.getElementById("player1-damage");

        const player2NameElem = document.getElementById("player2-name");
        const player2HealthElem = document.getElementById("player2-health");
        const player2PointsElem = document.getElementById("player2-points");
        const player2AttackSelect = document.getElementById("player2-attack");
        const player2DamageElem = document.getElementById("player2-damage");

        player1NameElem.textContent = player1.name;
        player1PointsElem.textContent = player1.points;

        player2NameElem.textContent = player2.name;
        player2PointsElem.textContent = player2.points;

        updateHealth(player1HealthElem, player1.health);
        updateHealth(player2HealthElem, player2.health);

        const info = document.getElementById("info");
        const attackBtn = document.getElementById("attack-btn");
        let currentPlayer = player1;

        attackBtn.addEventListener("click", function() {
            const otherPlayer = currentPlayer === player1 ? player2 : player1;
            const currentPlayerAttack = currentPlayer === player1 ? player1AttackSelect.value : player2AttackSelect.value;

            let damage;
            if (currentPlayerAttack === "basic") {
                damage = currentPlayer.basicAttack(otherPlayer);
            } else if (currentPlayerAttack === "special") {
                damage = currentPlayer.specialAttack(otherPlayer);
            }

            info.textContent = `${currentPlayer.name} attacks ${otherPlayer.name} for ${damage} damage.`;

            // Update health
            otherPlayer.health -= damage;
            updateHealth(currentPlayer === player1 ? player2HealthElem : player1HealthElem, otherPlayer.health);

            if (otherPlayer.isKnockedOut()) {
                info.textContent = `${otherPlayer.name} is knocked out!`;
                attackBtn.disabled = true;
                setTimeout(function() {
                    const winner = player1.isKnockedOut() ? player2 : player1;
                    alert(`${winner.name} wins the game!`);
                    const restartGame = confirm("Do you want to restart the game?");
                    if (restartGame) {
                        location.reload(); // Reload the page to restart the game
                    }
                }, 500);
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                info.textContent = `${currentPlayer.name}'s turn`;
            }

            // Update player points
            player1PointsElem.textContent = player1.points;
            player2PointsElem.textContent = player2.points;
        });

        info.textContent = `${player1.name}'s turn`;
    }

    // Function to update health symbols
    function updateHealth(element, health) {
        element.innerHTML = ''; // Clear previous health symbols
        for (let i = 0; i < health; i++) {
            const healthSymbol = document.createElement('div');
            healthSymbol.classList.add('health-symbol');
            element.appendChild(healthSymbol);
        }
    }
});
