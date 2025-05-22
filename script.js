class HashMap {
    constructor(load = 0.75, capacity = 16) {
        this.buckets = new Array(capacity).fill(null).map(() => []);
        this.load = load;
        this.size = 0;
        this.capacity = capacity;
    }

    hash(key) {
        let hashCode = 0;
        const primeNum = 31;
        const stringKey = String(key);

        for (let i = 0; i < stringKey.length; i++) {
            hashCode = primeNum * hashCode + stringKey.charCodeAt(i);
            //hashCode = hashCode%16;
        }

        return Math.abs(hashCode) % this.capacity;
    }

    set(key, value) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++){
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }
        bucket.push({ key, value });
        this.size++;
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++){
            if (bucket[i].key === key) {
                return bucket[i].value;
            }
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++){
            if (bucket[i].key === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++){
            if (bucket[i].key === key) {
                //bucket[i].value = null;
                //bucket[i].key = null;
                bucket.splice(i, 1);
                //check this.........
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        let newArr = [];

        for (let i = 0; i < this.buckets.length; i++){
            const bucket = this.buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                newArr.push(bucket[j].key);
            }
        }
        return newArr;

    }

    values() {
        let newArr = [];

        for (let i = 0; i < this.buckets.length; i++){
            const bucket = this.buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                newArr.push(bucket[j].value);
            }
        }
        return newArr;
    }

    entries() {
        let newArr = [];
        //const bucket = this.buckets;

        for (let i = 0; i < this.buckets.length; i++){
            const bucket = this.buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                newArr.push([bucket[j].key, bucket[j].value]);
            }
        }
        return newArr;
    }
}


const test = new HashMap;// or HashMap() if using a factory
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

test.set("apple", "green");
test.set("frog", "purple");
test.set("moon", "silver");
test.remove("jacket");
console.log(test.has("apple"));
console.log(test.get("kite"));

console.log(test.entries());

