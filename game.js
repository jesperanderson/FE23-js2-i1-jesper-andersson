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

        const player2NameElem = document.getElementById("player2-name");
        const player2HealthElem = document.getElementById("player2-health");
        const player2PointsElem = document.getElementById("player2-points");
        const player2AttackSelect = document.getElementById("player2-attack");

        player1NameElem.textContent = player1.name;
        player1HealthElem.textContent = player1.health;
        player1PointsElem.textContent = player1.points;

        player2NameElem.textContent = player2.name;
        player2HealthElem.textContent = player2.health;
        player2PointsElem.textContent = player2.points;

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

            if (otherPlayer.isKnockedOut()) {
                info.textContent = `${otherPlayer.name} is knocked out!`;
                attackBtn.disabled = true;
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                info.textContent = `${currentPlayer.name}'s turn`;
            }

            // Update player info
            player1HealthElem.textContent = player1.health;
            player2HealthElem.textContent = player2.health;
            player1PointsElem.textContent = player1.points;
            player2PointsElem.textContent = player2.points;
        });

        info.textContent = `${player1.name}'s turn`;
    }
});
