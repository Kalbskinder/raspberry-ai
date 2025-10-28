# rasberry-ai

A project that runs tiny-llama ona rasberry-pi 5 with a webinterface to interact with the ai

## Website Mockup

![mockup](./docs/mockup.png)

## Notes to myself

Make a model switching dropdown between TinyLlama and Llama3?
The Pi can run Llama3, it's just slow...

AI should respond using markdown. Output text should be displayed correctly (MD -> HTML)

## How to setup ollama on your pi

Ensure your Raspberry Pi is running a 64-bit operating system. Ollama won't work on 32-bit systems.

### Installing ollama

```sh
sudo apt install curl
```

```sh
curl -fsSL https://ollama.com/install.sh | sh
```

Confirm installation with:

```sh
ollama --version
```

### Installing tinyllama and llama-3

```sh
ollama run tinyllama
ollama run llama3
```

Now you can ask the model questions and have conversations using the terminal.

### Interacting with the model via an API
