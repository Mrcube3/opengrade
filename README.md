# VeriCheck: TEE-Secured Fact Checker

A modern, full-stack application that leverages the **OpenGradient** network and Trusted Execution Environments (TEE) to provide unbiased, easily verifiable fact-checking.

## System Architecture
* **Frontend:** React (Vite) + Tailwind CSS featuring a fluid, vibrant 5-color aesthetic mesh gradient with interactive glassmorphism UI.
* **Backend:** Python (FastAPI) integrating the OpenGradient SDK for verifiable LLM generation securely executed on the TEE.

## Features
* **Cinematic UI:** Vibrant mesh background with a parallax dot-tracking element that interactively follows the user's cursor.
* **Blockchain Verifiable:** Returns actual on-chain transaction hashes confirming the execution of the LLM inference inside the secure enclave.
* **Graceful Fallbacks:** Intelligently handles out-of-gas Wallet scenarios, providing simulated mock verifications if your wallet runs out of testnet tokens.

## Prerequisites
* Node.js & npm
* Python 3.10+ & pip
* An **OpenGradient Testnet Wallet** with devnet `$OPG` tokens.

## Setup Instructions

### 1. Backend 
1. Navigate to the `backend` directory.
2. Create your `.venv` and install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the `backend` directory and add your OpenGradient private key:
   ```env
   PRIVATE_KEY=0xYour64CharacterHexKeyHere
   ```
4. **Crucial:** Obtain testnet `$OPG` tokens for your wallet from the [OpenGradient Faucet](https://app.opengradient.com/faucet) to pay for TEE gas.
5. Start the FastAPI server:
   ```bash
   uvicorn app:app --reload
   ```

### 2. Frontend
1. Navigate to the `frontend` directory.
2. Install typical React dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
Simply type any controversial claim into the text area and press **Enter**. VeriCheck will execute a prompt through the OpenGradient LLM verifying the accuracy, detecting biases, and providing context, alongside the cryptographic transaction proof of the process.
