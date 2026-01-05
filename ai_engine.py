import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel

# 1. LOAD MODELS (Global load to avoid reloading on every request)
print("Loading AI Models... this might take a minute.")

# Model A: all-MiniLM-L6-v2 (For Similarity & Matching)
tokenizer_mini = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
model_mini = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')

# Model B: distilbert-base-uncased (For Tokenizing/Parsing if needed)
# We load this as per your requirement, can be used for text cleaning or keyword extraction tasks later.
tokenizer_bert = AutoTokenizer.from_pretrained('distilbert-base-uncased')
model_bert = AutoModel.from_pretrained('distilbert-base-uncased')

print("✅ AI Models Loaded Successfully.")

# --- HELPER: Mean Pooling (Converts text to a single vector) ---
def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output.last_hidden_state
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

# --- CORE FUNCTION: Get Similarity Score ---
def calculate_similarity(text1, text2):
    """
    Compares two texts and returns a score between 0 and 100.
    Uses all-MiniLM-L6-v2 for semantic understanding.
    """
    if not text1 or not text2:
        return 0.0

    # Tokenize sentences
    encoded_input = tokenizer_mini([text1, text2], padding=True, truncation=True, return_tensors='pt')

    # Compute token embeddings
    with torch.no_grad():
        model_output = model_mini(**encoded_input)

    # Perform pooling
    sentence_embeddings = mean_pooling(model_output, encoded_input['attention_mask'])

    # Normalize embeddings
    sentence_embeddings = F.normalize(sentence_embeddings, p=2, dim=1)

    # Calculate Cosine Similarity (Dot product of normalized vectors)
    # The result is a tensor, we extract the float value.
    score = torch.nn.functional.cosine_similarity(sentence_embeddings[0].unsqueeze(0), sentence_embeddings[1].unsqueeze(0))
    
    return round(float(score) * 100, 2)