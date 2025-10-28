# rasberry-ai

A project that runs tiny-llama ona rasberry-pi 5 with a webinterface to interact with the ai

## Website Mockup

![mockup](./docs/mockup.png)

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

## Running the Frontend

```sh
npm install
```

```sh
cd frontend
npm run build
npm start
```

You can now view the website on [http://localhost:3000](http://localhost:3000)

## Running the Python API
