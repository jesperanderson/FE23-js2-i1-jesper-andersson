class Fighter {
    constructor(name, maxHealth) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.points = 0;
    }

    basicAttack(other) {
        throw new Error("Subclasses must implement basicAttack method");
    }

    specialAttack(other) {
        throw new Error("Subclasses must implement specialAttack method");
    }

    isKnockedOut() {
        return this.health <= 0;
    }
}

class Warrior extends Fighter {
    constructor(name) {
        super(name, 100);
    }

    basicAttack(other) {
        const damage = Math.floor(Math.random() * 11) + 10; // Random damage between 10 and 20
        other.health -= damage;
        return damage;
    }

    specialAttack(other) {
        const damage = Math.floor(Math.random() * 21) + 20; // Random damage between 20 and 40
        other.health -= damage;
        return damage;
    }
}

class Mage extends Fighter {
    constructor(name) {
        super(name, 80);
    }

    basicAttack(other) {
        const damage = Math.floor(Math.random() * 11) + 15; // Random damage between 15 and 25
        other.health -= damage;
        return damage;
    }

    specialAttack(other) {
        const damage = Math.floor(Math.random() * 21) + 25; // Random damage between 25 and 45
        other.health -= damage;
        return damage;
    }
}
