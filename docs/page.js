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

    while (document.getElementById("output-qr").firstChild) {
        document.getElementById("output-qr").firstChild.remove();
    }

    for (const format of ["hex", "btw", "bip39", "sskr"]) {
        Module.outputElement = document.getElementById(`output-${format}`);
        Module.outputElement.textContent = "";

        if (arguments.some(arg => /^--group/.test(arg)) && format != "sskr") {
            setBackgroundColor(Module.outputElement.parentElement, "bg-neutral-200/50");
            continue;
        }

        setBackgroundColor(Module.outputElement.parentElement, "bg-blue-200/50");
        callMain(arguments.concat([`--out=${format}`]))
    }

    for (const format of ["hex", "bip39", "sskr"]) {
        Module.outputElement = null;

        if (arguments.some(arg => /^--group/.test(arg)) && format != "sskr") {
            continue;
        }

        callMain(arguments.concat(["--ur", `--out=${format}`]))
    }

    initQrCarousel();
}

function waitForSeedtoolAndRun() {
    if (typeof Module.run === 'undefined') {
        setTimeout(waitForSeedtoolAndRun, 100);
    } else {
        setTimeout(runSeedtool, 100);
    }
}

function printToElement(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
    console.log(text);
    if (Module.outputElement) {
        const span = document.createElement("span");
        span.textContent = text;
        Module.outputElement.appendChild(span);
        Module.outputElement.appendChild(document.createElement("br"));
    }

    if (/^ur:/.test(text)) {
        displayAsQrCode(text);
    }
}

function printErr(text) {
    if (/^program exited \(with status:/.test(text)) return;
    printToElement(text);
    if (Module.outputElement) {
        setBackgroundColor(Module.outputElement.parentElement, "bg-red-200/50");
    }
}

function displayAsQrCode(text) {
    const qrContainer = document.createElement("div");
    qrContainer.classList.add("qr-container", "hidden", "flex-1", "w-10/12", "px-2", "text-center");
    const qrDiv = document.createElement("div");
    qrDiv.classList.add("qr");
    qrContainer.appendChild(qrDiv);
    const qrText = document.createElement("code");
    qrText.classList.add("qr-text");
    qrText.textContent = text;
    qrContainer.appendChild(qrText);
    document.getElementById("output-qr").appendChild(qrContainer);

    new QRCode(qrDiv, text.toUpperCase());
}

function initQrCarousel() {
    const output = document.getElementById("output-qr");
    if (!output.firstChild) return;

    const prevButton = document.createElement("button");
    prevButton.classList.add("flex-none", "w-1/12", "bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-2", "rounded", "opacity-50", "cursor-not-allowed");
    prevButton.textContent = "<";
    output.prepend(prevButton);
    const nextButton = document.createElement("button");
    nextButton.classList.add("flex-none", "w-1/12", "bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-2", "rounded", "opacity-50", "cursor-not-allowed");
    nextButton.textContent = ">";
    output.append(nextButton);

    prevButton.addEventListener('click', () => {
        const active = output.getElementsByClassName("qr-container active")[0];
        const prev = active.previousElementSibling;
        if (prev.classList.contains("qr-container")) {
            active.classList.replace("active", "hidden");
            prev.classList.replace("hidden", "active");
            nextButton.classList.remove("opacity-50", "cursor-not-allowed");

            const newPrev = prev.previousElementSibling;
            if (!newPrev.classList.contains("qr-container")) {
                prevButton.classList.add("opacity-50", "cursor-not-allowed");
            }
        }
    });

    nextButton.addEventListener('click', () => {
        const active = output.getElementsByClassName("qr-container active")[0];
        const next = active.nextElementSibling;
        if (next.classList.contains("qr-container")) {
            active.classList.replace("active", "hidden");
            next.classList.replace("hidden", "active");
            prevButton.classList.remove("opacity-50", "cursor-not-allowed");

            const newNext = next.nextElementSibling;
            if (!newNext.classList.contains("qr-container")) {
                nextButton.classList.add("opacity-50", "cursor-not-allowed");
            }
        }
    });

    const active = output.getElementsByClassName("qr-container")[0]
    const next = active.nextElementSibling;
    active.classList.replace("hidden", "active");
    if (next.classList.contains("qr-container")) {
        nextButton.classList.remove("opacity-50", "cursor-not-allowed");
    }
}

window.addEventListener('load', () => {
    const seedtoolScript = document.createElement('script');
    seedtoolScript.src = "seedtool.js";
    document.body.appendChild(seedtoolScript);

    document.getElementById('entropy').value = getEntropy();

    document.getElementById('lets-go').addEventListener('click', runSeedtool);
    setTimeout(waitForSeedtoolAndRun, 0);
});
