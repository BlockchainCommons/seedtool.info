function getEntropy() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => ('0' + b.toString(16)).slice(-2)).join('');
}

function getArguments() {
    const seed = ["--deterministic", document.getElementById('entropy').value];
    const input = document.getElementById("input").value;
    const arguments = input ? seed.concat(input.split(/\s+/)) : seed;
    return arguments;
}

function runSeedtool() {
    const arguments = getArguments();
    console.log("arguments:", arguments);

    document.getElementById('output').textContent = "";

    callMain(arguments);
}

function waitForSeedtoolAndRun() {
    if (typeof callMain === 'undefined') {
        setTimeout(waitForSeedtoolAndRun, 100);
    } else {
        runSeedtool();
    }
}

var Module = {};
Module.print = (function () {
    var element = document.getElementById('output');
    return function (text) {
        if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
        console.log(text);
        element.textContent += text + "\n";
    };
})();
Module.noInitialRun = true;

window.addEventListener('load', () => {
    const seedtoolScript = document.createElement('script');
    seedtoolScript.src = "seedtool.js";
    document.body.appendChild(seedtoolScript);

    document.getElementById('entropy').value = getEntropy();

    document.getElementById('lets-go').addEventListener('click', runSeedtool);
    setTimeout(waitForSeedtoolAndRun, 0);
});
