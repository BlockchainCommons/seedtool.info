function getRandomSeed() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => ('0' + b.toString(16)).slice(-2)).join('');
}

function getArguments() {
    const seed = ["--deterministic", getRandomSeed()];
    const input = document.getElementById("input").value;
    const arguments = input ? seed.concat(input.split(/\s+/)) : seed;
    console.log("arguments:", arguments);
    return arguments;
}

function setArgumentsAndRun() {
    Module.arguments = getArguments();
    document.getElementById('output').textContent = "";
    callMain(Module.arguments);
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
Module.arguments = getArguments();

window.addEventListener('load', () => {
    const seedtoolScript = document.createElement('script');
    seedtoolScript.src = "seedtool.js";
    document.body.appendChild(seedtoolScript);

    document.getElementById('lets-go').addEventListener('click', setArgumentsAndRun);
});
