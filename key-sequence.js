function KeySequenceHandler (sequences, keys) {
    this.sequences = sequences;
    this.keys = (keys === undefined) ? [] : keys;

    if (this.keys.length === 0) this.build();
    this.init();
}
KeySequenceHandler.prototype.init = function () {
    document.addEventListener('keydown', function(e) {
        var key = e.keyCode;
        if (this.keys.indexOf(key) != -1) {
            for (var i = 0; i < this.sequences.length; i++) {
                this.sequences[i].poll(key);
            }
        }
    }.bind(this));
};
KeySequenceHandler.prototype.build = function () {
    var keys = [];
    for (var i = 0; i < this.sequences.length; i++) {

        var sequence = this.sequences[i].sequence;
        for (var j = 0; j < sequence.length; j++) {

            var key = sequence[j];
            if (keys.indexOf(key) == -1) {
                keys.push(key);
            }
        }
    }
    this.keys = keys;
};

function KeySequence (sequence, func) {
    this.sequence = sequence;
    this.func = (func === undefined) ? Function.prototype : func; // noop?
    this.position = 0;
}
KeySequence.prototype.poll = function (keyCode) {
    var req = this.sequence[this.position];
    if (keyCode == req) {
        this.position++;
        if (this.position == this.sequence.length) {
            this.func(); // hurrah!
        }
    } else {
        this.position = 0;
    }
};
