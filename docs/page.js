var Module = {};
Module.noInitialRun = true;
Module.print = printToElement;
Module.printErr = printErr;
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

function setBackgroundColor(element, color) {
    var currentColor;
    for (c of element.classList) {
        if (/^bg-/.test(c)) currentColor = c;
    }
    if (currentColor) element.classList.remove(currentColor);
    element.classList.add(color);
}

function runSeedtool() {
    const arguments = getArguments();
    console.log("arguments:", arguments);

    for (const format of ["hex", "btw", "bip39", "sskr"]) {
        Module.outputElement = document.getElementById(`output-${format}`)
        Module.outputElement.textContent = "";

        if (arguments.some(arg => /^--group/.test(arg)) && format != "sskr") {
            setBackgroundColor(Module.outputElement.parentElement, "bg-neutral-200/50");
            continue;
        }

        setBackgroundColor(Module.outputElement.parentElement, "bg-blue-200/50");
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

function printErr(text) {
    if (/^program exited \(with status:/.test(text)) return;
    printToElement(text);
    setBackgroundColor(Module.outputElement.parentElement, "bg-red-200/50");
}

window.addEventListener('load', () => {
    const seedtoolScript = document.createElement('script');
    seedtoolScript.src = "seedtool.js";
    document.body.appendChild(seedtoolScript);

    document.getElementById('entropy').value = getEntropy();

    document.getElementById('lets-go').addEventListener('click', runSeedtool);
    setTimeout(waitForSeedtoolAndRun, 0);
});
