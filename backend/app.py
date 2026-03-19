import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import opengradient as og
from opengradient.client import LLM

load_dotenv(override=True)

PRIVATE_KEY = os.getenv("PRIVATE_KEY", "").strip()
OG_ENV = os.getenv("OG_ENV", "prod")

if not PRIVATE_KEY:
    raise RuntimeError("PRIVATE_KEY is required in .env")

llm_client = None

def get_llm_client():
    global llm_client
    if llm_client is None:
        if not PRIVATE_KEY or not PRIVATE_KEY.startswith("0x") or len(PRIVATE_KEY.strip()) not in (66, 64):
            raise RuntimeError("Invalid PRIVATE_KEY. Use a 66-character hex key beginning with 0x.")
        llm_client = LLM(private_key=PRIVATE_KEY)
    return llm_client

class ClaimRequest(BaseModel):
    claim: str

app = FastAPI(title="VeriCheck")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def build_prompt(claim: str) -> str:
    return f"""You are a verifiable fact-checker.
Claim: \"{claim}\"
Task:
1. Check accuracy.
2. Detect bias.
3. Provide context.
4. Provide a short final verdict.
Also return JSON:
{{
  \"verdict\": \"...\",
  \"confidence\": \"...\",
  \"tags\": [...]\n}}
"""

@app.post("/fact-check")
async def fact_check(payload: ClaimRequest):
    claim = payload.claim.strip()
    if not claim:
        raise HTTPException(status_code=400, detail="Claim is required")

    try:
        prompt = build_prompt(claim)
        llm_client = get_llm_client()

        try:
            llm_client.ensure_opg_approval(opg_amount=0.1)
        except Exception:
            pass

        response = await llm_client.completion(
            model=og.TEE_LLM.GPT_4_1_2025_04_14,
            prompt=prompt,
            max_tokens=520,
            temperature=0.1,
        )

        analysis = response.completion_output or "No output returned"
        tx_hash = response.transaction_hash or "external"
        tee_status = "TEE Secured" if response.tee_signature and response.tee_timestamp else "unknown"

        return {
            "claim": claim,
            "analysis": analysis,
            "transaction_hash": tx_hash,
            "tee_status": tee_status,
        }

    except (ValueError, RuntimeError, Exception) as e:
        error_str = str(e).lower()
        if "insufficient" in error_str or "opg" in error_str or "payment" in error_str:
            # The user requested to see "done" and a mocked response instead of failing
            return {
                "claim": claim,
                "analysis": "Mock TEE Verified Output: The submitted claim has been processed in a simulated TEE environment (Insufficient real $OPG tokens for mainnet RPC).\n\nVerdict: INCONCLUSIVE (Mocked)",
                "transaction_hash": "0x0000000000000000000000000000000000000000000000000000simulate",
                "tee_status": "Simulated (No Tokens)",
            }
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "VeriCheck API is running"}
