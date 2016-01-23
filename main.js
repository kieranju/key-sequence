window.onload = function () {

    var sequence1 = new KeySequence(
        [38, 40, 38, 40],
        function () { alert('up, down, up, down'); }
    );
    var sequence2 = new KeySequence(
        [37, 39, 37, 39],
        function () { alert('left, right, left, right'); }
    );

    new KeySequenceHandler([sequence1, sequence2]);

};
