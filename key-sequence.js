/**
 * Handles KeySequences
 * @property {KeySequence[]} keySequences - An array of key sequences.
 * @property {number[]} keys - An array of keys to process on keydown.
 */
function KeySequenceHandler (keySequences) {
    this.keySequences = keySequences;
    this.keys = [];

    this.init();
}

/**
 * Populates keys array and readies keydown event listener.
 */
KeySequenceHandler.prototype.init = function () {
    this.keys = this.getKeys(this.keySequences);

    document.addEventListener('keydown', function(e) {
        var keyCode = e.keyCode;
        if (this.keys.indexOf(keyCode) != -1) {
            for (var i = 0; i < this.keySequences.length; i++) {
                this.keySequences[i].step(keyCode);
            }
        }
    }.bind(this));
};

/**
 * Get all keys from key sequences
 * @param {KeySequence[]} keySequences - An array of key sequences.
 * @return {number[]} - A deduped array of keys used in all key sequences.
 */
KeySequenceHandler.prototype.getKeys = function (keySequences) {
    var keys = [];

    // for each key sequence
    for (var i = 0; i < keySequences.length; i++) {

        // for each key in sequence
        var sequence = keySequences[i].sequence;
        for (var j = 0; j < sequence.length; j++) {

            var key = sequence[j];
            if (keys.indexOf(key) == -1) {
                keys.push(key);
            }
        }
    }
    return keys;
};

/**
 * Defines a sequence of keypresses with accompanying code to execute.
 * @param {number[]} sequence - A sequence of keys.
 * @param {Function} callback - A function to be called when the sequence is completed.
 * @property {number} position - A number for tracking position in the sequence.
 */
function KeySequence (sequence, callback) {
    this.sequence = sequence;
    this.callback = (callback === undefined) ? Function.prototype : callback; // noop?
    this.position = 0;
}

/**
 * Steps through the sequence.
 * @param {number} keyCode - A key code to check.
 */
KeySequence.prototype.step = function (keyCode) {
    var req = this.sequence[this.position];
    if (keyCode == req) {
        this.position++;
        if (this.position == this.sequence.length) {
            this.position = 0;
            this.callback(); // hurrah!
        }
    } else {
        this.position = 0;
    }
};
