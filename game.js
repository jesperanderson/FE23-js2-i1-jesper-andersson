document.addEventListener("DOMContentLoaded", function() {
    const player1 = new Warrior(prompt("Enter Player 1's name:"));
    const player2 = new Mage(prompt("Enter Player 2's name:"));

    const info = document.getElementById("info");
    const attackBtn = document.getElementById("attack-btn");

    let currentPlayer = player1;

    attackBtn.addEventListener("click", function() {
        const otherPlayer = currentPlayer === player1 ? player2 : player1;

        const damage = currentPlayer.attack(otherPlayer);
        info.textContent = `${currentPlayer.name} attacks ${otherPlayer.name} for ${damage} damage.`;

        if (otherPlayer.isKnockedOut()) {
            info.textContent = `${otherPlayer.name} is knocked out!`;
            attackBtn.disabled = true;
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            info.textContent = `${currentPlayer.name}'s turn`;
        }
    });

    info.textContent = `${player1.name}'s turn`;
});
