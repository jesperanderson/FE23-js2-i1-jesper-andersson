class Fighter {
    #name;
    #maxHealth;
    #health;

    constructor(name, maxHealth) {
        
        this.#name = name;
        this.#maxHealth = maxHealth;
        this.#health = maxHealth;
    }

    attack(other) {
        throw new Error("Subclasses must implement attack method");
    }

    isKnockedOut() {
        return this.health <= 0;
    }
}

class Warrior extends Fighter {
    constructor(name) {
        super(name, 100);
    }

    attack(other) {
        const damage = Math.floor(Math.random() * 11) + 10; // Random damage between 10 and 20
        other.health -= damage;
        return damage;
    }
}

class Mage extends Fighter {
    constructor(name) {
        super(name, 80);
    }

    attack(other) {
        const damage = Math.floor(Math.random() * 11) + 15; // Random damage between 15 and 25
        other.health -= damage;
        return damage;
    }
}
