var Module = {};
Module.noInitialRun = true;
Module.print = printToElement;
Module.outputElement = null;

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

    for (const format of ["hex", "btw", "bip39", "sskr"]) {
        Module.outputElement = document.getElementById(`output-${format}`)
        Module.outputElement.textContent = "";
        callMain(arguments.concat([`--out=${format}`]))
    }
}

function waitForSeedtoolAndRun() {
    if (typeof Module.run === 'undefined') {
        setTimeout(waitForSeedtoolAndRun, 100);
    } else {
        runSeedtool();
    }
}

function printToElement(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
    console.log(text);
    Module.outputElement.textContent += text + "\n";
}

window.addEventListener('load', () => {
    const seedtoolScript = document.createElement('script');
    seedtoolScript.src = "seedtool.js";
    document.body.appendChild(seedtoolScript);

    document.getElementById('entropy').value = getEntropy();

    document.getElementById('lets-go').addEventListener('click', runSeedtool);
    setTimeout(waitForSeedtoolAndRun, 0);
});
