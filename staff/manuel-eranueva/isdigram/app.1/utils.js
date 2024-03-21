//utils

function block(millis) {
    var before = Date.now()
    //for (; Date.now() - before < 3000;);
    while (Date.now() - before < millis);
}